"use client";

import { useEffect, useState } from "react";
import useGetStoredResume from "../hooks/useGetStoredResume";
import { useAppDispatch } from "../hooks/storeHooks";
import { setResume } from "../redux/slice/resumeSlice";
import { setSaveDataLoaded } from "../redux/slice/userDetailsSlice";

const GetStoredResume = () => {
  const dispatch = useAppDispatch();
  // todo : add dialog to ask user to load the stored resume
  const storedResume = useGetStoredResume();

  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [loadResume, setLoadResume] = useState<boolean>(false);

  useEffect(() => {
    storedResume && setShowDialog(true);
  }, [storedResume]);

  function addResumeToRedux() {
    if (storedResume) {
      dispatch(setResume({ resume: storedResume }));
      dispatch(setSaveDataLoaded(true));
      setShowDialog(false);
      setLoadResume(false);
    }
  }

  useEffect(() => {
    loadResume && addResumeToRedux();
  }, [loadResume]);

  function closeDialog() {
    setShowDialog(false);
    setLoadResume(false);
  }

  return (
    <>
      {showDialog && storedResume && (
        <div className="fixed w-full min-h-screen backdrop-blur-sm left-0 top-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 min-h-44 bg-white rounded-md p-2 flex flex-col gap-2 shadow-xl ring-2 ring-blue-500 text-center justify-between">
            <div>
              <div className="w-full h-auto text-2xl">
                Found resume of "{storedResume.name}".
              </div>
              <div className="w-full h-auto text-2xl">
                Do you want to load it?
              </div>
            </div>
            <div className="w-full h-auto flex flex-row gap-2 justify-around">
              <div
                className="w-16 h-auto px-2 py-1 bg-green-500 text-white text-center text-2xl rounded-md cursor-pointer"
                onClick={() => setLoadResume(true)}
              >
                Yes
              </div>
              <div
                className="w-16 h-auto px-2 py-1 bg-red-500 text-white text-center text-2xl rounded-md cursor-pointer"
                onClick={closeDialog}
              >
                No
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GetStoredResume;
