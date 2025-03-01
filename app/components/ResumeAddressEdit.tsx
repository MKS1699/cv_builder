"use client";

import { useEffect, useRef, useState } from "react";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeAddress } from "../redux/slice/resumeSlice";
import { ResumeNameEditProps } from "./ResumeNameEdit";

const ResumeAddressEdit = ({ id }: ResumeNameEditProps) => {
  const address = useAppSelector((state) => state.resume.address);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>(address || "");

  useEffect(() => {
    dispatch(setResumeAddress(value));
  }, [value, dispatch]);

  function setInitialValue() {
    if (address !== value) {
      setValue(address);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [address]);

  return (
    <TextComponent
      id={id}
      placeHolder="123 Main Street, City, State, Zip"
      value={value}
      valueHandler={setValue}
      className="w-full rounded-md text-black"
      key={id}
    />
  );
};

export default ResumeAddressEdit;
