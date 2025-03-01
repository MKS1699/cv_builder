"use client";

import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeObjective } from "../redux/slice/resumeSlice";
import { ResumeNameEditProps } from "./ResumeNameEdit";

const ResumeObjectiveEdit = ({ id }: ResumeNameEditProps) => {
  const objective = useAppSelector((state) => state.resume.objective);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(objective || "");

  useEffect(() => {
    dispatch(setResumeObjective(value));
  }, [value, dispatch]);

  function setInitialValue() {
    if (objective !== value) {
      setValue(objective);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [objective]);

  return (
    <TextComponent
      id={id}
      placeHolder="To leverage my skills..."
      value={value}
      valueHandler={setValue}
      className="w-full rounded-md text-black"
      key={id}
    />
  );
};

export default ResumeObjectiveEdit;
