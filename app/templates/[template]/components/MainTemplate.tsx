"use client";

import { ALL_TEMPLATES_LIST } from "@/app/db/allTemplates";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LeftMenu, PDFViewer, RightMenu } from "@/app/components";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import { setResume } from "@/app/redux/slice/resumeSlice";
import { sampleResume } from "@/app/db/sampleResume";
import useCreatePDFBlob from "@/app/hooks/useCreatePDFBlob";
import { setChosenTemplate } from "@/app/redux/slice/userDetailsSlice";

const MainTemplate = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();
  const router = useRouter();
  const [currTemplate, setCurrTemplate] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<string>("");

  // set the current template
  useEffect(() => {
    setCurrTemplate(
      ALL_TEMPLATES_LIST.includes(path.split("/").at(-1) ?? "")
        ? path.split("/").at(-1) ?? ""
        : "none"
    );
  }, [path]);

  // setting chosen template and also redirecting to templates page if chosen template does not exists
  useEffect(() => {
    if (currTemplate === "none") {
      setShowAlert(true);
      const replaceRoute = window.setTimeout(() => {
        router.replace("/templates");
      }, 3000);
      return () => window.clearTimeout(replaceRoute);
    } else {
      dispatch(setChosenTemplate(currTemplate));
    }
  }, [currTemplate]);

  const resume = useAppSelector((state) => state.resume); // resume from redux

  useEffect(() => {
    dispatch(setResume({ resume: sampleResume }));
  }, [dispatch]); // updating resume state

  const { pdfURL } = useCreatePDFBlob();

  return (
    <div className="min-h-screen w-full">
      {showAlert && <AlertMessage path={path} />}
      <div className="w-full h-full flex flex-row gap-2 p-2 justify-between">
        {/* left menu */}
        <LeftMenu handleActiveField={setActiveField} />
        {/* pdf viewer */}
        {pdfURL && <PDFViewer pdfUrl={pdfURL} />}
        {/* right menu */}
        <RightMenu
          name={resume?.name}
          pdfURL={pdfURL && pdfURL}
          activeField={activeField}
        />
      </div>
    </div>
  );
};

const AlertMessage = ({ path }: { path: string }) => {
  const [timer, setTimer] = useState<number>(3);

  useEffect(() => {
    const interval = setInterval(() => setTimer((pre) => pre - 1), 1000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <div className="w-80 h-28 p-2 rounded-md ring-2 ring-red-500 after:animate-pulse absolute">
      This resume template{" "}
      <code className="p-1 bg-gray-800 text-white rounded-md text-xs">
        {path.split("/").at(-1)}
      </code>{" "}
      on{" "}
      <code className="p-1 bg-gray-800 text-white rounded-md text-xs">
        {path}
      </code>{" "}
      does not exists redirecting you to choose{" "}
      <Link href={"/templates"} className="text-blue-600 italic">
        {" "}
        another template
      </Link>{" "}
      in {timer}.
    </div>
  );
};

export default MainTemplate;
