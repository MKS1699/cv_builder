"use client";

import React, { useState, useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/web/pdf_viewer.css";
import { motion } from "motion/react";

// workerSrc path needs to be changed depending on where you save the file
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.mjs`; // CORRECT LOCAL PATH

interface PDFViewerProps {
  pdfUrl: string; // ONLY A STRING (as expected)
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const renderingTaskRef = useRef<pdfjsLib.RenderTask | null>(null);

  useEffect(() => {
    const loadPDF = async () => {
      //   console.log("loadPDF called with pdfUrl:", pdfUrl);
      if (!canvasRef.current) {
        // console.error("canvasRef.current is null");
        return;
      }
      setLoading(true);
      setError(null);

      if (renderingTaskRef.current) {
        try {
          await renderingTaskRef.current.cancel();
        } catch (err) {
          console.warn("Render task cancel error:", err);
        }
        renderingTaskRef.current = null;
      }

      try {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        // console.log("loadingTask:", loadingTask);
        const pdf = await loadingTask.promise;
        // console.log("PDF loaded:", pdf);
        setNumPages(pdf.numPages);

        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        const renderTask = page.render(renderContext);
        renderingTaskRef.current = renderTask;
        await renderTask.promise;
      } catch (err) {
        if (err instanceof pdfjsLib.RenderingCancelledException) {
          return;
        }
        console.error("Error loading PDF:", err);
        setError("Error loading PDF");
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [pdfUrl, pageNumber]);

  const goToPrevPage = () => {
    setPageNumber((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => (prev < numPages ? prev + 1 : prev));
  };

  return (
    <div className="w-a4 h-a4 flex flex-col">
      {/* page btns */}
      <div className="w-full h-fit flex flex-row gap-2 items-center justify-between">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1 || loading}
          className="disabled:text-gray-300 cursor-pointer text-blue-400 italic text-sm"
        >
          Previous
        </button>
        <p className="text-xs">
          Page {pageNumber} of {numPages}
        </p>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages || loading}
          className="disabled:text-gray-300 cursor-pointer text-blue-400 italic text-sm"
        >
          Next
        </button>
      </div>
      {loading && <LoadingPDF />}
      {error && <p className="text-red-500">{error}</p>}
      {/* rendered pdf */}

      <canvas
        ref={canvasRef}
        className="w-full max-h-[calc(100vh-100px)] ring-1 ring-black"
      ></canvas>
    </div>
  );
};

const LoadingPDF = () => {
  return (
    <motion.div
      className="w-a4 h-a4 rounded-md"
      initial={{
        backgroundColor: "#d1d5db",
      }}
      animate={{
        backgroundColor: ["#d1d5db", "#6b7280", "#d1d5db"],
      }}
      transition={{
        duration: 1,
        ease: "linear",
        repeat: Infinity,
      }}
    ></motion.div>
  );
};

export default PDFViewer;
