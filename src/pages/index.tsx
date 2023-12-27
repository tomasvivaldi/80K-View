import { useSession } from 'next-auth/react';
import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import HistoricalTable from '@/template/HistoricalTable';
import { Shell } from '@/template/Shell';
import Welcome from '@/template/Welcome';
import { AppConfig } from '@/utils/AppConfig';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import LoadingBox from '@/template/LoadingBox';

import Copyright from '@/template/Copyright';
import Feedback from '@/template/Feedback';
import FillFormBanner from '@/template/FillFormBanner';
import NoSubscriptionBanner from '@/template/NoSubscriptionBanner';
import LandingPage from '../template/LandingPage';
import seedrandom from 'seedrandom';
import MockFeedback from '@/template/MockFeedback';
import Image from 'next/image';
// import VideoBanner from '@/template/VideoBanner';
// import FeedbackBanner from './FeedbackBanner';

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

interface HistoricalDataItem {
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
        const date = userData.recorded_at;
        console.log('***score',score)
        console.log('***date',date)

        // Push the score and date parameters in the desired format to tempData
        if (score !== undefined && date) {
          tempData.push({ date, value: score });
        }
      });
      setFormattedData(tempData); // update state with tempData
    }
  }, [userDataLoading, userDataByIdData, userRef]);

console.log("***formattedData",formattedData)

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
  
  
function generateMockData(entries: number): HistoricalDataItem[] {
  const seed = '22'; // Use a fixed seed
  const random = seedrandom(seed); // Create a seeded RNG
  const mockData: HistoricalDataItem[] = [];

  for (let i = 0; i < entries; i++) {
    const currentDate = new Date(); // Create a new date object for each iteration
    currentDate.setMonth(currentDate.getMonth() + i); // Increment the month by i + 1 for future months
    const date = currentDate.toISOString().split('T')[0];
    if (typeof date === 'string') {
      const value = parseFloat(((random() * 7) + 3).toFixed(1)); // Use the seeded RNG and format to one decimal place
      mockData.push({ date, value });
    }
  }

  return mockData.reverse();
}

  
  
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="80K View">
        {session ? (
          <div className='relative z-0 h-fit'>
            <div className="absolute inset-0 -z-10 h-fit ">
            {userDataByIdData?.userDataById && (
            <>
              <Image
                src="/backgrounds/9.jpg"
                alt='bg image'
                fill
                quality={1}
                className="blur-[10px] opacity-40 hidden dark:block"
              />
              <Image
                src="/backgrounds/7.jpg"
                alt='bg image'
                fill
                quality={1}

                className="blur-[10px] opacity-100 dark:hidden"
              />
            </>  )}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-white/40 dark:from-black dark:via-black/40 dark:to-black/70 "></div>
            <div className="relative z-10">
              <Section>
                <Welcome data={rawData}/>
              </Section>
              <Section>  
                {/* <div className='flex md:flex-row flex-col gap-4'>
                  <VideoBanner />
                  <FeedbackBanner />
                </div> */}
                {loading || userDataLoading ? (<></>):(
                  <>
                    {userDataByIdData?.userDataById && userDataByIdData?.userDataById?.isActive ? 
                      
                      lastEntry?.recorded_at && isThisMonth(lastEntry.recorded_at) ? (<></>) : (<FillFormBanner />)
                      
                    : (
                      <NoSubscriptionBanner />
                    )}
                  </>
                )}
              </Section>
                <Section>
                  <div className="flex flex-col">
                    
                    
                    {loading || userDataLoading ? (
                      <div className=' flex flex-row gap-8 min-h-screen'>
                        <LoadingBox spinnerClassName='mx-24' containerClassName='mx-auto' />
                        {/* <LoadingBox spinnerClassName='mx-64 hidden md:block' containerClassName='hidden md:block' /> */}
                      </div>
                    ) : (
                      <>
                        <div className=" order-1 w-full md:order-2">
                          {rawData && userRef && rawData.career_work.length>0 ? (
                            <>
                              <div className="order-3 md:order-1">
                                <HistoricalTable data={formattedData} />
                              </div>
                              <div className='mt-4'/>
                              <Feedback data={rawData}/>
                            </> 
                          ) : (
                            <>
                              <h3 className='text-3xl text-black font-semibold'> 
                                Here is a little preview:
                              </h3>
                              <div className="p-8 bg-gradient-to-r from-sky-200/20 to-cyan-100/20 rounded-lg shadow-xl border-cyan-500 border-2" >
                                <p className='text-xl font-medium text-slate-900 dark:text-slate-100 mb-6'>
                                  Here's what you'll see after updating your Life Tracker for the first time. 
                                  You'll be able to view your historical data and receive personalized feedback to guide your journey.
                                </p>  
                                <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md mb-4 border border-sky-300">
                                  <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100  mb-2">Historical Data:</h4>
                                  <HistoricalTable data={generateMockData(1)} />
                                </div>
                                <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md border border-sky-300">
                                  <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">Your Feedback:</h4>
                                  <MockFeedback />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        {/* <div className=" order-2 w-full md:order-3 mt-4">
                          {formattedData && formattedData.length >= 2 ? (
                            <Chart1 data={formattedData} />
                            ) : (
                              <>
                                <h3 className='text-3xl text-black font-semibold mt-8'> 
                                  Keep it up for more!
                                </h3>
                                <div className="p-8 bg-gradient-to-r from-sky-200/20 to-cyan-100/20 rounded-lg shadow-xl border-cyan-500 border-2" >
                                <p className='text-xl font-medium text-slate-900 mb-6'>
                                  And that's just the beginning! As you continue to track and engage with your Life Tracker, 
                                  you'll unlock even more features and insights tailored to your unique goals and experiences. 
                                  Stay engaged, and watch how the Life Tracker becomes an essential companion in your personal growth journey.
                                </p>
                                  <div className="bg-white p-4 rounded-lg shadow-md mb-4 border border-sky-300">
                                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Score Graph:</h4>
                                    <Chart1 data={generateMockData(3)} />
                                  </div>
                                  <div className="bg-white p-4 rounded-lg shadow-md border border-sky-300">
                                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Your Analytics:</h4>
                                    <MockStats />
                                  </div>
                                </div>
                              </>
                            )
                          }
                        </div> */}
                      </>
                    )}
                    
                    {/* <Charts /> */}
                  </div>
                </Section>
                {/* <Section>
                {rawData && rawData.career_work.length >= 2 && (
                  <Stats data={rawData}/>
                  )}
                </Section> */}
                <Section>
                  <Copyright company={'80K View'} />
                </Section>
            </div>
          </div>
          </div>
        ) : (
            <LandingPage />
        )}
      </Shell>
    </>
  );
};

export default Index;
