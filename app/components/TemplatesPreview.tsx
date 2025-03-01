"use client";

import { ReactNode, useEffect, useState } from "react";
import { ALL_TEMPLATES_LIST } from "../db/allTemplates";
import PDFViewer from "./PDFViewer";
import { createPDF } from "../tools/pdfkitTools";
import { sampleResume } from "../db/sampleResume";
import Link from "next/link";
import { motion } from "motion/react";

const TemplatesPreview = () => {
  const [temp, setTemp] = useState<ReactNode[] | null>(null);
  const [tempURLs, setTempURLs] = useState<string[]>([]);
  async function getURLS() {
    const urls: string[] = [];
    for (let template of ALL_TEMPLATES_LIST) {
      const pdfBlob = await createPDF({
        resume: sampleResume,
        chosenTemplate: template,
      });
      const pdfURL = URL.createObjectURL(pdfBlob);
      urls.push(pdfURL);
    }
    return urls;
  }

  useEffect(() => {
    const listURL = async () => {
      const urls = await getURLS();
      setTempURLs(urls);
    };
    listURL();
  }, [ALL_TEMPLATES_LIST]);

  function createTempPreviewNodes(urls: string[]) {
    const t: ReactNode[] = [];
    for (let url of urls) {
      t.push(
        <TemplatePreview
          url={url}
          key={`preview-of-${ALL_TEMPLATES_LIST[urls.indexOf(url)]}`}
        />
      );
    }
    return t;
  }

  useEffect(() => {
    if (tempURLs.length > 0) {
      const t = createTempPreviewNodes(tempURLs);
      setTemp(t);
    }
  }, [tempURLs]);

  function createTemplateTitle(title: string): string {
    let TITLE: string = "";
    switch (title) {
      case "faangSimple":
        TITLE = "Faang Simple";
        break;
      default:
        TITLE = title;
        break;
    }
    return TITLE;
  }
  return (
    <div className="w-full min-h-screen flex flex-row flex-wrap gap-2">
      {temp?.map((t, tI) => (
        <Link
          href={`/templates/${ALL_TEMPLATES_LIST[tI]}`}
          className="max-w-96 max-h-96 scale-75 origin-center overflow-clip hover:overflow-visible hover:scale-100 transform-all duration-300 ease-in transform-gpu flex flex-col gap-2 items-center ring-1 ring-indigo-500 rounded-md"
          key={`Link-to-${ALL_TEMPLATES_LIST[tI]}`}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
              ease: "easeIn",
            }}
          >
            <div className="text-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-full text-center text-white py-2 rounded-t-md">
              {createTemplateTitle(ALL_TEMPLATES_LIST[tI])}
            </div>
            {t}
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export const TemplatePreview = ({ url }: { url: string }) => {
  return <PDFViewer pdfUrl={url} className="max-w-96 max-h-96" />;
};

export default TemplatesPreview;
