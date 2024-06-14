import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { PleaseLogIn } from '@/template/PleaseLogIn';
import { PleaseSubscribe } from '@/template/PleaseSubscribe';
import { Shell } from '@/template/Shell';
import YearMap from '@/template/YearMap';
import { AppConfig } from '@/utils/AppConfig';
import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

type DataItem = {
  date: string;
  category: string;
  ytdTrend: number;
  score: number;
  notes: string;
  actionPlan: string;
};

type GroupedData = {
  [key: string]: { [key: string]: any }[] | undefined;
};

interface YTDDataObject {
  date: string;
  value: number;
}


const View80k = () => {
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

  // const [formattedData, setFormattedData] = useState<DataObject[]>([]);
  // useEffect(() => {
  //   if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {      
  //     let tempData: DataObject[] = []; // use a temporary array
  //     userDataByIdData.userDataById.overall_score.forEach((userData: any) => {
  //       console.log('userDataAAAAAAAAA', userData)
  //       const score = userData.overall_score;
  //       const date = userData.recorded_at;
  //       console.log('score',score)
  //       console.log('date',date)

  //       // Push the score and date parameters in the desired format to tempData
  //       if (score !== undefined && date) {
  //         tempData.push({ date, value: score });
  //       }
  //     });
  //     setFormattedData(tempData); // update state with tempData
  //   }
  // }, [userDataLoading, userDataByIdData, userRef]);



  const [rawData, setrawData] = useState<UserDataById>();
  console.log('rawData',rawData)
  useEffect(() => {
    if (!userDataLoading && userDataByIdData && userDataByIdData.userDataById) {
      // Directly assign the fetched data to rawData state
      setrawData(userDataByIdData.userDataById);
    }
  }, [userDataLoading, userDataByIdData, userRef]);



  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  type CategoryKeys = 'career_work' | 'community' | 'environment' | 'family_friends' | 'fun_relaxation' | 'growth_learning' | 'health_fitness' | 'money_finances' | 'partner_love' | 'spirituality';

  const category: CategoryKeys[]  = [
    'career_work',
    'community',
    'environment',
    'family_friends',
    'fun_relaxation',
    'growth_learning',
    'health_fitness',
    'money_finances',
    'partner_love',
    'spirituality',
  ];

// function isValidCategoryName(name: string): name is CategoryName {
//   return categoryQueries.hasOwnProperty(name);
// }
  
  // function toCamelCase(str: string): string {
  //   return str.replace(/([-_][a-z])/g, (group) =>
  //     group.toUpperCase().replace('-', '').replace('_', '')
  //   );
  // }

  // const bgColorClass = (value: number): string => {
  //   if (value < 34) return 'border-red-500';
  //   if (value < 67) return 'border-yellow-500';
  //   return 'border-green-500';
  // };
  
  const groupBy = (
    array: any[],
    keyFn: { (item: any): string; (arg0: any): any }
  ) => {
    return array.reduce((acc, item) => {
      const key = keyFn(item);
      console.log("keyFn(item):", key); // Add this console.log
      acc[key] = acc[key] || [];
      acc[key].push(item);
      return acc;
    }, {});
  };
  
  const tableData: DataItem[] = [];
  const ytdData: YTDDataObject[] = [];
  
  category.forEach((category) => {
    if (!category) {
      console.log('!category IF');
      return <p>Invalid category.</p>;
    }
  
    const categoryData = rawData && rawData[category];
    console.log('categoryData:', categoryData);

    if (categoryData) {
      const sortedData = categoryData.slice().sort((a: { recorded_at: string; }, b: { recorded_at: string; }) => {
        return new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime(); // Change this line
      });      

      const groupedData: GroupedData = groupBy(sortedData, (item) => {
        const date = new Date(item.recorded_at); // Change this line
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Adjust to one-based month
        return `${year}-${month}`;
      });
    
      console.log('sortedData', sortedData);
      console.log('groupedData', groupedData);
      console.log('category:', category);

      months.forEach((_month, monthIndex: number) => {
        // Get the year-month key for the current month (adjust to one-based month)
        const currentYearMonth = `2023-${monthIndex + 1}`;
      
        const mostRecentIndex = groupedData?.[currentYearMonth]?.length ? groupedData[currentYearMonth]!.length - 1 : undefined;
        const mostRecentData = groupedData?.[currentYearMonth]?.length && mostRecentIndex !== undefined ? groupedData[currentYearMonth]![mostRecentIndex] : undefined;
              
        const score = mostRecentData ? mostRecentData.score : '-';
      
        const notes = mostRecentData?.notes ?? '-';
        const actionPlan = mostRecentData?.action_plan ?? '-'; // Note the change from actionPlan to action_plan
      
        tableData.push({
          date: new Date(2023, monthIndex, 1).toISOString(),
          category: category,
          ytdTrend: Math.floor(Math.random() * 21) - 10, // Random YTD trend between -10 and 10
          score: score,
          notes: notes,
          actionPlan: actionPlan,
        });        
      });
      console.log('tableData:', tableData);
    }

    // Check if data is available and not loading
  
      // Access the score and date parameters from the data
      categoryData?.forEach((categoryData: any) => {
        const score = categoryData;
        const date = categoryData.recorded_at;
  
        // Push the score and date parameters in the desired format to ytdData
        ytdData.push({ date, value: score });
      });
    return
  });  
  
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="80K View">
        {session ? (
          userDataByIdData?.userDataById && userDataByIdData?.userDataById?.isActive ? (
            <>
              {/* Table for large screens */}
              <div className='max-w-[95%] mx-auto'>
                <YearMap data={userDataByIdData?.userDataById}/>
              </div>
            {/* Table for small screens */}
              {/* <div className="md:hidden">
                {months.map((month, monthIndex) => (
                  <div key={monthIndex} className="mb-4 text-black">
                    <h2 className="my-4 mx-auto w-fit text-xl font-bold">{month}</h2>
                    {category.map((category) => {
                      const item = tableData.find(
                        (d) =>
                          d.category === category &&
                          new Date(d.date).getFullYear() === 2023 &&
                          new Date(d.date).getMonth() === monthIndex
                      );
                      return (
                        <div
                          key={category}
                          className="mb-2 text-black border-b border-gray-300"
                        >
                          <h3 className="my-2 mx-auto w-fit text-lg font-semibold">
                            {category}
                          </h3>
                          <div className="mx-auto mb-2 flex flex-col w-fit items-center justify-around gap-4 rounded-lg bg-slate-300/20 p-2 sm:px-4 sm:text-lg">
                            <div className="w-full flex justify-between">
                              <span className="text-center">Score:</span>
                              <span className="text-center">{item?.score || ''}</span>
                            </div>
                            <div className="w-full flex justify-between">
                              <span className="text-center">Notes:</span>
                              <span className="text-center">{item?.notes || ''}</span>
                            </div>
                            <div className="w-full flex justify-between">
                              <span className="text-center">Action Plan:</span>
                              <span className="text-center">{item?.actionPlan || ''}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div> */}
              <div className="sm:hidden w-[90%] mx-auto rounded-md border-gray-200 bg-white dark:bg-slate-900 px-4 py-5">
                  <div className="w-full text-center text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Please be patient... Under construction for smaller screens
                  </div>
                </div>
            </>
          ) : (
            <PleaseSubscribe />
          )
        ) : (
          <>
            <Section>
              <PleaseLogIn />
            </Section>
          </>
        )}
      </Shell>
    </>
  );
};

export default View80k;

