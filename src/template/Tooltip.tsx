import React, { useState, useEffect, useRef } from "react";

interface TooltipProps {
  text: string | null;
  position?: "right" | "left";
  width?: string;
}

function Tooltip(props: TooltipProps) {
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

  const translateXClass = props.position === "right" ? "translate-x-[115%]" : "";
  const widthClass = props.width || "w-44";

  return (
    <div className="group flex relative w-fit" ref={tooltipRef}>
      <span
        className="cursor-pointer bg-slate-100 text-gray-700 w-5 h-5 p-1 border-2 border-gray-700 rounded-full flex justify-center items-center"
        onClick={() => setIsVisible(!isVisible)}
      >
        i
      </span>
      <span
        className={`text-center transition-opacity bg-slate-800 p-2 text-sm text-gray-100 rounded-md absolute right-0 bottom-0 ${translateXClass} m-6 z-50 ${widthClass} ${
          isVisible ? "visible" : "invisible"
        }`}
      >
        {props.text}
      </span>
    </div>
  );
}

export default Tooltip;
