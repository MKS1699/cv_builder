"use client";

import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeName } from "../redux/slice/resumeSlice";

export interface ResumeNameEditProps {
  id: string;
}

const ResumeNameEdit = ({ id }: ResumeNameEditProps) => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.resume.name);

  const [value, setValue] = useState<string>(name || "");

  function setInitialValue() {
    if (name !== value) {
      setValue(name);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [name]);

  useEffect(() => {
    if (value.length >= 0) {
      dispatch(setResumeName(value));
    }
  }, [value, dispatch]);

  return (
    <TextComponent
      id={id}
      placeHolder="FirstName LastName"
      value={value}
      valueHandler={setValue}
      className="w-full rounded-md text-black"
      key={id}
    />
  );
};

export default ResumeNameEdit;
