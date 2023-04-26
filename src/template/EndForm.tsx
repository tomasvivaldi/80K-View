import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import React from 'react';

import type { CategoryData, InitialFormData } from './AnswerSection';

interface EndFormProps {
  categoryNames: CategoryKey[];
  allCategoryFormData: InitialFormData;
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
}) => {
  const { data: session } = useSession();

  const categoryQueries = {
    career_work: queries.GET_CAREER_WORK_INFO_BY_USER_LATEST,
    community: queries.GET_COMMUNITY_INFO_BY_USER_LATEST,
    environment: queries.GET_ENVIRONMENT_INFO_BY_USER_LATEST,
    family_friends: queries.GET_FAMILY_FRIENDS_INFO_BY_USER_LATEST,
    fun_relaxation: queries.GET_FUN_RELAXATION_INFO_BY_USER_LATEST,
    growth_learning: queries.GET_GROWTH_LEARNING_INFO_BY_USER_LATEST,
    health_fitness: queries.GET_HEALTH_FITNESS_INFO_BY_USER_LATEST,
    money_finances: queries.GET_MONEY_FINANCES_INFO_BY_USER_LATEST,
    partner_love: queries.GET_PARTNER_LOVE_INFO_BY_USER_LATEST,
    spirituality: queries.GET_SPIRITUALITY_INFO_BY_USER_LATEST,
  };

  function toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );
  }

  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (group) =>
      group.toUpperCase().replace('-', ' ').replace('_', ' ')
    );
  }

  return (
    <div className="w-full rounded-md border-gray-200 bg-white px-4 py-5">
      <div className="w-full text-center text-2xl font-semibold text-gray-800">
        10K View
      </div>
      <div className=" flex-col items-center justify-center">
        <div className="my-4 flex flex-row items-center justify-around">
          <span className="flex w-48 justify-center text-xl font-semibold">
            category
          </span>
          <div className="flex w-48 justify-center text-xl font-semibold">
            Last Month's score:
          </div>
          <div className="flex w-48 justify-center text-xl font-semibold">
            This Month's score:
          </div>
        </div>
        {categoryNames.map((category) => {
          if (!category || !categoryQueries[category]) {
            return <p>Invalid category.</p>;
          }

          const { loading, data } = useQuery<Record<string, any>>(
            categoryQueries[category],
            {
              variables: { username: session?.user?.name },
            }
          );

          const categoryData =
            data && data[`${toCamelCase(category)}ListByUserLatest`];

          const currentCategoryFormData = allCategoryFormData[category];

          if (loading) {
            return (
              <div key={category}>
                <h3>{category}</h3>
                <p>Loading Data...</p>
              </div>
            );
          }

          return (
            <div className="flex flex-row justify-around">
              <div
                key={category}
                className="my-2 flex w-48 items-center justify-center"
              >
                {toCapitalized(category)}
              </div>
              <div className="my-2 flex w-48 justify-center">
                <input
                  type="text"
                  id="score"
                  value={categoryData[0].score ? categoryData[0].score : '-'}
                  disabled
                  className="hide-arrows h-12 w-12 items-center rounded-full bg-blue-700 text-center text-2xl text-white"
                />
              </div>
              <div className="my-2 flex w-48 justify-center ">
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
                  className="hide-arrows h-12 w-12 items-center rounded-full bg-blue-700 text-center text-2xl text-white"
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
