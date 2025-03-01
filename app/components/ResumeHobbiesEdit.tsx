"use client";

import { useEffect, useRef, useState } from "react";
import ListComponent from "./ListComponent";
import { ResumeEducationEditProps } from "./ResumeEducationEdit";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeHobbies } from "../redux/slice/resumeSlice";

interface ResumeHobbiesEditProps extends ResumeEducationEditProps {}

const ResumeHobbiesEdit = ({ id, limit }: ResumeHobbiesEditProps) => {
  const hobbies = useAppSelector((state) => state.resume.hobbies);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<string[]>(hobbies || []);

  useEffect(() => {
    dispatch(setResumeHobbies(values));
  }, [values, dispatch]);

  function setInitialValue() {
    if (hobbies !== values) {
      setValues(hobbies);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [hobbies]);

  return (
    <ListComponent
      id={id}
      placeHolder="Reading, Writing, Football..."
      value={values}
      valueHandler={setValues}
      className="bg-transparent text-black"
      displayList
      key={id}
    />
  );
};

export default ResumeHobbiesEdit;
