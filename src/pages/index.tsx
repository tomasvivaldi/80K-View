import { useSession } from 'next-auth/react';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Chart1 } from '@/template/Chart1';
import HistoricalTable from '@/template/HistoricalTable';
import { Shell } from '@/template/Shell';
import Welcome from '@/template/Welcome';
import { AppConfig } from '@/utils/AppConfig';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import LoadingBox from '@/template/LoadingBox';
import { Stats } from '@/template/Stats';
import Copyright from '@/template/Copyright';
import Feedback from '@/template/Feedback';
import FillFormBanner from '@/template/FillFormBanner';
import NoSubscriptionBanner from '@/template/NoSubscriptionBanner';
import LandingPage from '../template/LandingPage';


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
  const { data: session } = useSession();
  const user_query = queries.GET_USER_BY_EMAIL
  const user_data_query = queries.GET_USER_DATA_BY_ID;
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
    skip: userRef === null, 
    variables: { id: userRef },
  });

  if(!userRef){console.log('!userRef',userRef)}

  const [formattedData, setFormattedData] = useState<DataObject[]>([]);
  useEffect(() => {
    if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {      
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



  const [rawData, setrawData] = useState<UserDataById>();
  console.log('rawData',rawData)
  useEffect(() => {
    if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {
      // Directly assign the fetched data to rawData state
      setrawData(userDataByIdData.userDataById);
    }
  }, [userDataLoading, userDataByIdData, userRef]);



  const career_work = userDataByIdData?.userDataById?.career_work;
  const lastEntry = career_work && career_work[0];

  function isThisMonth(dateStr: string) {
    if (!dateStr) {
      return false;
    }
  
    const date = new Date(dateStr);
    const now = new Date();
    return date.getUTCMonth() === now.getUTCMonth() && date.getUTCFullYear() === now.getUTCFullYear();
  }  
  
  

  
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="80K View">
        {session ? (
          <>
          <Section>
            <Welcome data={rawData}/>
          </Section>
          <Section>
            
          {loading || userDataLoading ? (<></>):(
            <>
              {userDataByIdData?.userDataById && userDataByIdData?.userDataById?.isActive ? 
                
                lastEntry?.created_at && isThisMonth(lastEntry.created_at) ? (<></>) : (<FillFormBanner />)
                
               : (
                <NoSubscriptionBanner />
              )}
            </>
          )}
            
          </Section>
            <Section>
              <div className="flex flex-col">
                <div className="order-3 md:order-1">
                <HistoricalTable data={formattedData} />
                </div>
                <div className=" order-1 w-full md:order-2">
                {loading || userDataLoading ? (
              <div className=' flex flex-row gap-8'>
                <LoadingBox spinnerClassName='mx-24' containerClassName='mx-auto' />
                <LoadingBox spinnerClassName='mx-64 hidden md:block' containerClassName='hidden md:block' />
              </div>
              ) : (
                
                rawData && userRef && rawData.career_work_feedback.length>0 &&
                <>
                  <div className='mt-4'/>
                  <Feedback data={rawData}/>
                </>
            )}
                </div>
                <div className=" order-2 w-full md:order-3 mt-4">
                {formattedData && formattedData.length >= 2 && (
                  <Chart1 data={formattedData} />
          )}
                </div>
                {/* <Charts /> */}
              </div>
            </Section>
            <Section>
            {rawData && rawData.career_work.length >= 2 && (
              <Stats data={rawData}/>
              )}
            </Section>
            <Section>
              <Copyright company={'80K View'} />
            </Section>
          </>
        ) : (
            <LandingPage />
        )}
      </Shell>
    </>
  );
};

export default Index;
