"use client";

import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumePhone } from "../redux/slice/resumeSlice";
import { ResumeNameEditProps } from "./ResumeNameEdit";

const ResumePhoneEdit = ({ id }: ResumeNameEditProps) => {
  const dispatch = useAppDispatch();
  const phone = useAppSelector((state) => state.resume.phone);

  const [value, setValue] = useState<string>(phone || "");

  function setInitialValue() {
    if (phone !== value) {
      setValue(phone);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [phone]);

  useEffect(() => {
    dispatch(setResumePhone(value));
  }, [value, dispatch]);

  return (
    <TextComponent
      id={id}
      placeHolder="+910123456789"
      value={value}
      valueHandler={setValue}
      className="w-full rounded-md text-black"
      key={id}
    />
  );
};

export default ResumePhoneEdit;
