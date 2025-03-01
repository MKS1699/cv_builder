"use client";

import toast from "react-hot-toast";
import { useAppSelector } from "../hooks/storeHooks";
import { IoSaveOutline } from "react-icons/io5";
import { motion } from "motion/react";
import useResumeReady from "../hooks/useResumeReady";
import clsx from "clsx";
const SaveData = () => {
  const resume = useAppSelector((state) => state.resume);
  const { isResumeReady } = useResumeReady();
  function savingData() {
    // todo : save the resume to local storage aka web storage
    if (resume.name.length > 0) {
      localStorage.setItem(`CVBuilder-Resume`, JSON.stringify(resume));
      toast.success("Resume saved successfully!");
    } else {
      toast.error(
        "Please fill the resume before saving! At least your name should be there!"
      );
    }
  }
  return (
    <motion.div
      initial={{
        width: "fit-content",
        backgroundColor: "#6b7280",
        color: "#1f2937",
      }}
      animate={{
        width: isResumeReady ? "100%" : "fit-content",
        backgroundColor: isResumeReady ? "#9333ea" : "#6b7280",
        color: isResumeReady ? "#fff" : "#1f2937",
      }}
      transition={{
        duration: 0.5,
        ease: "linear",
      }}
      className={clsx(
        "self-center p-2 bg-purple-500 rounded-md w-fit h-fit text-white cursor-pointer flex flex-row gap-2 items-center justify-around",
        isResumeReady ? "text-2xl" : "text-xl"
      )}
      onClick={savingData}
    >
      <IoSaveOutline className={clsx(isResumeReady ? "w-7 h-7" : "w-5 h-5")} />
      <p>Save Resume</p>
    </motion.div>
  );
};

export default SaveData;
