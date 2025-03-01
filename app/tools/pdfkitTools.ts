import { margins } from "pdfkit/js/page";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import { faangSimple } from "./faangSimple";

export async function createPDF({
  resume,
  chosenTemplate,
}: {
  resume: ResumeSliceTypes;
  chosenTemplate: string;
}): Promise<Blob> {
  return new Promise((resolve) => {
    // console.log(resume, chosenTemplate);
    const chunks: Uint8Array[] = [];
    const doc = new window.PDFDocument({
      size: "A4",
      margins: { top: 10, left: 10, right: 10, bottom: 10 },
    });

    doc.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    doc.on("end", () => {
      const pdfBlob = new Blob(chunks, { type: "application/pdf" });
      resolve(pdfBlob);
    });

    const { name, objective, skills, hobbies } = resume;
    const Keywords = () => {
      let str = "";
      skills.forEach((skill: string) => (str += `${skill},`));
      hobbies.forEach((hobby: string) => (str += `${hobby},`));
      return str;
    };
    doc.info = {
      Title: `Resume-of-${name}`,
      Author: `CV Builder`,
      Subject: `${objective}`,
      Keywords: `${Keywords()}`,
      CreationDate: new Date(),
      ModDate: new Date(),
    };

    if (chosenTemplate === "faangSimple") {
      faangSimple(resume, doc);
    }

    // End the document (triggers "end" event)
    doc.end();
  });
}
