"use client";

import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeLinkedIn } from "../redux/slice/resumeSlice";
import { ResumeNameEditProps } from "./ResumeNameEdit";

const ResumeLinkedInEdit = ({ id }: ResumeNameEditProps) => {
  const linkedIn = useAppSelector((state) => state.resume.linkedIn);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(linkedIn || "");

  useEffect(() => {
    dispatch(setResumeLinkedIn(value));
  }, [value, dispatch]);

  function setInitialValue() {
    if (linkedIn !== value) {
      setValue(linkedIn);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [linkedIn]);

  return (
    <TextComponent
      id={id}
      placeHolder="https://www.linedIn.com/munna"
      value={value}
      valueHandler={setValue}
      className="w-full rounded-md text-black"
      key={id}
    />
  );
};

export default ResumeLinkedInEdit;
