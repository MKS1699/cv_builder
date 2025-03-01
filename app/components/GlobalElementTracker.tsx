"use client";

import { useEffect, useState } from "react";

const GlobalElementTracker = () => {
  const [clickedElement, setClickedElement] = useState<string | null>(null);

  useEffect(() => {
    const handleClickChange = (e: MouseEvent) => {
      let target = e.target as HTMLElement;
      setClickedElement(target.id);
    };

    window.addEventListener("click", handleClickChange);

    return () => {
      window.addEventListener("click", handleClickChange);
    };
  }, []);

  useEffect(() => {
    // console.log(clickedElement);
  }, [clickedElement]);
  return <> </>;
};

export default GlobalElementTracker;
