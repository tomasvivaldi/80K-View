// interface FeedbackCategoriesProps {
//   categories: string[];
//   onCategorySelect: (categoryIndex: number) => void;
//   currentIndex: number;
// }

// function toCapitalized(str: string): string {
//   return str.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
//     if (match.startsWith('-') || match.startsWith('_')) {
//       return match[0] === '-' ? ' ' + letter.toUpperCase() : ' / ' + letter.toUpperCase();
//     }
//     return letter.toUpperCase();
//   });
// }

// function FeedbackCategories({ categories, onCategorySelect, currentIndex }: FeedbackCategoriesProps) {
//   return (
//     <div className="flex flex-wrap gap-2 mb-4 justify-between">
//       {categories.map((category, index) => (
//         <button
//           key={category}
//           className={` shadow-lg px-2 py-1 border rounded-full text-sm font-semibold ${index === currentIndex ? 'bg-blue-500 text-white border-gray-100 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-600' : 'bg-white dark:bg-blue-600 dark:text-white text-blue-500 border-blue-600'}`}
//           onClick={() => onCategorySelect(index)}
//         >
//           {toCapitalized(category)}
//         </button>
//       ))}
//     </div>
//   );
// }

import * as React from "react";
import { SVGProps } from "react";


interface FeedbackCategoriesProps {
  categories: string[];
  onCategorySelect: (categoryIndex: number) => void;
  currentIndex: number;
  userData: UserDataById;
  sortedCategoryNames: string[];
}

// CustomSelect component
function CustomSelect({ categories, onCategorySelect, currentIndex }: FeedbackCategoriesProps) {
  const [selectedValue, setSelectedValue] = React.useState(categories[currentIndex] || "");
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    setSelectedValue(categories[currentIndex] || "");
  }, [categories, currentIndex]);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectItem = (index: number) => {
    const value = categories[index] || "";
    setSelectedValue(value);
    setIsOpen(true);
    onCategorySelect(index);
  };

  return (
    <div className="relative w-full md:hidden my-4 text-gray-900 dark:text-gray-200">
      <p className="text-lg my-2 font-semibold">Categories:</p>
      <div
        className="border border-gray-900 dark:border-gray-200 w-full flex justify-between rounded p-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span>{toCapitalized(selectedValue)}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 my-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute bg-white dark:bg-slate-900 border border-gray-900 dark:border-gray-200 rounded mt-1 w-full z-10">
          {categories.map((category, index) => (
            <div
              key={category}
              className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 "
              onClick={() => selectItem(index)}
            >
              <p>{toCapitalized(category)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function toCapitalized(str: string): string {
  return str.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
    if (match.startsWith('-') || match.startsWith('_')) {
      return match[0] === '-' ? ' ' + letter.toUpperCase() : ' / ' + letter.toUpperCase();
    }
    return letter.toUpperCase();
  });
}

function getIndicator(userData: UserDataById, sortedCategoryNames: string[], categoryIndex: number) {
  const categoryData = userData[sortedCategoryNames[categoryIndex] as keyof UserDataById] as Category[];
  if (!categoryData || categoryData.length === 0) {
    return null;
  }

  const goals = categoryData[0]?.goals as Goal;
  if (!goals || goals.items.length === 0) {
    return null;
  }

  const allChecked = goals.items.every(item => item.isChecked);
  if (allChecked) {
    return <CheckCircleIcon className="absolute -right-2 -top-2 dark:text-green-500 text-white stroke-green-500 dark:stroke-slate-100" />;
  } else {
    return <YellowCircleIcon className="absolute -right-2 -top-2 text-yellow-500 duration-[500ms] pulse-limited" />;
  }
}



// FeedbackCategories component
// FeedbackCategories component
function FeedbackCategories({ categories, onCategorySelect, currentIndex, userData, sortedCategoryNames }: FeedbackCategoriesProps) {
  return (
    <div>
      {/* Dropdown for small screens */}
      <CustomSelect
        categories={categories}
        onCategorySelect={onCategorySelect}
        currentIndex={currentIndex}
        userData={userData}
        sortedCategoryNames={sortedCategoryNames}
      />

      {/* Button-based selection for larger screens */}
      <div className="hidden md:flex flex-wrap gap-2 mb-4 justify-between">
        {categories.map((category, index) => (
          <div key={category} className="relative">
            {getIndicator(userData, sortedCategoryNames, index)}
            <button
              className={`shadow-lg px-2 py-1 border rounded-full text-sm font-semibold ${
                index === currentIndex
                  ? 'bg-blue-500 text-white border-gray-100 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-600'
                  : 'bg-white dark:bg-blue-600 dark:text-white text-blue-500 border-blue-600'
              }`}
              onClick={() => onCategorySelect(index)}
            >
              {toCapitalized(category)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackCategories;

export function CheckCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
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
      width="9"
      height="9"
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