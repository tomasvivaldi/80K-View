import { useLazyQuery, useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';

import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Chart1 } from '@/template/Chart1';
import HistoricalTable from '@/template/HistoricalTable';
import { Shell } from '@/template/Shell';
import Welcome from '@/template/Welcome';
import { AppConfig } from '@/utils/AppConfig';
import { PleaseLogIn } from '@/template/PleaseLogIn';
import Banner from '@/template/Banner';
import { useEffect, useState } from 'react';

export type CategoryData = {
  score?: number | null;
  notes?: string;
  action_plan?: string;
};

export type InitialFormData = {
  [K in keyof MyFormData]: CategoryData;
};

export type MyFormData = {
  career_work: CategoryData;
  community: CategoryData;
  environment: CategoryData;
  family_friends: CategoryData;
  fun_relaxation: CategoryData;
  growth_learning: CategoryData;
  health_fitness: CategoryData;
  money_finances: CategoryData;
  partner_love: CategoryData;
  spirituality: CategoryData;
  [key: string]: CategoryData | undefined;
};

interface DataObject {
  date: string;
  value: number;
}

const Index = () => {
  // const [user_ref, setUserRef] = useState<number | null>(null);
  const { data: session } = useSession();
  const user_query = queries.GET_USER_BY_EMAIL
  console.log('user_query',user_query)
  
  const user_data_query = queries.GET_USER_DATA_BY_ID;
  
  
  // const categoryQueries = {
  //   career_work: queries.GET_CAREER_WORK_INFO_BY_USER_LATEST,
  //   community: queries.GET_COMMUNITY_INFO_BY_USER_LATEST,
  //   environment: queries.GET_ENVIRONMENT_INFO_BY_USER_LATEST,
  //   family_friends: queries.GET_FAMILY_FRIENDS_INFO_BY_USER_LATEST,
  //   fun_relaxation: queries.GET_FUN_RELAXATION_INFO_BY_USER_LATEST,
  //   growth_learning: queries.GET_GROWTH_LEARNING_INFO_BY_USER_LATEST,
  //   health_fitness: queries.GET_HEALTH_FITNESS_INFO_BY_USER_LATEST,
  //   money_finances: queries.GET_MONEY_FINANCES_INFO_BY_USER_LATEST,
  //   partner_love: queries.GET_PARTNER_LOVE_INFO_BY_USER_LATEST,
  //   spirituality: queries.GET_SPIRITUALITY_INFO_BY_USER_LATEST,
  // };

  // Check if data is available and not loading



  const [userRef, setUserRef] = useState<string | null>(null);

  const { loading, data } = useQuery<Record<string, any>>(user_query, {
    variables: { email: session?.user?.email },
  });
  
  useEffect(() => {
    if (!loading && data && data.userByEmail) {
      const userRef = data.userByEmail?.id;
      console.log('user_ref', userRef);
      setUserRef(userRef);
    }
  }, [loading, data]);
  
  const { loading: userDataLoading, data: userDataByIdData } = useQuery<UserDataByIdData>(user_data_query, {
    variables: { id: 14 },
    skip: !userRef,
  });
  if( !userRef){ console.log('!userRef')}
  
  const [formattedData, setFormattedData] = useState<DataObject[]>([]);

useEffect(() => {
  console.log('userDataLoading:', userDataLoading);
  console.log('userDataByIdData:', userDataByIdData);
  console.log('userDataByIdData.userDataById:', userDataByIdData?.userDataById);

  if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {
    console.log('userDataByIdData is defined');
    console.log('userDataByIdData.userDataById is defined');
    
    let tempData: DataObject[] = []; // use a temporary array

    userDataByIdData.userDataById.overall_score.forEach((userData: any) => {
      console.log('userDataAAAAAAAAA', userData)
      const score = userData.overall_score;
      const date = userData.created_at;
      console.log('score',score)
      console.log('date',date)

      // Push the score and date parameters in the desired format to tempData
      if (score !== undefined && date) {
        tempData.push({ date, value: score });
      }
    });

    setFormattedData(tempData); // update state with tempData
  }

}, [userDataLoading, userDataByIdData, userRef]);

  
  // useEffect(() => {
  //   if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {
  //     // Access the score and date parameters from the data
  //     const test0 = userDataByIdData;
  //     const test1 = userDataByIdData?.userDataById;
  //     const test2 = userDataByIdData?.userDataById?.email;
  //     console.log('TEST DATA FETCH0', test0);
  //     console.log('TEST DATA FETCH1', test1);
  //     console.log('TEST DATA FETCH2', test2);
  //   }
  // }, [userDataLoading, userDataByIdData]);











  
  // const { loading, data } = useQuery<Record<string, any>>(user_query, {
  //   variables: { email: session?.user?.email },
  // });

  // useEffect(() => {
  //   if (!loading && data && data.userByEmail) {
  //     const userRef = data.userByEmail?.id;
  //     console.log('user_ref', userRef);
  //     console.log('data.userByEmail', data.userByEmail);
  //     setUserRef(userRef);
  //   }
  // }, [loading, data]);

  

  
  // const {
  //   loading: userDataLoading,
  //   data: userDataByIdData,
  // } = useQuery<UserDataByIdData>(user_data_query, {
  //   variables: { id: user_ref },
  //   skip: !user_ref,
  // });
  
  // useEffect(() => {
  //   if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {
  //     // Access the score and date parameters from the data
  //     const test0 = userDataByIdData;
  //     const test1 = userDataByIdData?.userDataById;
  //     const test2 = userDataByIdData?.userDataById?.email;
  //     console.log('TEST DATA FETCH0', test0);
  //     console.log('TEST DATA FETCH1', test1);
  //     console.log('TEST DATA FETCH2', test2);
  //   }
  // }, [user_ref, userDataLoading, userDataByIdData]);

    // userDataByIdData.userDataById.forEach((userData: any) => {
    //   console.log('userData',userData)
    //   const score = userData.overall_score;
    //   const date = userData.created_at;

    //   // Push the score and date parameters in the desired format to formattedData
    //   formattedData.push({ date, value: score });
    // });
   


  // // Check if data is available and not loading
  // if (!loading && data && data.overallScoreListByUser) {
  //   // Access the score and date parameters from the data
  //   data.overallScoreListByUser.forEach((scoreInfo: any) => {
  //     const score = scoreInfo.overall_score;
  //     const date = scoreInfo.created_at;

  //     // Push the score and date parameters in the desired format to formattedData
  //     formattedData.push({ date, value: score });
  //   });
  // } 

  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="80K View">
        
        {session ? (
          <>
          <Section>
            <Welcome />
          </Section>
          <Section>
            <div className=' flex flex-row'>
            <Banner />
            <div className=' text-white bg-black  p-8 w-[450px] border-4 border-red-500 mx-4' >
              <p> BLALBMASLUFGHASNGAILJNg</p>
            </div>
            </div>
          </Section>
            <Section>
              <div className="flex flex-col">
                <div className="order-2 sm:order-1">
                  <HistoricalTable data={formattedData} />
                </div>
                <div className=" order-1 w-full sm:order-2">
                  <Chart1 data={formattedData} />
                </div>
                {/* <Charts /> */}
              </div>
            </Section>
            {/* <Section>
        <Stats />
      </Section> */}
          </>
        ) : (
          <>
            <PleaseLogIn />
          </>
        )}
      </Shell>
    </>
  );
};

export default Index;
