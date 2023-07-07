import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { PleaseLogIn } from '@/template/PleaseLogIn';
import { Shell } from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';
import { useQuery } from '@apollo/client';
import { queries } from 'graphql/queries';
import { useSession } from 'next-auth/react';

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

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const category = [
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


  // Map the category to the corresponding query
  const categoryQueries = {
    career_work: queries.GET_CAREER_WORK_INFO_BY_USER,
    community: queries.GET_COMMUNITY_INFO_BY_USER,
    environment: queries.GET_ENVIRONMENT_INFO_BY_USER,
    family_friends: queries.GET_FAMILY_FRIENDS_INFO_BY_USER,
    fun_relaxation: queries.GET_FUN_RELAXATION_INFO_BY_USER,
    growth_learning: queries.GET_GROWTH_LEARNING_INFO_BY_USER,
    health_fitness: queries.GET_HEALTH_FITNESS_INFO_BY_USER,
    money_finances: queries.GET_MONEY_FINANCES_INFO_BY_USER,
    partner_love: queries.GET_PARTNER_LOVE_INFO_BY_USER,
    spirituality: queries.GET_SPIRITUALITY_INFO_BY_USER,
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
    if (!category || !isValidCategoryName(category)) {
      console.log('!category IF');
      return <p>Invalid category.</p>;
    }
    console.log('OUTSIDE IF');
    const { data } = useQuery<Record<string, any>>(categoryQueries[category], {
      variables: { username: session?.user?.name }, // MAYBE DOEST WORK WITH LOCAL PROVIDER (CREDENTIALS) USERS
    });
  
    const categoryData = data && data[`${toCamelCase(category)}ListByUser`];
    console.log('categoryData:', categoryData);

    if (categoryData) {
      const sortedData = categoryData.slice().sort((a: { created_at: Date; }, b: { created_at: Date; }) => {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime(); // Change this line
      });      

      const groupedData: GroupedData = groupBy(sortedData, (item) => {
        const date = new Date(item.created_at); // Change this line
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
        const date = categoryData.created_at;
  
        // Push the score and date parameters in the desired format to ytdData
        ytdData.push({ date, value: score });
      });
    return
  });
  
  const formatCategory = (category: string) => {
    if (!category) {
      return "";
    }
    
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' / ');
  }
  
  
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="80K View">
        {session ? (
          <>
            {/* Table for large screens */}
            <div className="hidden text-black sm:block m-2 rounded-lg border-4 border-gray-800">
              <div className="overflow-x-auto overflow-y-scroll h-[640px] rounded">
                <table className="w-full table-auto relative ">
                  <thead className=' bg-blue-800 text-white sticky top-0 z-20 '>
                    <tr>
                      <div className='sticky left-0 border-r border-b border-gray-200 bg-blue-800 h-16 rounded'><th className=" px-4 py-5 text-center text-sm ">Category</th></div>
                      {/* <th className=" px-4 py-2 text-center text-sm border-r border-gray-200">YTD Trend</th> */}
                      {months.map((month, monthIndex) => (
                        <th key={monthIndex} className=" mx-4 my-2 text-center text-sm border-l border-gray-200">
                          {month}
                          <div className="flex flex-row w-fit pt-1 mt-1 border-t border-gray-200 text-white">
                            <div className='w-16 justify-center border-r border-gray-200'>Score</div>
                            <div className='w-32 justify-center border-r border-gray-200'>Notes</div>
                            <div className='w-32 justify-center'>Action Plan</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {category.map((category, _categoryIndex) => (
                      <tr key={category} className="">
                        <td className="h-64 p-2 text-center text-gray-200 border-r border-b border-gray-500 sticky left-0 bg-blue-800">{formatCategory(category)}</td>
                        {/* <td className="p-2 text-center border-b border-gray-500">
                          <Chart1 data={ytdData} />
                        </td> */}

                        {months.map((_month, monthIndex) => {
                          const item = tableData.find(
                            (item) =>
                              item.category === category &&
                              new Date(item.date).getFullYear() === 2023 &&
                              new Date(item.date).getMonth() === monthIndex
                          );
                          
                          console.log('item',item)
                          return (
                            <td key={monthIndex} className="text-center border-l border-t border-b border-gray-500">
                              {item && (
                                <table className="w-full">
                                  <tbody>
                                    <td className="w-16 border-r border-gray-400  h-64 -my-1">{item.score}</td>
                                    <td className="w-32 border-r border-gray-400  h-64 -my-1">{item.notes}</td>
                                    <td className="w-32 border-gray-400  h-64 -my-1">{item.actionPlan}</td>
                                  </tbody>
                                </table>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            <div className="sm:hidden w-full rounded-md border-gray-200 bg-white px-4 py-5">
                <div className="w-full text-center text-2xl font-semibold text-gray-800">
                Please be patient... Under construction for smaller screens
                </div>
              </div>
          </>
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

