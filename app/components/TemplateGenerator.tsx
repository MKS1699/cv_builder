"use client";

import { ReactNode, useEffect, useState } from "react";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import { TemplateInfo } from "../types/templatesTypes";
import ResumePreview from "./ResumePreview";

// todo : this component will generate a template based on the user's data or the sample data provided if the userdata is not available

interface TemplateGeneratorProps {
  templateInfo: TemplateInfo;
  userData: ResumeSliceTypes;
}

const TemplateGenerator = ({
  templateInfo,
  userData,
}: TemplateGeneratorProps) => {
  const [templateNodes, setTemplateNodes] = useState<ReactNode[]>([]);
  useEffect(() => {
    setTemplateNodes([
      <ResumePreview
        data={userData}
        templateInfo={templateInfo}
        key={`Template-${templateInfo.templateName}-Resume-${userData.name}`}
        id={`Template-${templateInfo.templateName}-Resume-${userData.name}`}
      />,
    ]);
  }, [templateInfo, userData]);
  return <>{templateNodes.map((template: ReactNode) => template)}</>;
};

export default TemplateGenerator;
