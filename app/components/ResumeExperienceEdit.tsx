"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeNameEditProps } from "./ResumeNameEdit";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeExperiences } from "../redux/slice/resumeSlice";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import toast from "react-hot-toast";
export interface ResumeExperienceEditProps extends ResumeNameEditProps {
  limit: number;
}

const ResumeExperienceEdit = ({ id, limit }: ResumeExperienceEditProps) => {
  const experiences = useAppSelector((state) => state.resume.experiences);
  const dispatch = useAppDispatch();
  const emptyData: ResumeSliceTypes["experiences"][0] = {
    company: "",
    description: "",
    endDate: "",
    location: "",
    startDate: "",
    title: "",
  };
  const [values, setValues] = useState<ResumeSliceTypes["experiences"]>(
    experiences || Array(limit).fill(emptyData)
  );

  const [valuesToShow, setValuesToShow] = useState<boolean[]>(
    Array(limit).fill(false)
  );

  function handleValuesUpdate(
    pos: number,
    data: ResumeSliceTypes["experiences"][0]
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
    const data: ResumeSliceTypes["experiences"] = [...values];
    data.splice(pos, 1, emptyData); // removing the data at pos and adding empty data in its place
    setValues(data);
    // setting values to edit
    const valShowArr = [...valuesToShow];
    valShowArr[pos] = false;
    setValuesToShow(valShowArr);
  }

  useEffect(() => {
    dispatch(setResumeExperiences(values));
  }, [values, dispatch]);

  function setInitialValues() {
    if (experiences !== values) {
      const vArr: ResumeSliceTypes["experiences"] =
        Array(limit).fill(emptyData);
      experiences.forEach(
        (experience: ResumeSliceTypes["experiences"][0], index: number) =>
          (vArr[index] = experience)
      );
      setValues(vArr);

      const vSArr: boolean[] = Array(limit).fill(false);
      experiences.forEach(
        (experience: ResumeSliceTypes["experiences"][0], index: number) => {
          experience.title.length > 0
            ? (vSArr[index] = true)
            : (vSArr[index] = false);
        }
      );
      setValuesToShow(vSArr);
    }
  }

  useEffect(() => {
    setInitialValues();
  }, [experiences]);

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {values.map((_, vIndex: number) => {
        return (
          <div key={`Experience-Edit-View-Container-Form-${vIndex}}`}>
            {valuesToShow[vIndex] ? (
              <ViewExperienceAdded
                data={values[vIndex]}
                pos={vIndex}
                key={`Experience-Edit-View-Form-${vIndex}}`}
                handleValuesToDelete={() => handleValuesToDelete(vIndex)}
                handleValuesToEdit={() => handleValuesToEdit(vIndex)}
              />
            ) : (
              <ExperienceEdit
                data={values[vIndex]}
                pos={vIndex}
                key={`Experience-Edit-Form-${vIndex}}`}
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

interface ExperienceEditProps {
  pos: number;
  handleValuesUpdate: (
    pos: number,
    data: ResumeSliceTypes["experiences"][0]
  ) => void;
  id: string;
  data?: ResumeSliceTypes["experiences"][0] | null;
}
const ExperienceEdit = ({
  pos,
  handleValuesUpdate,
  id,
  data = null,
}: ExperienceEditProps) => {
  const [title, setTitle] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function createValueNHandle() {
    if (
      title.length > 0 &&
      company.length > 0 &&
      startDate.length > 0 &&
      endDate.length > 0
    ) {
      const data: ResumeSliceTypes["experiences"][0] = {
        title,
        description,
        endDate,
        company,
        location,
        startDate,
      };
      handleValuesUpdate(pos, data);
    } else {
      toast.error("Title, Company, Start Date and End Date must be provided.");
    }
  }

  useEffect(() => {
    if (data !== null) {
      const { company, description, endDate, location, startDate, title } =
        data;
      setTitle(title);
      setCompany(company);
      setDescription(description);
      setEndDate(endDate);
      setStartDate(startDate);
      setLocation(location);
    }
  }, [data]);

  return (
    <div className="w-full h-auto flex flex-col gap-1">
      <TextComponent
        id={`${id}-${pos}-title`}
        placeHolder="Job Position / Title"
        value={title}
        valueHandler={setTitle}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-company`}
        placeHolder="Company / Organization"
        value={company}
        valueHandler={setCompany}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-location`}
        placeHolder="Location of company / organization"
        value={location}
        valueHandler={setLocation}
        className="w-full rounded-md text-black"
      />
      <div className="w-full h-auto flex flex-row gap-1">
        <TextComponent
          id={`${id}-${pos}-startDate`}
          placeHolder="Job Start Date"
          value={startDate}
          valueHandler={setStartDate}
          className="w-full rounded-md text-black"
        />
        <TextComponent
          id={`${id}-${pos}-endDate`}
          placeHolder="Job End Date"
          value={endDate}
          valueHandler={setEndDate}
          className="w-full rounded-md text-black"
        />
      </div>
      <TextComponent
        id={`${id}-${pos}-description`}
        placeHolder="What you did at JOB ?"
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

interface ViewExperienceAddedProps {
  pos: number;
  data: ResumeSliceTypes["experiences"][0];
  handleValuesToDelete: (pos: number) => void;
  handleValuesToEdit: (pos: number) => void;
}
const ViewExperienceAdded = ({
  data,
  pos,
  handleValuesToDelete,
  handleValuesToEdit,
}: ViewExperienceAddedProps) => {
  const { company, description, endDate, location, startDate, title } = data;
  return (
    <div className="w-full h-auto flex flex-col gap-1 text-black cursor-auto">
      <div className="truncate">{title}</div>
      <div className="truncate">{company}</div>
      <div className="w-full h-auto flex flex-row gap-1">
        <div className="w-full h-auto text-center">{startDate}</div>
        <div className="w-full h-auto text-center">{endDate}</div>
      </div>
      <div className="truncate">{location}</div>
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

export default ResumeExperienceEdit;
