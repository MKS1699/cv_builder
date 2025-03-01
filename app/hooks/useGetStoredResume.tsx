"use client";

import { useEffect, useState } from "react";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import { usePathname } from "next/navigation";
import { useAppSelector } from "./storeHooks";

const useGetStoredResume = () => {
  const [storedItem, setStoredItem] = useState<ResumeSliceTypes | null>(null);
  const path = usePathname();
  const isSavedDataLoaded = useAppSelector(
    (state) => state.user.saveDataLoaded
  );
  function getStoredResume() {
    const storedResume = localStorage.getItem("CVBuilder-Resume");
    storedResume && setStoredItem(JSON.parse(storedResume));
  }

  // getting the stored resume from local storage if present
  useEffect(() => {
    if (path.startsWith("/templates/") && !isSavedDataLoaded) {
      getStoredResume();
    }
  }, [path]);

  return storedItem;
};

export default useGetStoredResume;
