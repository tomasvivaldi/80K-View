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

interface FeedbackCategoriesProps {
  categories: string[];
  onCategorySelect: (categoryIndex: number) => void;
  currentIndex: number;
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

// FeedbackCategories component
function FeedbackCategories({ categories, onCategorySelect, currentIndex }: FeedbackCategoriesProps) {
  return (
    <div>
      {/* Dropdown for small screens */}
      <CustomSelect
        categories={categories}
        onCategorySelect={onCategorySelect}
        currentIndex={currentIndex}
      />

      {/* Button-based selection for larger screens */}
      <div className="hidden md:flex flex-wrap gap-2 mb-4 justify-between">
        {categories.map((category, index) => (
          <button
            key={category}
            className={`shadow-lg px-2 py-1 border rounded-full text-sm font-semibold ${
              index === currentIndex
                ? 'bg-blue-500 text-white border-gray-100 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-600'
                : 'bg-white dark:bg-blue-600 dark:text-white text-blue-500 border-blue-600'
            }`}
            onClick={() => onCategorySelect(index)}
          >
            {toCapitalized(category)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FeedbackCategories;
