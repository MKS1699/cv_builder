"use client";
import clsx from "clsx";
import { MdTipsAndUpdates } from "react-icons/md";
import { IoAlert, IoClose } from "react-icons/io5";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { opacity } from "pdfkit";
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
  const [reverse, setReverse] = useState<boolean>(false);

  // showing tip and animating
  useEffect(() => {
    activeMenu === menu ? setIsVisible(true) : setIsVisible(false);
  }, [activeMenu]);

  // close tip manually
  function closeTips() {
    setIsVisible(false);
  }

  // reversing the animation
  useEffect(() => {
    const timeOut = setTimeout(() => setReverse(true), 3000);
    return () => clearTimeout(timeOut);
  }, []);

  // auto closing the tip when animation is complete
  useEffect(() => {
    const close = setTimeout(() => setIsVisible(false), 6000);
    return () => clearTimeout(close);
  }, []);

  // animation variants for tip bar
  const barVariants = {
    forward: {
      // width: [0, "100%"], // Expanding animation
      scaleX: [0, 1],
      transition: { duration: 3, ease: "linear" },
    },
    reverse: {
      // width: ["100%", 0], // Shrinking animation
      scaleX: [1, 0],
      transition: { duration: 3, ease: "linear" },
    },
  };

  // tip variant for type
  const tipVariant = {
    tip: {
      opacity: [0, 1],
      scale: [0, 1],
    },
    alert: {
      opacity: [0, 1],
      scale: [0, 1],
      rotate: [0, -5, 0, 5, 0, -5, 0, 5, 0],
      x: [0, -8, 8, -8, 8, -4, 4, -2, 2, 0],
    },
  };
  return (
    <AnimatePresence initial={false}>
      {isVisible ? (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0 }}
          // animate={{ opacity: 1, scale: 1 }}
          variants={tipVariant}
          animate={type === "tip" ? "tip" : "alert"}
          exit={{ opacity: 0, scale: 0 }}
          className={clsx(
            "w-full h-auto p-2 flex flex-col gap-2  rounded-md",
            type === "tip" && "ring-2 ring-yellow-500 ",
            type === "alert" && "border-2 border-dashed border-red-500"
          )}
        >
          <div className="w-full text-center text-xl font-semibold flex flex-row gap-2 items-center justify-between">
            {type === "tip" && <MdTipsAndUpdates className="text-yellow-500" />}
            {type === "alert" && <IoAlert className="text-red-500" />}
            <div
              className={clsx(
                type === "alert" && "text-red-500",
                type === "tip" && "text-black",
                "flex-1 w-full"
              )}
            >
              {title}
            </div>
            {/* close btn */}
            <IoClose
              className="self-start justify-self-end cursor-pointer w-5 h-5"
              onClick={closeTips}
            />
          </div>
          <div className="w-full h-auto text-justify">{content}</div>
          {/* tip info bar */}
          {isVisible && (
            <motion.div
              initial={{
                width: "100%",
              }}
              variants={barVariants}
              animate={reverse ? "reverse" : "forward"}
              className={clsx(
                "w-full h-1 rounded-md",
                type === "tip" && "bg-yellow-500",
                type === "alert" && "bg-red-500",
                reverse ? "origin-right" : "origin-left"
              )}
            ></motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Tips;
