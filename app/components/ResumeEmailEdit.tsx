"use client";

import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeEmail } from "../redux/slice/resumeSlice";
import { ResumeNameEditProps } from "./ResumeNameEdit";

const ResumeEmailEdit = ({ id }: ResumeNameEditProps) => {
  const email = useAppSelector((state) => state.resume.email);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(email || "");

  useEffect(() => {
    dispatch(setResumeEmail(value));
  }, [value, dispatch]);

  function setInitialValue() {
    if (email !== value) {
      setValue(email);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [email]);

  return (
    <TextComponent
      id={id}
      placeHolder="munna123@example.com"
      value={value}
      valueHandler={setValue}
      className="w-full rounded-md text-black"
      key={id}
    />
  );
};

export default ResumeEmailEdit;
