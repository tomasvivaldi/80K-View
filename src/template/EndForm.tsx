import React from 'react';
import type { InitialFormData } from './AnswerSection';
import { Button } from '@/button/Button';

interface EndFormProps {
  categoryNames: CategoryKey[];
  allCategoryFormData: InitialFormData;
  data?: UserDataById;
  submitAllCategories: () => Promise<void>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  selectedDate: Date
}


// function isCategoryData(obj: any): obj is CategoryData {
//   return (
//     obj.hasOwnProperty('score') &&
//     obj.hasOwnProperty('notes') &&
//     obj.hasOwnProperty('action_plan')
//   );
// }

const EndForm: React.FC<EndFormProps> = ({
  categoryNames,
  allCategoryFormData,
  data,
  submitAllCategories,
  setPage,
  page,
  selectedDate,
}) => {


  const lastEntry = data?.career_work[0]?.recorded_at || ' - '

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = monthNames[selectedDate.getMonth()]; 
  
  const lastEntryDate = new Date(lastEntry);
  const lastEntryMonthIndex = lastEntryDate.getMonth();
  const lastEntryMonthName = monthNames[lastEntryMonthIndex];

  console.log(lastEntryMonthName);

  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (group) =>
      group.toUpperCase().replace('-', ' ').replace('_', ' / ')
    );
  }




  // Function to return color based on score
  const getColor = (score: number) => {
    const colors = [
      'bg-gradient-to-r from-red-500 to-red-400', // Score 1
      'bg-gradient-to-r from-red-400 to-orange-500', // Score 2
      'bg-gradient-to-r from-orange-500 to-orange-400', // Score 3
      'bg-gradient-to-r from-orange-400 to-amber-500', // Score 4
      'bg-gradient-to-r from-amber-500 to-amber-400', // Score 5
      'bg-gradient-to-r from-amber-400 to-lime-500', // Score 6
      'bg-gradient-to-r from-lime-500 to-lime-400', // Score 7
      'bg-gradient-to-r from-lime-400 to-green-500', // Score 8
      'bg-gradient-to-r from-green-500 to-green-400', // Score 9
      'bg-gradient-to-r from-green-500 to-teal-400', // Score 10
    ];
    
    
    return colors[score - 1]; // Score is 1-indexed, array is 0-indexed
  };

  const buttonClass = (score: number, categoryData: any) => {
    // Base class for all buttons
    const baseClass = ' rounded-full text-center font-medium';
  
    // Determine if the current button is selected
    const isSelected = score === categoryData && categoryData.length > 0 && categoryData?.[0]?.score ? categoryData[0].score : '-';
  
    // Define if any score is selected
    const isScoreSelected = categoryData && categoryData.length > 0 && categoryData?.[0]?.score ? categoryData[0].score : '-' !== null;
  
    // Define the selected class
    const selectedClass = isSelected ? `text-white` : `dark:text-white`;
  
    // Define the visibility class
    const visibilityClass = isScoreSelected && !isSelected 
      ? 'text-black border border-black dark:border-white font-light dark:font-medium' 
      : `text-white ${getColor(score)}`;
  
    // Combine the base class, visibility class, and selected class
    return `${baseClass} ${visibilityClass} ${selectedClass} transition-opacity duration-500 ease-in-out`;
  };
  


  return (
    <div className="w-full rounded-md border-gray-200 bg-white p-4
    dark:bg-slate-900/40 dark:shadow-slate-200/5">
<button
  className={`flex items-center text-gray-700 dark:text-slate-400 
             transition-transform duration-150 ease-in-out 
             hover:text-gray-900 active:scale-95 
             disabled:text-gray-400 disabled:cursor-not-allowed text-lg`}
  disabled={page === 0}
  onClick={() => {
    setPage((currPage) => currPage - 1);
  }}
>
  <svg className="w-4 h-4 mr-2 fill-current transform -rotate-180" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
    <path d="M6 15l5-5-5-5" />
  </svg>
  Back
</button>

      <div className="w-full text-center text-2xl font-semibold text-gray-800 dark:text-slate-200">
        10K View
      </div>
      <div className=" flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-around my-4">
          <span className="flex w-48 justify-center text-xl font-semibold">
            Category
          </span>
          <div className="flex w-48 justify-center text-xl font-semibold">
            <span>{lastEntryMonthName}</span>'s score:
          </div>
          <div className="flex w-48 justify-center text-xl font-semibold">
          <span>{currentMonth}</span>'s score:
          </div>
        </div>
        {categoryNames.map((category) => {
          const categoryData =
            data && data[`${category}` as CategoryKey];
          const currentCategoryFormData = allCategoryFormData[category];

          const oldScore = categoryData && categoryData.length > 0 && categoryData?.[0]?.score ? categoryData[0].score : 0
          const newScore = currentCategoryFormData?.score !== null && currentCategoryFormData?.score !== undefined
                ? currentCategoryFormData.score
                : 0;
          return (
            <div className="flex flex-row justify-around">
              <div
                key={category}
                className="my-2 flex w-48  items-center justify-center"
              >
                {toCapitalized(category)}
              </div>
              <div className="my-2 flex w-48 justify-center">
                <div
                  id="score"  
                  className={`pt-1 h-11 w-11  text-white rounded-full text-center font-medium text-2xl ${buttonClass(oldScore, categoryData)} `}
                >{oldScore}</div>
              </div>
              <div className="my-2 flex w-48 justify-center ">
                <div
                  id="score"
                  className={`pt-1 h-11 w-11 text-white rounded-full text-center font-medium text-2xl ${buttonClass(newScore, categoryData)} `}
                >{newScore}</div>
              </div>
            </div>
          );
        })}

        <button
          className=' w-full mx-auto my-8'
          
          onClick={async () => {
              await submitAllCategories();
              setTimeout(() => {
                setPage((currPage) => currPage + 1);
              }, 1000);
          }}
        >
          <Button>
            Submit
          </Button>
        </button>

      </div>
    </div>
  );
};

export default EndForm;
