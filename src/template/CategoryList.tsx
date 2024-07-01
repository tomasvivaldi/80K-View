import React, { useEffect, useRef, useState } from 'react';
import CategoryCard from './CategoryCard';

interface CategoryListProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: string[];
  onCategorySelect: (categoryIndex: number) => void;
  currentIndex: number;
  handleNextClick: () => void;
  hasSubmitted: boolean;
  formData: MyFormData;
}

const CategoryList: React.FC<CategoryListProps> = ({ isOpen, setIsOpen, categories, onCategorySelect, currentIndex, handleNextClick, hasSubmitted, formData }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | null>(null);

  useEffect(() => {
    if (divRef.current) {
      const siblingElement = divRef.current.nextElementSibling as HTMLElement;
      const siblingHeight = siblingElement?.offsetHeight || null;
      setMaxHeight(siblingHeight);
    }
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectItem = (index: number) => {
    onCategorySelect(index);
  };

  return (
    <div 
      ref={divRef} 
      style={maxHeight ? { maxHeight: `${maxHeight + 60}px` } : {}}
      className={`border-r-2 border-slate-200 dark:border-slate-800 sticky left-0 top-0 -mb-4 
      transition-all duration-1000 
      ${isOpen ? 'overflow-y-auto h-[91vh] border-r-0 w-fit' : ''}`}
    >
      {/* Hamburger Button */}
      <div className={`h-fit w-full top-0 sticky z-10 
      transition-all duration-1000 border-t
      ${isOpen ? 'bg-stone-100 dark:bg-slate-800 dark:border-slate-600' : 'bg-transparent border-transparent'}`}
      >
        <div className='flex flex-row items-center justify-between'>
          {isOpen && (
            <p className={`text-xl font-bold duration-200 text-black dark:text-white ${isOpen ? 'w-fit ml-4' : 'w-0'}`}>Categories</p>
          )}
          <button 
            onClick={toggleDropdown} 
            className={`p-2 m-2 
            hover:bg-slate-200 dark:hover:bg-slate-900 rounded-lg
            transition-all duration-1000
            ${isOpen ? '' : ''}`}
          >
            {isOpen ? 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg> : 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            }
          </button>
        </div>
      </div>
      {/* Categories */}
      <div className={`flex flex-col items-center px-2 py-4 mx-2 gap-4 ${isOpen ? '' : 'h-0'}`}>
        {categories.map((category, index) => (
          <CategoryCard 
            key={category}
            isOpen={isOpen}
            onClick={() => selectItem(index)}
            category={category}
            selected={index === currentIndex}
            hasSubmitted={hasSubmitted}
            formData={formData[category as keyof MyFormData]}
          />
        ))}
      </div>
      <div className={`w-full h-fit py-3 flex justify-center items-center ${isOpen ? 'bg-white/90 dark:bg-black/90 dark:border-slate-600 shadow-xl block' : 'hidden'} sticky bottom-0`}>
        <button className='sm:text-lg w-32 sm:w-44 rounded-full p-1 border-2 font-semibold bg-white dark:bg-transparent text-black dark:text-sky-500 border-slate-800 dark:border-sky-500 hover:bg-slate-50 active:bg-slate-100 dark:hover:bg-gray-900 dark:active:bg-gray-800 group'  onClick={handleNextClick}><p className='group-hover:scale-110 transition-all duration-300'>Review</p></button>
      </div>
    </div>
  );
}

export default CategoryList;
