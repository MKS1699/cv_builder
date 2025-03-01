"use client";
import React, { useEffect } from "react";

import { useAppDispatch } from "../hooks/storeHooks";
import { sampleResume } from "../db/sampleResume";
import {
  setResumeAddress,
  setResumeCertifications,
  setResumeEducations,
  setResumeEmail,
  setResumeExperiences,
  setResumeGithub,
  setResumeHobbies,
  setResumeLanguages,
  setResumeLinkedIn,
  setResumeName,
  setResumeObjective,
  setResumePhone,
  setResumeProjects,
  setResumeSkills,
} from "../redux/slice/resumeSlice";
import { store } from "../redux/store/store";

const page = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const storedResume = sampleResume;

    dispatch(setResumeAddress(storedResume.address));
    dispatch(setResumeCertifications(storedResume.certifications));
    dispatch(setResumeEducations(storedResume.educations));
    dispatch(setResumeEmail(storedResume.email));
    dispatch(setResumeExperiences(storedResume.experiences));
    dispatch(setResumeGithub(storedResume.github));
    dispatch(setResumeHobbies(storedResume.hobbies));
    dispatch(setResumeLanguages(storedResume.languages));
    dispatch(setResumeLinkedIn(storedResume.linkedIn));
    dispatch(setResumeName(storedResume.name));
    dispatch(setResumeObjective(storedResume.objective));
    dispatch(setResumePhone(storedResume.phone));
    dispatch(setResumeProjects(storedResume.projects));
    dispatch(setResumeSkills(storedResume.skills));
  }, []);
  return <div>Edit</div>;
};

export default page;
