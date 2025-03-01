"use client";

import { useEffect, useState, useCallback } from "react";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import { createPDF } from "../tools/pdfkitTools";
import useResumeReady from "./useResumeReady";
import { useAppSelector } from "./storeHooks";

// Enhanced Debounce function
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) & { cancel: () => void } {
  let timeoutId: NodeJS.Timeout | null = null;

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };

  debouncedFunction.cancel = () => {
    // Add the cancel method
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debouncedFunction;
}

const useCreatePDFBlob = () => {
  const [pdfBlob, setPDFBlob] = useState<Blob | undefined>(undefined);
  const [pdfURL, setPDFURL] = useState<string | null>(null);
  const { isResumeReady } = useResumeReady();
  const resume = useAppSelector((state) => state.resume);
  const chosenTemplate = useAppSelector((state) => state.user.chosenTemplate);

  const createPDFBlob = useCallback(
    async ({
      chosenTemplate,
      resumeToRender,
    }: {
      chosenTemplate: string; //useCreatePDFBlobProps["chosenTemplate"];
      resumeToRender: ResumeSliceTypes; //useCreatePDFBlobProps["resumeToRender"];
    }): Promise<Blob | undefined> => {
      const pdfBlob = await createPDF({
        resume: resumeToRender,
        chosenTemplate: chosenTemplate,
      });

      if (pdfBlob) {
        return pdfBlob;
      }
    },
    []
  );

  useEffect(() => {
    if (isResumeReady) {
      const getBlob = async () => {
        const blob = await createPDFBlob({
          chosenTemplate,
          resumeToRender: resume,
        });
        setPDFBlob(blob);
      };

      // Use debounced version
      const debouncedGetBlob = debounce(getBlob, 500); // Debounce for 500ms
      debouncedGetBlob();

      // Cleanup
      return () => {
        debouncedGetBlob.cancel(); // Now this will work correctly
      };
    }
  }, [resume, chosenTemplate, createPDFBlob, isResumeReady]);

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPDFURL(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob]);

  return { pdfBlob, pdfURL };
};

export default useCreatePDFBlob;
