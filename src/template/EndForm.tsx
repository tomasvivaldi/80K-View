import React from 'react';
import type { CategoryData, InitialFormData } from './AnswerSection';
import { Button } from '@/button/Button';

interface EndFormProps {
  categoryNames: CategoryKey[];
  allCategoryFormData: InitialFormData;
  data?: UserDataById;
  submitAllCategories: () => Promise<void>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}


function isCategoryData(obj: any): obj is CategoryData {
  return (
    obj.hasOwnProperty('score') &&
    obj.hasOwnProperty('notes') &&
    obj.hasOwnProperty('action_plan')
  );
}

const EndForm: React.FC<EndFormProps> = ({
  categoryNames,
  allCategoryFormData,
  data,
  submitAllCategories,
  setPage,
  page,
}) => {

  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (group) =>
      group.toUpperCase().replace('-', ' ').replace('_', ' / ')
    );
  }

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
        <div className="flex flex-row items-center justify-around">
          <span className="flex w-48 justify-center text-xl font-semibold">
            Category
          </span>
          <div className="flex w-48 justify-center text-xl font-semibold">
            Last Month's score:
          </div>
          <div className="flex w-48 justify-center text-xl font-semibold">
            This Month's score:
          </div>
        </div>
        {categoryNames.map((category) => {
          const categoryData =
            data && data[`${category}` as CategoryKey];
          const currentCategoryFormData = allCategoryFormData[category];

          return (
            <div className="flex flex-row justify-around">
              <div
                key={category}
                className="my-1 flex w-48 items-center justify-center"
              >
                {toCapitalized(category)}
              </div>
              <div className="my-1 flex w-48 justify-center">
                <input
                  type="text"
                  id="score"  
                  value={categoryData && categoryData.length > 0 && categoryData?.[0]?.score ? categoryData[0].score : '-'}

                  disabled
                  className="hide-arrows h-10 w-11 items-center rounded-full bg-blue-700 text-center text-lg text-white"
                />
              </div>
              <div className="my-1 flex w-48 justify-center ">
                <input
                  type="text"
                  id="score"
                  value={
                    isCategoryData(currentCategoryFormData)
                      ? currentCategoryFormData.score !== null
                        ? currentCategoryFormData.score
                        : ''
                      : ''
                  }
                  disabled
                  className="hide-arrows h-10 w-11 items-center rounded-full bg-blue-700 text-center text-lg text-white"
                />
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
