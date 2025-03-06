"use client";

import { useEffect, useState } from "react";
import { ALL_TEMPLATES_LIST } from "../db/allTemplates";
import PDFViewer from "./PDFViewer";
import { createPDF } from "../tools/pdfkitTools";
import { sampleResume } from "../db/sampleResume";
import Link from "next/link";
import { motion } from "motion/react";

const TemplatesPreview = () => {
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
      {tempURLs.map((url: string, uI: number) => {
        const templateName = ALL_TEMPLATES_LIST[uI];
        const templateTitle = createTemplateTitle(templateName);

        return (
          <TemplatePreview
            templateName={templateName}
            templateTitle={templateTitle}
            url={url}
            key={`Template-Preview-${templateName}-${uI}`}
          />
        );
      })}
    </div>
  );
};

type TemplatePreviewProps = {
  url: string;
  templateName: string;
  templateTitle: string;
};

export const TemplatePreview = ({
  url,
  templateName,
  templateTitle,
}: TemplatePreviewProps) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <div
      className="relative group max-w-96 max-h-96"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* template preview */}
      <Link
        href={`/templates/${templateName}`}
        className="max-w-96 max-h-96 scale-75 origin-center overflow-clip hover:overflow-visible hover:scale-100 transform-all duration-300 ease-in transform-gpu flex flex-col gap-2 items-center ring-1 ring-indigo-500 rounded-md"
        key={`Link-to-${templateName}`}
        id={`Link-to-${templateName}`}
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
            {templateTitle}
          </div>
          {/* {t} */}
          <PDFViewer pdfUrl={url} className="max-w-96 max-h-96" />
        </motion.div>
      </Link>
      {/* template info */}
      <motion.div
        initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
        animate={{
          opacity: isHover ? 1 : 0,
          y: isHover ? 0 : 10,
          x: isHover ? 10 : -500,
          scale: isHover ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        className="absolute top-0 left-full min-h-96 w-[500px] bg-gray-800 text-white text-center p-2 rounded-md"
      >
        Points / Info on the {templateTitle} will be here
        {/* todo : this template info implementation */}
      </motion.div>
    </div>
  );
};

export default TemplatesPreview;
