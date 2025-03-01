"use client";

import { useState } from "react";
import { StyledComponentPropsTypes } from "../types/styledComponent";
import { MdClear } from "react-icons/md";
import clsx from "clsx";
import toast from "react-hot-toast";

interface ListComponentPropsTypes extends StyledComponentPropsTypes {
  value: string[];
  valueHandler: (val: string[]) => void;
  id: string;
  placeHolder: string;
  displayList?: boolean;
}
const ListComponent = ({
  id,
  placeHolder,
  value,
  valueHandler,
  className,
  displayList = false,
}: ListComponentPropsTypes) => {
  const [str, setStr] = useState<string>("");

  // creating list
  const createList = (): string[] => {
    const strArr: string[] = str
      .split(",")
      .filter((val: string) => val.length > 0);

    if (value.length <= 0) {
      setStr("");
      return strArr;
    } else {
      const valArr: string[] = [...value];
      // removing duplicate
      const filteredValArr: string[] = strArr.filter((val: string) => {
        valArr.includes(val) && toast.error(`${val} Skill present.`);
        return !valArr.includes(val);
      });
      let resultArr = valArr.concat(filteredValArr);
      setStr("");
      return resultArr;
    }
  };

  // remove val from lists
  function removeVal(valIndex: number) {
    let valArr = [...value];
    valArr.splice(valIndex, 1);
    valueHandler(valArr);
  }

  // backspace function
  function lastValEdit(): void {
    if (value.length > 0) {
      // setting last list item to edit
      const lastListEl: string = value[value.length - 1];
      setStr(lastListEl);
      // updating list
      const valArr = [...value];
      valArr.splice(valArr.length - 1, 1); // removing last el from list
      valueHandler(valArr); // updating list
    }
  }

  return (
    <div
      key={`list-${id}`}
      id={`list-${id}`}
      className={clsx(
        "max-w-full h-auto flex flex-wrap flex-row gap-2 rounded-md",
        className
          ?.split(" ")
          .map((cn: string) => `${cn}!`)
          .join(" "),
        displayList ? "p-0" : "p-0"
      )}
    >
      {/* list display */}
      {displayList &&
        value.length > 0 &&
        value.map((val: string, index: number) => {
          return (
            <div
              key={`list-${id}-${index}`}
              id={`list-${id}-${index}`}
              className="w-fit h-full flex flex-row gap-1 items-center ring-1 ring-blue-500 rounded-md p-1"
            >
              {/* value */}
              <div
                key={`list-${id}-${index}-value`}
                id={`list-${id}-${index}-value`}
                className="w-full h-full"
              >
                {val}
              </div>
              {/* value remove btn */}
              <div
                key={`list-${id}-${index}-removeBtn`}
                id={`list-${id}-${index}-removeBtn`}
                onClick={() => removeVal(index)}
                className="w-full h-full cursor-pointer text-red-500"
              >
                <MdClear className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      {/* string entered by the user */}
      <input
        type="text"
        value={str}
        onChange={(e) => setStr(e.target.value.toString())}
        onKeyUp={(e) => {
          if (e.key === ",") {
            valueHandler(createList());
          }
          if (str.length <= 0) {
            if (e.key === "Backspace") {
              lastValEdit();
              // bug : when the last alphabet of item
              // is removed it jumps to the item before the current item
              // for editing instead of stopping there after erasing the last
              // alphabet of the current item.
            }
          }
        }}
        id={`${id}-text`}
        key={`${id}-text`}
        name={`${id}-text`}
        placeholder={placeHolder}
        className={clsx(
          "focus:outline-none placeholder:font-normal placeholder:text-gray-700 p-2 w-full rounded-md",
          displayList && "border-b-2 border-purple-500 bg-white"
        )}
      />
    </div>
  );
};

export default ListComponent;
