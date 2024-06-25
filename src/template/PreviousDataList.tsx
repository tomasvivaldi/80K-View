import React, { useEffect, useRef } from 'react';
import MonthDataSmallCard from './MonthDataSmallCard';


interface PreviousDataListProps {
  data?: Category[];
  isOpen: boolean;
}

const PreviousDataList: React.FC<PreviousDataListProps> = ({ data, isOpen }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollLeft = divRef.current.scrollWidth;
    }
  }, [data]);

  console.log("PreviousDataList - data", data);

  return (
    <div 
      ref={divRef} 
      className={`border-r-2 border-slate-200 dark:border-slate-800 mb-4 
      transition-all duration-1000 h-fit ${isOpen ? 'w-[72vw]' : 'w-[90vw]'} dark:bg-transparent overflow-x-scroll`}
    >
      <div className="flex flex-row items-center px-4 py-4 mx-2 gap-4">
        {data && data.slice().reverse().map((category, index) => (
          <MonthDataSmallCard 
            key={index}
            data={category}  
            
          />
        ))}   
        
      </div>
    </div>
  );
}

export default PreviousDataList;
