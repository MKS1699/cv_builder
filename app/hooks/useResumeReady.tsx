"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "./storeHooks";

const useResumeReady = () => {
  const [isResumeReady, setIsResumeReady] = useState<boolean>(false);
  const [requiredFields, setRequiredFields] = useState<string[]>([]);

  const resume = useAppSelector((state) => state.resume);

  function checkIsResumeReady() {
    const {
      name,
      address,
      email,
      linkedIn,
      github,
      educations,
      skills,
      phone,
      hobbies,
      languages,
      objective,
    } = resume;
    const fieldsArr: string[] = [];
    if (!name?.length) fieldsArr.push("name");
    if (!address?.length) fieldsArr.push("address");
    if (!email?.length) fieldsArr.push("email");
    if (!linkedIn?.length) fieldsArr.push("linkedIn");
    if (!github?.length) fieldsArr.push("github");
    if (!phone?.length) fieldsArr.push("phone");
    if (!objective?.length) fieldsArr.push("objective");

    if (!skills.length || !skills[0]?.length) fieldsArr.push("skills");
    if (!hobbies.length || !hobbies[0]?.length) fieldsArr.push("hobbies");
    if (!educations.length || !educations[0]?.degree?.length)
      fieldsArr.push("education");
    if (!languages.length || !languages[0]?.name?.length)
      fieldsArr.push("languages");

    return {
      isReady: fieldsArr.length === 0,
      missingFields: fieldsArr,
    };
  }

  useEffect(() => {
    const { isReady, missingFields } = checkIsResumeReady();
    setIsResumeReady(isReady);
    setRequiredFields(missingFields);

    // console.clear();
    // console.log("Resume Ready:", isReady, "Required Fields:", missingFields);
  }, [resume]);

  return { isResumeReady, requiredFields };
};

export default useResumeReady;
