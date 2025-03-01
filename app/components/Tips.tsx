"use client";
import clsx from "clsx";
import { MdTipsAndUpdates } from "react-icons/md";
import { IoAlert } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
interface TipsProps {
  title: string;
  content: string;
  // className?: string;
  type: "tip" | "alert";
  activeMenu?: string;
  menu?: string;
}
const Tips = ({ content, title, type, activeMenu, menu }: TipsProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    activeMenu === menu ? setIsVisible(true) : setIsVisible(false);
  }, [activeMenu]);
  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className={clsx(
            "w-full h-auto p-2 flex flex-col gap-2  rounded-md",
            type === "tip" && "ring-2 ring-yellow-500 ",
            type === "alert" && "border-2 border-dashed border-red-500"
          )}
        >
          <div className="w-full text-center text-xl font-semibold flex flex-row gap-2 items-center justify-center">
            {type === "tip" && <MdTipsAndUpdates className="text-yellow-500" />}
            {type === "alert" && <IoAlert className="text-red-500" />}
            <div
              className={clsx(
                type === "alert" && "text-red-500",
                type === "tip" && "text-black"
              )}
            >
              {title}
            </div>
          </div>
          <div className="w-full h-auto text-justify">{content}</div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Tips;
