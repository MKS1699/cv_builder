"use client";
import { motion } from "motion/react";
import { TemplatesPreview } from "../components";

const Main = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-2 p-2">
      <motion.div
        className="w-full h-auto py-2 text-3xl text-center"
        initial={{
          width: 0,
          scale: 0,
          rotate: 0,
          skew: 0,
        }}
        animate={{
          width: ["0%", "120%", "100%"],
          scale: [0, 1, 1],
          rotate: [0, 5, 0],
          skew: [0, -50, 0],
        }}
        transition={{
          duration: 1,
          ease: "anticipate",
          bounce: 10,
          // repeat: Infinity,
        }}
      >
        Select Template
      </motion.div>
      <TemplatesPreview />
    </div>
  );
};

export default Main;
