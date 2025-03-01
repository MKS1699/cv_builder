"use client";
import { DownloadPDF, SaveData, ShowTips } from ".";
import useResumeReady from "../hooks/useResumeReady";

interface RightMenuProps {
  pdfURL: string | null;
  name: string | null;
  activeField: string;
}
const RightMenu = ({ name, pdfURL, activeField }: RightMenuProps) => {
  const { requiredFields } = useResumeReady();
  return (
    <div className="w-[20%] h-auto flex flex-col gap-2">
      <SaveData />
      <DownloadPDF name={name} pdfURL={pdfURL} />
      <ShowTips requiredFields={requiredFields} activeField={activeField} />
    </div>
  );
};

export default RightMenu;
