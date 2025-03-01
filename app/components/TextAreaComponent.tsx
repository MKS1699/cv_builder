"use client";

import { StyledComponentPropsTypes } from "../types/styledComponent";

interface TextAreaComponentPropsTypes extends StyledComponentPropsTypes {
  value: string;
  valueHandler: (val: string) => void;
  id: string;
  placeHolder: string;
}

const TextAreaComponent = ({
  id,
  placeHolder,
  value,
  valueHandler,
  className,
}: TextAreaComponentPropsTypes) => {
  return (
    <textarea
      value={value}
      onChange={(e) => valueHandler(e.target.value.toString())}
      id={`${id}-text`}
      key={`${id}-text`}
      name={`${id}-text`}
      placeholder={placeHolder}
      className={`outline-none max-w-full h-auto p-1 placeholder:font-normal placeholder:text-gray-400 resize-none ${className}`}
    />
  );
};

export default TextAreaComponent;
