"use client";

import { StyledComponentPropsTypes } from "../types/styledComponent";

interface TextComponentPropsTypes extends StyledComponentPropsTypes {
  value: string;
  valueHandler: (val: string) => void;
  id: string;
  placeHolder: string;
}
const TextComponent = ({
  id,
  value,
  valueHandler,
  className,
  placeHolder,
}: TextComponentPropsTypes) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => valueHandler(e.target.value.toString())}
      id={`${id}-text`}
      key={`${id}-text`}
      name={`${id}-text`}
      placeholder={placeHolder}
      className={`outline-none p-1 placeholder:font-normal placeholder:text-gray-400 ${className}`}
    />
  );
};

export default TextComponent;
