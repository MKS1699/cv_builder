"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
interface useReactNodeToHTMLElementPropsTypes {
  reactNode: ReactNode;
}
const useReactNodeToHTMLElement = ({
  reactNode,
}: useReactNodeToHTMLElementPropsTypes) => {
  const containerRef = useRef<HTMLElement>(null);

  const [htmlEl, setHtmlEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = document.createElement("div");
    containerRef.current = container;

    const root = ReactDOM.createRoot(container);

    root.render(reactNode);

    setHtmlEl(container);

    return () => {
      if (containerRef.current) {
        root.unmount();
      }
    };
  }, [reactNode]);

  return htmlEl && htmlEl;
};

export default useReactNodeToHTMLElement;
