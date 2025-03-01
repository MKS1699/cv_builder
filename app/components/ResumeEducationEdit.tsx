"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeNameEditProps } from "./ResumeNameEdit";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeEducations } from "../redux/slice/resumeSlice";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import toast from "react-hot-toast";
export interface ResumeEducationEditProps extends ResumeNameEditProps {
  limit: number;
}

const ResumeEducationEdit = ({ id, limit }: ResumeEducationEditProps) => {
  const dispatch = useAppDispatch();
  const emptyData: ResumeSliceTypes["educations"][0] = {
    degree: "",
    description: "",
    endDate: "",
    major: "",
    school: "",
    startDate: "",
  };
  const educations = useAppSelector((state) => state.resume.educations);
  const [values, setValues] = useState<ResumeSliceTypes["educations"]>(
    educations || Array(limit).fill(emptyData)
  );

  const [valuesToShow, setValuesToShow] = useState<boolean[]>(
    Array(limit).fill(false)
  );

  function handleValuesUpdate(
    pos: number,
    data: ResumeSliceTypes["educations"][0]
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
    const data: ResumeSliceTypes["educations"] = [...values];
    data.splice(pos, 1, emptyData);
    setValues(data);
    // setting values to edit
    const valShowArr = [...valuesToShow];
    valShowArr[pos] = false;
    setValuesToShow(valShowArr);
  }

  useEffect(() => {
    dispatch(setResumeEducations(values));
  }, [values, dispatch]);

  function setInitialValues() {
    if (educations !== values) {
      const vArr: ResumeSliceTypes["educations"] = Array(limit).fill(emptyData);

      educations.forEach(
        (education: ResumeSliceTypes["educations"][0], index: number) => {
          if (education && education.degree && education.degree.length > 0) {
            vArr[index] = education;
          }
        }
      );

      setValues(vArr);

      const vSArr: boolean[] = Array(limit).fill(false);
      educations.forEach(
        (education: ResumeSliceTypes["educations"][0], index: number) => {
          education.degree.length > 0
            ? (vSArr[index] = true)
            : (vSArr[index] = false);
        }
      );
      setValuesToShow(vSArr);
    }
  }

  useEffect(() => {
    setInitialValues();
  }, [educations]);

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {values.map((_, vIndex: number) => {
        return (
          <div key={`Education-Edit-View-Container-Form-${vIndex}}`}>
            {valuesToShow[vIndex] ? (
              <ViewEducationAdded
                data={values[vIndex]}
                pos={vIndex}
                key={`Education-Edit-View-Form-${vIndex}}`}
                handleValuesToDelete={() => handleValuesToDelete(vIndex)}
                handleValuesToEdit={() => handleValuesToEdit(vIndex)}
              />
            ) : (
              <EducationEdit
                data={values[vIndex]}
                pos={vIndex}
                key={`Education-Edit-Form-${vIndex}}`}
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

interface EducationEditProps {
  pos: number;
  handleValuesUpdate: (
    pos: number,
    data: ResumeSliceTypes["educations"][0]
  ) => void;
  id: string;
  data?: ResumeSliceTypes["educations"][0] | null;
}
const EducationEdit = ({
  pos,
  handleValuesUpdate,
  id,
  data = null,
}: EducationEditProps) => {
  const [school, setSchool] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [major, setMajor] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function createValueNHandle() {
    if (
      school.length > 0 &&
      degree.length > 0 &&
      startDate.length > 0 &&
      endDate.length > 0
    ) {
      const data: ResumeSliceTypes["educations"][0] = {
        degree,
        description,
        endDate,
        major,
        school,
        startDate,
      };
      handleValuesUpdate(pos, data);
    } else {
      toast.error("Degree, School, Start Date and End Date must be provided.");
    }
  }

  useEffect(() => {
    if (data !== null) {
      const { degree, description, endDate, major, school, startDate } = data;
      setSchool(school);
      setDegree(degree);
      setDescription(description);
      setEndDate(endDate);
      setStartDate(startDate);
      setMajor(major);
    }
  }, [data]);

  return (
    <div className="w-full h-auto flex flex-col gap-1">
      <TextComponent
        id={`${id}-${pos}-school`}
        placeHolder="School / College / University Name"
        value={school}
        valueHandler={setSchool}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-degree`}
        placeHolder="Degree / Class / Course"
        value={degree}
        valueHandler={setDegree}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-major`}
        placeHolder="Major for the degree"
        value={major}
        valueHandler={setMajor}
        className="w-full rounded-md text-black"
      />
      <div className="w-full h-auto flex flex-row gap-1">
        <TextComponent
          id={`${id}-${pos}-startDate`}
          placeHolder="Course Start Date"
          value={startDate}
          valueHandler={setStartDate}
          className="w-full rounded-md text-black"
        />
        <TextComponent
          id={`${id}-${pos}-endDate`}
          placeHolder="Course End Date"
          value={endDate}
          valueHandler={setEndDate}
          className="w-full rounded-md text-black"
        />
      </div>
      <TextComponent
        id={`${id}-${pos}-description`}
        placeHolder="Few words for Degree / Class / Course"
        value={description}
        valueHandler={setDescription}
        className="w-full rounded-md text-black"
      />
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

interface ViewEducationAddedProps {
  pos: number;
  data: ResumeSliceTypes["educations"][0];
  handleValuesToDelete: (pos: number) => void;
  handleValuesToEdit: (pos: number) => void;
}
const ViewEducationAdded = ({
  data,
  pos,
  handleValuesToDelete,
  handleValuesToEdit,
}: ViewEducationAddedProps) => {
  const { degree, description, endDate, major, school, startDate } = data;
  return (
    <div className="w-full h-auto flex flex-col gap-1 text-black cursor-auto">
      <div className="truncate">{degree}</div>
      <div className="truncate">{school}</div>
      <div className="w-full h-auto flex flex-row gap-1">
        <div className="w-full h-auto text-center">{startDate}</div>
        <div className="w-full h-auto text-center">{endDate}</div>
      </div>
      <div className="truncate">{major}</div>
      <div className="truncate">{description}</div>
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

export default ResumeEducationEdit;
