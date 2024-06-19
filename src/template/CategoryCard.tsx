import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface CategoryCardProps {
  category: string;
  isOpen: boolean;
  onClick: () => void;
  selected: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isOpen, onClick, selected }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
      if (match.startsWith('-') || match.startsWith('_')) {
        return match[0] === '-' ? ' ' + letter.toUpperCase() : ' / ' + letter.toUpperCase();
      }
      return letter.toUpperCase();
    });
  }

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setImageLoaded(true), 500); // Adjust this duration as needed
      return () => clearTimeout(timer);
    } else {
      setImageLoaded(false);
      return () => {}; // No-op cleanup function
    }
  }, [isOpen]);

  return (
    <button 
      className={`bg-slate-50 dark:bg-slate-800 h-fit mx-2
      hover:shadow-xl hover:scale-105 dark:hover:bg-slate-900 
      rounded-lg shadow dark:shadow-slate-300/5
      dark:text-slate-200 text-slate-800 
      transition-all duration-500 ease-in-out overflow-x-hidden
      ${isOpen ? 'opacity-100 transform translate-x-0 w-[200px] md:w-[300px]' : 'opacity-0 transform -translate-x-4 w-[0px]'}
      ${selected ? 'border-2 border-blue-500' : ''}`}
      onClick={onClick}
    >
      <div className='flex flex-row w-full h-[50px] sm:h-20'>
        {imageLoaded ? (
          <Image src={`/categories/${category}.svg`} alt={`${category} image`} height={50} width={80} className='rounded-l-lg h-full w-[50px] sm:w-[80px]'/>
        ) : (
          <div className="bg-gray-300 dark:bg-gray-700 md:w-[80px] h-full rounded-l-lg"></div>
        )}
        <p className='text-sm sm:text-xl md:text-2xl font-bold text-left mx-auto my-auto'>{toCapitalized(category)}</p>
      </div>
    </button>
  );
}

export default CategoryCard;
