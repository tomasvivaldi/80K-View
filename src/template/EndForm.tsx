import React from 'react';
import type { CategoryData, InitialFormData } from './AnswerSection';

interface EndFormProps {
  categoryNames: CategoryKey[];
  allCategoryFormData: InitialFormData;
  data?: UserDataById;
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
  data
}) => {

  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (group) =>
      group.toUpperCase().replace('-', ' ').replace('_', ' / ')
    );
  }

  return (
    <div className="w-full rounded-md border-gray-200 bg-white p-4">
      <div className="w-full text-center text-2xl font-semibold text-gray-800">
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
      </div>
    </div>
  );
};

export default EndForm;
