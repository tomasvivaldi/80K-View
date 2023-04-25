import { useSession } from 'next-auth/react';
import { queries } from 'graphql/queries';
import { useQuery } from '@apollo/client';
import React from 'react';
import { InitialFormData } from './AnswerSection';


interface EndFormProps {
  categoryNames: string[];
  allCategoryFormData: InitialFormData;
}

const EndForm: React.FC<EndFormProps> = ({ categoryNames, allCategoryFormData }) => {
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
    <div className="rounded-md border-gray-200 bg-white px-4 py-5 w-full">
      <div className="text-2xl font-semibold text-gray-800 text-center w-full">10K View</div>
        <div className=' flex-col justify-center items-center'>
          <div  className='flex flex-row items-center justify-around my-4'>
            <span className='flex w-48 justify-center text-xl font-semibold'>category</span>
            <div className='flex w-48 justify-center text-xl font-semibold'>Last Month's score:</div>
            <div className='flex w-48 justify-center text-xl font-semibold'>This Month's score:</div>
          </div>
          {categoryNames.map((category) => {
          if (!category || !categoryQueries[category]) {
            return <p>Invalid category.</p>;
          }
          
          const { loading, data } = useQuery<Record<string, any>>(categoryQueries[category], {
            variables: { username: session?.user?.name },
          });
          
          const categoryData = data && data[`${toCamelCase(category)}ListByUserLatest`];

            const currentCategoryFormData = allCategoryFormData[category];

            console.log('categoryData',categoryData)
            console.log('categoryData[0]',categoryData[0])
            console.log('categoryData[0].score',categoryData[0].score)

            if (loading) {
              return (
                <div key={category}>
                  <h3>{category}</h3>
                  <p>Loading Data...</p>
                </div>
              );
            }

            return (
                <div className='flex flex-row justify-around'>  
                  <div key={category} className='flex w-48 my-2 justify-center items-center'>{toCapitalized(category)}</div>  
                  <div className='flex w-48 my-2 justify-center'>
                    <input
                    type="text"
                    id="score"
                    value={categoryData[0].score ? categoryData[0].score : '-'}
                    disabled
                    className="text-center w-12 h-12 text-2xl bg-blue-700 text-white rounded-full hide-arrows items-center"
                    />
                  </div>
                  <div className='flex w-48 my-2 justify-center '>
                    <input
                    type="text"
                    id="score"
                    value={currentCategoryFormData.score}
                    disabled
                    className="text-center w-12 h-12 text-2xl bg-blue-700 text-white rounded-full hide-arrows items-center"
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
