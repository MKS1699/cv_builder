"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeNameEditProps } from "./ResumeNameEdit";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeProjects } from "../redux/slice/resumeSlice";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import toast from "react-hot-toast";
import ListComponent from "./ListComponent";
export interface ResumeProjectsEditProps extends ResumeNameEditProps {
  limit: number;
}

const ResumeProjectsEdit = ({ id, limit }: ResumeProjectsEditProps) => {
  const projects = useAppSelector((state) => state.resume.projects);
  const dispatch = useAppDispatch();
  const emptyData: ResumeSliceTypes["projects"][0] = {
    demo: "",
    description: "",
    github: "",
    name: "",
    technologies: [],
  };
  const [values, setValues] = useState<ResumeSliceTypes["projects"]>(
    projects || Array(limit).fill(emptyData)
  );

  const [valuesToShow, setValuesToShow] = useState<boolean[]>(
    Array(limit).fill(false)
  );

  function handleValuesUpdate(
    pos: number,
    data: ResumeSliceTypes["projects"][0]
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
    const data: ResumeSliceTypes["projects"] = [...values];
    data.splice(pos, 1, emptyData);
    setValues(data);
    // setting values to edit
    const valShowArr = [...valuesToShow];
    valShowArr[pos] = false;
    setValuesToShow(valShowArr);
  }

  useEffect(() => {
    dispatch(setResumeProjects(values));
  }, [values, dispatch]);

  function setInitialValues() {
    if (projects !== values) {
      const vArr: ResumeSliceTypes["projects"] = Array(limit).fill(emptyData);
      projects.forEach(
        (project: ResumeSliceTypes["projects"][0], index: number) =>
          (vArr[index] = project)
      );
      setValues(vArr);

      const vSArr: boolean[] = Array(limit).fill(false);
      projects.forEach(
        (project: ResumeSliceTypes["projects"][0], index: number) => {
          project.name.length > 0
            ? (vSArr[index] = true)
            : (vSArr[index] = false);
        }
      );
      setValuesToShow(vSArr);
    }
  }

  useEffect(() => {
    setInitialValues();
  }, [projects]);

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {values.map((_, vIndex: number) => {
        return (
          <div key={`Project-Edit-View-Container-Form-${vIndex}}`}>
            {valuesToShow[vIndex] ? (
              <ViewProjectAdded
                data={values[vIndex]}
                pos={vIndex}
                key={`Project-Edit-View-Form-${vIndex}}`}
                handleValuesToDelete={() => handleValuesToDelete(vIndex)}
                handleValuesToEdit={() => handleValuesToEdit(vIndex)}
              />
            ) : (
              <ProjectEdit
                data={values[vIndex]}
                pos={vIndex}
                key={`Project-Edit-Form-${vIndex}}`}
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

interface ProjectEditProps {
  pos: number;
  handleValuesUpdate: (
    pos: number,
    data: ResumeSliceTypes["projects"][0]
  ) => void;
  id: string;
  data?: ResumeSliceTypes["projects"][0] | null;
}
const ProjectEdit = ({
  pos,
  handleValuesUpdate,
  id,
  data = null,
}: ProjectEditProps) => {
  const [name, setName] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [demo, setDemo] = useState<string>("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");

  function createValueNHandle() {
    if (name.length > 0) {
      const data: ResumeSliceTypes["projects"][0] = {
        demo,
        description,
        github,
        name,
        technologies,
      };
      handleValuesUpdate(pos, data);
    } else {
      toast.error("Name should be provided.");
    }
  }

  useEffect(() => {
    if (data !== null) {
      const { demo, description, github, name, technologies } = data;
      setName(name);
      setDescription(description);
      setTechnologies(technologies);
      setDemo(demo);
      setGithub(github);
    }
  }, [data]);

  return (
    <div className="w-full h-auto flex flex-col gap-1">
      <TextComponent
        id={`${id}-${pos}-name`}
        placeHolder="Project Name"
        value={name}
        valueHandler={setName}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-github`}
        placeHolder="Project Github repo"
        value={github}
        valueHandler={setGithub}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-demo`}
        placeHolder="Project link"
        value={demo}
        valueHandler={setDemo}
        className="w-full rounded-md text-black"
      />
      <ListComponent
        id={`${id}-${pos}-endDate`}
        placeHolder="Tech Stack of the project"
        value={technologies}
        valueHandler={setTechnologies}
        className="w-full rounded-md text-black"
        displayList
      />
      <TextComponent
        id={`${id}-${pos}-description`}
        placeHolder="Few words for Project"
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

interface ViewProjectAddedProps {
  pos: number;
  data: ResumeSliceTypes["projects"][0];
  handleValuesToDelete: (pos: number) => void;
  handleValuesToEdit: (pos: number) => void;
}
const ViewProjectAdded = ({
  data,
  pos,
  handleValuesToDelete,
  handleValuesToEdit,
}: ViewProjectAddedProps) => {
  const { demo, description, github, name, technologies } = data;
  return (
    <div className="w-full h-auto flex flex-col gap-1 text-black cursor-auto">
      <div className="truncate">{name}</div>
      <div className="truncate">{description}</div>
      <div className="w-full h-auto flex flex-row gap-1">
        <div className="w-full h-auto text-center">{demo}</div>
        <div className="w-full h-auto text-center">{github}</div>
      </div>
      <div className="w-full h-auto flex flex-row flex-wrap gap-1">
        {technologies.map((tech: string, tIndex: number) => {
          return (
            <div
              className="w-fit h-auto"
              key={`Project-${name}-tech-${tIndex}`}
            >
              {tech},
            </div>
          );
        })}
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

export default ResumeProjectsEdit;
