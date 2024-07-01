import Image from 'next/image';
import React, { useState, useEffect, SVGProps } from 'react';


interface CategoryCardProps {
  category: string;
  isOpen: boolean;
  onClick: () => void;
  selected: boolean;
  hasSubmitted: boolean;
  formData: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isOpen, onClick, selected, hasSubmitted, formData }) => {
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

  const hasMissingData = !formData?.score || !formData?.notes || !formData?.action_plan;
  const highlightClass = hasSubmitted && hasMissingData ? 'border-2 border-red-500' : '';

  return (
    <button 
      className={`relative bg-slate-50 dark:bg-slate-800 h-fit mx-2 group
      hover:shadow-xl  dark:hover:bg-slate-900 
      rounded-lg shadow dark:shadow-slate-300/5
      dark:text-slate-200 text-slate-800 
      transition-all duration-500 ease-in-out overflow-x-hidden
      ${isOpen ? 'opacity-100 transform translate-x-0 w-[200px] md:w-[300px]' : 'opacity-0 transform -translate-x-4 w-[0px]'}
      ${selected ? 'border-2 border-blue-500' : ''} ${highlightClass}`}
      onClick={onClick}
    >
      <div className='absolute -right-[6px] -top-[6px] transform-none transition-none'>
        {hasMissingData ? (
          <YellowCircleIcon className="text-yellow-500" />
        ) : (
          <CheckCircleIcon className="dark:text-green-500 text-white stroke-green-500 dark:stroke-slate-100" />
        )}
      </div>
      <div className='flex flex-row w-full h-[50px] sm:h-20'>
        {imageLoaded ? (
          <Image src={`/categories/${category}.svg`} alt={`${category} image`} height={50} width={80} className='rounded-l-lg h-full w-[50px] sm:w-[80px]'/>
        ) : (
          <div className="bg-gray-300 dark:bg-gray-700 md:w-[80px] h-full rounded-l-lg"></div>
        )}
        <p className='text-sm sm:text-xl md:text-2xl font-bold text-left mx-auto my-auto group-hover:scale-105 '>{toCapitalized(category)}</p>
      </div>
    </button>
  );
}

export default CategoryCard;

export function CheckCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor" // Set fill to currentColor
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function YellowCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor" // Set fill to currentColor
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

