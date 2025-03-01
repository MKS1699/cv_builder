"use client";

import toast from "react-hot-toast";
import useResumeReady from "../hooks/useResumeReady";
import { LiaFileDownloadSolid } from "react-icons/lia";
import clsx from "clsx";
import { motion } from "motion/react";

export interface DownloadPDFProps {
  pdfURL: string | null;
  name: string | null;
}
const DownloadPDF = ({
  pdfURL,
  name,
}: // chosenTemplate, resumeToRender
DownloadPDFProps) => {
  const { isResumeReady } = useResumeReady();
  function exportPDF() {
    if (isResumeReady) {
      if (pdfURL) {
        const a = document.createElement("a");
        a.href = pdfURL;
        a.download = `Resume-of-${name}`; // Set the filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Cleanup
        // window.open(pdfURL, "_blank");
        URL.revokeObjectURL(pdfURL);
      }
    } else {
      toast.error("Please fill all the required fields to generate PDF.");
    }
  }

  return (
    <motion.div
      onClick={exportPDF}
      className={clsx(
        "self-center p-2 w-fit rounded-md flex flex-row items-center gap-2 justify-around cursor-pointer",
        isResumeReady ? "text-2xl" : "text-xl"
      )}
      initial={{
        backgroundColor: "#6b7280",
        color: "#1f2937",
        width: "fit-content",
      }}
      animate={{
        backgroundColor: isResumeReady ? "#22c55e" : "#6b7280",
        color: isResumeReady ? "#fff" : "#1f2937",
        width: isResumeReady ? "100%" : "fit-content",
      }}
      transition={{
        duration: 0.5,
        ease: "linear",
      }}
      title={
        isResumeReady
          ? "Click to generate pdf of your resume."
          : "Please fill all the required fields to generate PDF."
      }
    >
      <LiaFileDownloadSolid
        className={clsx(isResumeReady ? "w-9 h-9" : "w-5 h-5")}
      />
      <p>Download PDF</p>
    </motion.div>
  );
};

export default DownloadPDF;
