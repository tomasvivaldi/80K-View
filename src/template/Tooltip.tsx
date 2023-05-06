import React, { useState, useEffect, useRef } from "react";

function Tooltip(props: { text: string | null; }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);


  const handleClick = (e: MouseEvent | any) => {
    if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="group flex relative w-fit" ref={tooltipRef}>
      <span
        className="cursor-pointer bg-slate-100 text-gray-700 w-5 h-5 p-1 border-2 border-gray-700 rounded-full flex justify-center items-center"
        onClick={() => setIsVisible(!isVisible)}
      >
        i
      </span>
      <span
        className={`text-center transition-opacity bg-slate-800 p-2 text-sm text-gray-100 rounded-md absolute right-0 bottom-0 translate-x- m-6 z-50 w-44 ${
          isVisible ? "visible" : "invisible"
        }`}
      >
        {props.text}
      </span>
    </div>
  );
}

export default Tooltip;
