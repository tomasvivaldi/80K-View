import React, {  useRef } from 'react';
import MonthDataSmallCard from './MonthDataSmallCard';

interface PreviousDataListProps {
  data?: Category[];
  isOpen: boolean;
}

const PreviousDataList: React.FC<PreviousDataListProps> = ({ data, isOpen }) => {
  const divRef = useRef<HTMLDivElement>(null);
  
console.log("PreviousDataList - data", data)

  return (
    <div 
    ref={divRef} 
   
    className={` border-r-2 border-slate-200 dark:border-slate-800 mb-4 
    transition-all duration-1000 h-fit ${isOpen ? 'w-[72vw]' : 'w-[90vw]'} dark:bg-transparent
    `}>

      {/* Categories */}
      <div className={`flex flex-row
         items-center px-2 py-4 mx-2 gap-4 overflow-x-scroll`}>
      {data && data.map((category, index) => (
          <MonthDataSmallCard 
            key={index}
          
            data={category}  // passing individual category instead of entire array
          />
      ))}
      </div>

      

    </div>
  );
}

export default PreviousDataList;
