"use client";

import { ResumePreview } from "@/app/components";
import { TEMPLATES } from "@/app/db/allTemplates";
import { sampleResume } from "@/app/db/sampleResume";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import { setChosenTemplate } from "@/app/redux/slice/userDetailsSlice";
import { TemplateInfo } from "@/app/types/templatesTypes";
import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";
import { LiaHandPointRight } from "react-icons/lia";
import { MdEdit } from "react-icons/md";
import { CgTemplate } from "react-icons/cg";
const PreviewMain = () => {
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume);
  const chosenTemplate = useAppSelector((state) => state.user.chosenTemplate);

  const [template, setTemplate] = useState<TemplateInfo>();

  // changing the chosen template
  useEffect(() => {
    dispatch(setChosenTemplate("FAANG Path"));
  }, []);

  // extracting the design of the chosen template
  useEffect(() => {
    const temp = TEMPLATES.find(
      (template: TemplateInfo) => template.templateName === chosenTemplate
    );
    setTemplate(temp);
  }, [chosenTemplate]);

  return (
    <div className="min-h-screen p-2 grid grid-cols-[20%_60%_20%] grid-rows-1">
      {/* left panel */}
      <div className="w-full h-full flex flex-col gap-2 hidden">
        {/* message */}
        <div className="w-full h-fit p-2 ring-2 ring-red-500 rounded-md flex flex-row gap-2 items-center justify-between">
          <GoAlert className="text-red-500 w-6 h-6" />
          <p>Resume will look like this.</p>
          <LiaHandPointRight className="text-red-500 w-6 h-6" />
        </div>
        <div>
          Other panel menu related to resume like changing template or
          re-editing something in the resume will be provided here
        </div>
        {/* re-edit menu */}
        <div className="w-full h-fit p-2 flex flex-row gap-2 ring-2 ring-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md items-center cursor-pointer transition-all duration-300 ease-in justify-between">
          <p>I want some changes</p>
          <MdEdit className="w-6 h-6" />
        </div>
        {/* template choose */}
        <div className="w-full h-fit p-2 flex flex-row gap-2 ring-2 ring-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white rounded-md items-center cursor-pointer transition-all duration-300 ease-in justify-between">
          <p>Pick another template</p>
          <CgTemplate className="w-6 h-6" />
        </div>
      </div>
      {/* resume panel */}
      {template && (
        <ResumePreview
          data={resume.name.length > 0 ? resume : sampleResume}
          id={`${resume.name}-${chosenTemplate}-preview`}
          templateInfo={template}
        />
      )}
      {/* right panel */}
      <div className="w-full h-full hidden">
        buttons to download & export will be here
      </div>
    </div>
  );
};

export default PreviewMain;
