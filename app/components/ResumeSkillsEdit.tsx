"use client";

import { useEffect, useRef, useState } from "react";
import ListComponent from "./ListComponent";
import { ResumeEducationEditProps } from "./ResumeEducationEdit";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeSkills } from "../redux/slice/resumeSlice";

interface ResumeSkillsEditProps extends ResumeEducationEditProps {}

const ResumeSkillsEdit = ({ id, limit }: ResumeSkillsEditProps) => {
  const skills = useAppSelector((state) => state.resume.skills);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<string[]>(skills || []);

  useEffect(() => {
    dispatch(setResumeSkills(values));
  }, [values, dispatch]);

  function setInitialValue() {
    if (skills !== values) {
      setValues(skills);
    }
  }

  useEffect(() => {
    setInitialValue();
  }, [skills]);

  return (
    <ListComponent
      id={id}
      placeHolder="React, Nextjs, TailwindCSS, Redux..."
      value={values}
      valueHandler={setValues}
      className="bg-transparent text-black"
      displayList
      key={id}
    />
  );
};

export default ResumeSkillsEdit;
