"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeEducationEditProps } from "./ResumeEducationEdit";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import { setResumeLanguages } from "../redux/slice/resumeSlice";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import TextComponent from "./TextComponent";
import clsx from "clsx";
import toast from "react-hot-toast";

const ResumeLanguagesEdit = ({ id, limit }: ResumeEducationEditProps) => {
  const languages = useAppSelector((state) => state.resume.languages);
  const dispatch = useAppDispatch();
  const emptyData: ResumeSliceTypes["languages"][0] = {
    level: "",
    name: "",
  };

  const [values, setValues] = useState<ResumeSliceTypes["languages"]>(
    languages || Array(limit).fill(emptyData)
  );

  const [valuesToShow, setValuesToShow] = useState<boolean[]>(
    Array(limit).fill(false)
  );

  function handleValuesUpdate(
    pos: number,
    data: ResumeSliceTypes["languages"][0]
  ): void {
    // creating / updating Values
    const valArr = [...values];
    valArr[pos] = data;
    setValues(valArr);
    // showing created / updated values
    const valShowArr = [...valuesToShow];
    valShowArr[pos] = true;
    setValuesToShow(valShowArr);
  }

  function handleValuesToEdit(pos: number) {
    // setting values to edit
    const valShowArr = [...valuesToShow];
    valShowArr[pos] = false;
    setValuesToShow(valShowArr);
  }

  function handleValuesToDelete(pos: number) {
    // deleting the data at pos in values
    const data: ResumeSliceTypes["languages"] = [...values];
    data.splice(pos, 1, emptyData);
    setValues(data);
    // setting values to edit
    const valShowArr = [...valuesToShow];
    valShowArr[pos] = false;
    setValuesToShow(valShowArr);
  }

  useEffect(() => {
    dispatch(setResumeLanguages(values));
  }, [values, dispatch]);

  function setInitialValues() {
    if (languages !== values) {
      const vArr: ResumeSliceTypes["languages"] = Array(limit).fill(emptyData);
      languages.forEach(
        (language: ResumeSliceTypes["languages"][0], index: number) =>
          (vArr[index] = language)
      );
      setValues(vArr);

      const vSArr: boolean[] = Array(limit).fill(false);
      languages.forEach(
        (language: ResumeSliceTypes["languages"][0], index: number) => {
          language.name.length > 0
            ? (vSArr[index] = true)
            : (vSArr[index] = false);
        }
      );
      setValuesToShow(vSArr);
    }
  }

  useEffect(() => {
    setInitialValues();
  }, [languages]);

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {values.map((_, vIndex: number) => {
        return (
          <div key={`Language-Edit-View-Container-Form-${vIndex}}`}>
            {valuesToShow[vIndex] ? (
              <ViewLanguage
                data={values[vIndex]}
                pos={vIndex}
                key={`Language-Edit-View-Form-${vIndex}}`}
                handleValuesToDelete={() => handleValuesToDelete(vIndex)}
                handleValuesToEdit={() => handleValuesToEdit(vIndex)}
              />
            ) : (
              <LanguageEdit
                data={values[vIndex]}
                pos={vIndex}
                key={`Language-Edit-Form-${vIndex}}`}
                handleValuesUpdate={handleValuesUpdate}
                id={id}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

interface LanguageEditProps {
  pos: number;
  handleValuesUpdate: (
    pos: number,
    data: ResumeSliceTypes["languages"][0]
  ) => void;
  id: string;
  data?: ResumeSliceTypes["languages"][0] | null;
}
const LanguageEdit = ({
  handleValuesUpdate,
  id,
  pos,
  data = null,
}: LanguageEditProps) => {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>(name.length === 0 ? "none" : "");
  const [levelDisabled, setLevelDisabled] = useState<boolean>(true);
  function createValueNHandle() {
    if (level !== "none" && level.length > 0 && name.length > 0) {
      const data: ResumeSliceTypes["languages"][0] = {
        level,
        name,
      };
      handleValuesUpdate(pos, data);
    } else {
      toast.error("Language Name & Level should be provided.");
    }
  }

  useEffect(() => {
    if (data !== null) {
      const { name, level } = data;
      setName(name);
      setLevel(level);
    }
  }, [data]);

  useEffect(() => {
    name.length > 0 ? setLevelDisabled(false) : setLevelDisabled(true);
  }, [name]);

  return (
    <div className="w-full h-auto flex flex-col gap-1">
      <TextComponent
        id={`${id}-${pos}-school`}
        placeHolder="English"
        value={name}
        valueHandler={setName}
        className="w-full rounded-md text-black"
      />
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value.toString())}
        disabled={levelDisabled}
        className={clsx(
          "p-1 rounded-md",
          levelDisabled
            ? "cursor-not-allowed text-gray-500"
            : "cursor-pointer text-black"
        )}
        title={
          levelDisabled ? "Enter language name first" : "Select language level."
        }
      >
        <option value="none">None</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
      {/* buttons */}
      <div
        className="w-full h-auto bg-green-500 text-white cursor-pointer rounded-md p-1 text-center"
        onClick={createValueNHandle}
      >
        Add
      </div>
    </div>
  );
};

interface ViewLanguageProps {
  pos: number;
  data: ResumeSliceTypes["languages"][0];
  handleValuesToDelete: (pos: number) => void;
  handleValuesToEdit: (pos: number) => void;
}
const ViewLanguage = ({
  data,
  handleValuesToDelete,
  handleValuesToEdit,
  pos,
}: ViewLanguageProps) => {
  const { level, name } = data;
  return (
    <div className="w-full h-auto flex flex-col gap-1 text-black cursor-auto">
      <div className="w-full h-auto flex flex-row gap-1">
        <div className="truncate">{name}</div>
        <div className="truncate">{level}</div>
      </div>
      <div className="w-full h-auto flex flex-row gap-1">
        <div
          className="w-full h-auto p-1 text-center text-white bg-blue-500 rounded-md cursor-pointer flex flex-row gap-2 items-center justify-evenly"
          onClick={() => handleValuesToEdit(pos)}
        >
          <MdModeEdit />
          <div>Edit</div>
        </div>
        <div
          className="w-full h-auto p-1 text-center text-white bg-red-500 rounded-md cursor-pointer flex flex-row gap-2 items-center justify-evenly"
          onClick={() => handleValuesToDelete(pos)}
        >
          <MdDeleteForever />
          <div>Delete</div>
        </div>
      </div>
    </div>
  );
};

export default ResumeLanguagesEdit;
