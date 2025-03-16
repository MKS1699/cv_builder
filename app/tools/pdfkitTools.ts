import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import { faangSimple } from "./faangSimple";
import { experienceIntensive } from "./experienceIntensive";

export async function createPDF({
  resume,
  chosenTemplate,
}: {
  resume: ResumeSliceTypes;
  chosenTemplate: string;
}): Promise<Blob> {
  return new Promise(async (resolve) => {
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

    switch (chosenTemplate) {
      case "faamgSimple":
        await faangSimple(resume, doc); // Await the promise
        break;
      case "experienceIntensive":
        await experienceIntensive(resume, doc); // Await the promise
        break;
      default:
        await faangSimple(resume, doc); // Await the promise
        break;
    }

    // End the document (triggers "end" event)
    doc.end();
  });
}
