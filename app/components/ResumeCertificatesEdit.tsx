"use client";

import { useEffect, useRef, useState } from "react";
import { ResumeNameEditProps } from "./ResumeNameEdit";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import TextComponent from "./TextComponent";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { setResumeCertifications } from "../redux/slice/resumeSlice";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import toast from "react-hot-toast";
export interface ResumeCertificatesEditProps extends ResumeNameEditProps {
  limit: number;
}

const ResumeCertificatesEdit = ({ id, limit }: ResumeCertificatesEditProps) => {
  const certifications = useAppSelector((state) => state.resume.certifications);
  const dispatch = useAppDispatch();
  const emptyData: ResumeSliceTypes["certifications"][0] = {
    authority: "",
    endDate: "",
    license: "",
    name: "",
    startDate: "",
  };
  const [values, setValues] = useState<ResumeSliceTypes["certifications"]>(
    certifications || Array(limit).fill(emptyData)
  );

  const [valuesToShow, setValuesToShow] = useState<boolean[]>(
    Array(limit).fill(false)
  );

  function handleValuesUpdate(
    pos: number,
    data: ResumeSliceTypes["certifications"][0]
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
    const data: ResumeSliceTypes["certifications"] = [...values];
    data.splice(pos, 1, emptyData);
    setValues(data);
    // setting values to edit
    const valShowArr = [...valuesToShow];
    valShowArr[pos] = false;
    setValuesToShow(valShowArr);
  }

  useEffect(() => {
    dispatch(setResumeCertifications(values));
  }, [values, dispatch]);

  function setInitialValues() {
    if (certifications !== values) {
      const vArr: ResumeSliceTypes["certifications"] =
        Array(limit).fill(emptyData);
      certifications.forEach(
        (certificate: ResumeSliceTypes["certifications"][0], index: number) =>
          (vArr[index] = certificate)
      );
      setValues(vArr);

      const vSArr: boolean[] = Array(limit).fill(false);
      certifications.forEach(
        (certificate: ResumeSliceTypes["certifications"][0], index: number) => {
          certificate.name.length > 0
            ? (vSArr[index] = true)
            : (vSArr[index] = false);
        }
      );
      setValuesToShow(vSArr);
    }
  }

  useEffect(() => {
    setInitialValues();
  }, [certifications]);

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {values.map((_, vIndex: number) => {
        return (
          <div key={`Certificate-Edit-View-Container-Form-${vIndex}}`}>
            {valuesToShow[vIndex] ? (
              <ViewCertificatesAdded
                data={values[vIndex]}
                pos={vIndex}
                key={`Certificate-Edit-View-Form-${vIndex}}`}
                handleValuesToDelete={() => handleValuesToDelete(vIndex)}
                handleValuesToEdit={() => handleValuesToEdit(vIndex)}
              />
            ) : (
              <CertificatesEdit
                data={values[vIndex]}
                pos={vIndex}
                key={`Certificate-Edit-Form-${vIndex}}`}
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

interface CertificatesEditProps {
  pos: number;
  handleValuesUpdate: (
    pos: number,
    data: ResumeSliceTypes["certifications"][0]
  ) => void;
  id: string;
  data?: ResumeSliceTypes["certifications"][0] | null;
}
const CertificatesEdit = ({
  pos,
  handleValuesUpdate,
  id,
  data = null,
}: CertificatesEditProps) => {
  const [name, setName] = useState<string>("");
  const [license, setLicense] = useState<string>("");
  const [authority, setAuthority] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  function createValueNHandle() {
    if (name.length > 0) {
      const data: ResumeSliceTypes["certifications"][0] = {
        endDate,
        authority,
        license,
        name,
        startDate,
      };
      handleValuesUpdate(pos, data);
    } else {
      toast.error("Name should be provided.");
    }
  }

  useEffect(() => {
    if (data !== null) {
      const { authority, endDate, license, name, startDate } = data;
      setName(name);
      setLicense(license);
      setEndDate(endDate);
      setStartDate(startDate);
      setAuthority(authority);
    }
  }, [data]);

  return (
    <div className="w-full h-auto flex flex-col gap-1">
      <TextComponent
        id={`${id}-${pos}-name`}
        placeHolder="Certificate For"
        value={name}
        valueHandler={setName}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-license`}
        placeHolder="Certificate / License Number"
        value={license}
        valueHandler={setLicense}
        className="w-full rounded-md text-black"
      />
      <TextComponent
        id={`${id}-${pos}-authority`}
        placeHolder="Certificate Provider / Authority Issuing"
        value={authority}
        valueHandler={setAuthority}
        className="w-full rounded-md text-black"
      />
      <div className="w-full h-auto flex flex-row gap-1">
        <TextComponent
          id={`${id}-${pos}-startDate`}
          placeHolder="Certificate Start Date"
          value={startDate}
          valueHandler={setStartDate}
          className="w-full rounded-md text-black"
        />
        <TextComponent
          id={`${id}-${pos}-endDate`}
          placeHolder="Certificate End Date"
          value={endDate}
          valueHandler={setEndDate}
          className="w-full rounded-md text-black"
        />
      </div>
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

interface ViewCertificatesAddedProps {
  pos: number;
  data: ResumeSliceTypes["certifications"][0];
  handleValuesToDelete: (pos: number) => void;
  handleValuesToEdit: (pos: number) => void;
}
const ViewCertificatesAdded = ({
  data,
  pos,
  handleValuesToDelete,
  handleValuesToEdit,
}: ViewCertificatesAddedProps) => {
  const { authority, endDate, license, name, startDate } = data;
  return (
    <div className="w-full h-auto flex flex-col gap-1 text-black cursor-auto">
      <div className="truncate">{name}</div>
      <div className="truncate">{authority}</div>
      <div className="w-full h-auto flex flex-row gap-1">
        <div className="w-full h-auto text-center">{startDate}</div>
        <div className="w-full h-auto text-center">{endDate}</div>
      </div>
      <div className="truncate">{license}</div>
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

export default ResumeCertificatesEdit;
