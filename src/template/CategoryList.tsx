import React, { useEffect, useRef, useState } from 'react';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ isOpen, setIsOpen, data }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    if(divRef.current) {
      const siblingElement = divRef.current.nextElementSibling as HTMLElement;
      const siblingHeight = siblingElement?.offsetHeight || null;      
      setMaxHeight(siblingHeight);
    }
  }, []);
  
  return (
    <div 
    ref={divRef} 
    style={maxHeight ? { maxHeight: `${maxHeight + 60}px` } : {}}
    className={` border-r-2 border-slate-200 dark:border-slate-800 sticky left-0 top-0 -mb-4 
    transition-all duration-1000
    ${isOpen ? 'overflow-y-auto h-screen border-r-0': ''} `}>
      {/* Hamburger Button */}
      <div className={` h-fit w-full  top-0 sticky z-10 
      transition-all duration-1000 border-t
      ${isOpen ? 'bg-stone-100 dark:bg-slate-800  dark:border-slate-600 ': 'bg-transparent border-transparent'} `}>
        
        <div className='flex flex-row items-center justify-between '>
          <p className={`text-xl duration-200 ${isOpen ? 'w-fit ml-4' : ' text-transparent w-0'} `}>Previous&nbsp;Months</p>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`  p-2 m-2 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
          hover:bg-slate-200 dark:hover:bg-slate-900 rounded-lg
           transition-all duration-1000
          ${isOpen ? ' ' : ''} `}
        >
          {isOpen ? 

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            
            : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
            </svg>
            }
        </button>
        </div>
      </div>  
      {/* Categories */}
      <div className={`flex flex-col items-center px-2 py-4 mx-2 gap-4 ${isOpen ? '' : 'h-0'} `}>
      {data && data.map((category, index) => (
        <CategoryCard 
          key={index}
          isOpen={isOpen}
          data={category}  // passing individual category instead of entire array
        />
      ))}
      </div>
    </div>
  );
}

export default CategoryList;
