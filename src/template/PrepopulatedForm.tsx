import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import React from 'react';

import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';

interface PrepopulatedFormProps {
  category: string;
}

const PrepopulatedForm: React.FC<PrepopulatedFormProps> = ({ category }) => {
  const { data: session } = useSession();

  // Map the category to the corresponding query
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

type CategoryName = keyof typeof categoryQueries;

function isValidCategoryName(name: string): name is CategoryName {
  return categoryQueries.hasOwnProperty(name);
}
  
  function toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', '')
    );
  }

  if (!category || !isValidCategoryName(category)) {
    return <p>Invalid category.</p>;
  }

  const { loading, data } = useQuery<Record<string, any>>(
    categoryQueries[category],
    {
      variables: { username: session?.user?.name },
    }
  );

  const categoryData = data && data[`${toCamelCase(category)}ListByUserLatest`];

  if (loading) {
    return (
      <div className="w-full rounded-md border-gray-200 bg-gray-300 px-4 py-5">
        <div className="w-full text-center text-2xl font-semibold text-gray-800/80">
          <p className="text center m-auto h-full w-fit">Loading Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-md border-gray-200 bg-white px-4 py-5">
      <div className="w-full text-center text-2xl font-semibold text-gray-800">
        Last Month
      </div>
      <form className="flex flex-col gap-0 lg:gap-8">
        <div className="flex flex-col justify-around gap-0 lg:flex-row lg:gap-8">
          <div className="flex flex-col items-center gap-2 lg:gap-8">
            <Label
              htmlFor="comment"
              colSpanSize="lg:col-start-1 lg:col-span-2 lg:row-start-1"
            >
              Score:
            </Label>
            <input
              type="text"
              id="score"
              value={categoryData[0] && categoryData[0]?.score}
              disabled
              className="hide-arrows h-24 w-24 rounded-full border-blue-700 border-4 bg-blue-400/20 text-black text-center text-5xl lg:row-start-2"
            />
          </div>
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            <Label
              htmlFor="comment"
              colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-1"
            >
              Notes:
            </Label>
            <FormElement colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-2">
              <textarea
                id="textarea"
                value={categoryData[0] && categoryData[0]?.notes}
                disabled
                rows={5}
              />
            </FormElement>
          </div>
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            <Label
              htmlFor="comment"
              colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-1"
            >
              Action Plan:
            </Label>
            <FormElement colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-2">
              <textarea
                id="textarea"
                value={categoryData[0] && categoryData[0]?.action_plan}
                disabled
                rows={5}
              />
            </FormElement>
          </div>
        </div>
      </form>
    </div>
  );
};

export { PrepopulatedForm };
