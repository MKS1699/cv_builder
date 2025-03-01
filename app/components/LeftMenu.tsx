"use client";

import { MenuCreator } from "@/app/components";
import { usePathname } from "next/navigation";

export interface LeftMenuPros {
  // activeField : string;
  handleActiveField: (field: string) => void;
}

const LeftMenu = ({ handleActiveField }: LeftMenuPros) => {
  const path = usePathname();
  const chosenTemplate = path.split("/").at(-1);
  return (
    <div className="w-[20%] h-auto flex flex-col gap-2">
      {/* <div className="text-center text-2xl font-thin">Resume Details</div> */}
      <MenuCreator
        id={`${
          chosenTemplate && chosenTemplate[0].toUpperCase()
        }${chosenTemplate?.slice(1)} Menu`}
        handleActiveField={handleActiveField}
      />
    </div>
  );
};

export default LeftMenu;
