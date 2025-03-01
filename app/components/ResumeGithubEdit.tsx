"use client";

import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeGithub } from "../redux/slice/resumeSlice";
import { ResumeNameEditProps } from "./ResumeNameEdit";

const ResumeGithubEdit = ({ id }: ResumeNameEditProps) => {
  const github = useAppSelector((state) => state.resume.github);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(github || "");

  useEffect(() => {
    dispatch(setResumeGithub(value));
  }, [value, dispatch]);

  function setInitialValue() {
    if (github !== value) {
      setValue(github);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [github]);

  return (
    <TextComponent
      id={id}
      placeHolder="https://www.github.com/munna"
      value={value}
      valueHandler={setValue}
      className="w-full rounded-md text-black"
      key={id}
    />
  );
};

export default ResumeGithubEdit;
