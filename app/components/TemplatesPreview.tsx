"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  TemplateDesign,
  TemplateInfo,
  Templates,
} from "../types/templatesTypes";
import { useAppSelector } from "../hooks/storeHooks";
import ResumePreview from "./ResumePreview";
import { sampleResume } from "../db/sampleResume";

// todo : this component will generate a preview of the templates that are available in the system

interface TemplatesPreviewPropsTypes {
  templates: Templates;
}
const TemplatesPreview = ({ templates }: TemplatesPreviewPropsTypes) => {
  const [templatesPreview, setTemplatesPreview] = useState<ReactNode[]>([]);

  const resume = useAppSelector((state) => state.resume);
  const rid = useAppSelector((state) => state.templates.templatesDivIds);

  // creating temp previews
  function createTempPreviews() {
    const tempArr: ReactNode[] = [];
    templates.forEach((template: TemplateInfo, tIndex: number) => {
      if (resume.name.length > 0) {
        tempArr.push(
          <ResumePreview
            data={resume}
            templateInfo={template}
            key={`Template-${template.templateName}-Resume-${resume.name}-${tIndex}`}
            id={`Template-${template.templateName}-Resume-${resume.name}-${tIndex}`}
          />
        );
      } else {
        const resume = sampleResume;
        tempArr.push(
          <ResumePreview
            data={resume}
            templateInfo={template}
            key={`Template-${template.templateName}-Resume-${resume.name}-${tIndex}`}
            id={`Template-${template.templateName}-Resume-${resume.name}-${tIndex}`}
          />
        );
      }
    });
    setTemplatesPreview(tempArr);
  }

  useEffect(() => {
    createTempPreviews();
  }, []);

  return (
    <div className="container mx-auto">
      {/* templates thumbnail's */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        id="template-grid-container"
      >
        {templatesPreview.map((tempPreview: ReactNode, tempIndex: number) => {
          return (
            <div key={`resume-${tempIndex}`} className="">
              {tempPreview}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplatesPreview;
