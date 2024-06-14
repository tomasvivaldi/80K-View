import React, { useState } from 'react';
import { Chart1 } from './Chart1';
import seedrandom from 'seedrandom';

interface HistoricalDataItem {
  date: string;
  value: number;
}

type GroupedData = {
  [yearMonth: string]: HistoricalDataItem[];
};

interface HistoricalTableProps {
  data: HistoricalDataItem[];
}

const bgColorClass = (value: number): string => {
  if (value < 3.3) return ' shadow-lg bg-gradient-to-r from-red-500 to-rose-400';
  if (value < 6.6) return ' shadow-lg bg-gradient-to-r from-amber-500 to-yellow-400';
  return ' shadow-lg bg-gradient-to-r from-green-500 to-teal-400';
};

// const borderColorClass = (): string => {
//   return ' shadow-lg border-2 border-red-500 ';
// };

const groupBy = (
  array: any[],
  keyFn: { (item: any): string; (arg0: any): any }
) => {
  return array.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
};

const average = (arr: number[]): number | undefined => {
  if (arr.length === 0) return undefined;
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};

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

const HistoricalTable: React.FC<HistoricalTableProps> = ({ data }) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const sortedData = data.slice().sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const groupedData: GroupedData = groupBy(sortedData, (item) => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.getMonth();
    return `${year}-${month}`;
  });

  type AveragedData = {
    [year: string]: {
      [month: string]: number;
    };
  };

  const averagedData: AveragedData = {};
    
  // Find the first year with data
  const firstYear = Math.min(
    ...Object.keys(groupedData)
      .map(key => {
        const yearPart = key.split('-')[0];
        return yearPart ? parseInt(yearPart) : Infinity;  // if yearPart is undefined, use Infinity
      })
  );
  
  // Start with the first year and go 4 years forward
  for(let year = firstYear; year < firstYear + 5; year++) {
    // Convert the year to a string, because the keys in averagedData are strings
    const yearString = String(year);
  
    // If the year does not exist in averagedData, create an empty object for it
    if(!averagedData[yearString]) {
      averagedData[yearString] = {};
    }
  }
  
  Object.entries(groupedData).forEach(
    ([yearMonth, items]: [string, HistoricalDataItem[]]) => {
      if (items && items.length > 0) {
        const avgValue = average(items.map((item) => item.value));
        const [year, month] = yearMonth.split('-') as [string, string];
        if (year && month) {
          if (avgValue !== undefined) {
            (averagedData[year] as { [key: string]: number })[month] =
              avgValue ?? 0;
          }
        }
      }
    }
  );
  

  const isFuture = (year: number, month: number) => {
    const now = new Date();
    return now.getFullYear() < year || (now.getFullYear() === year && now.getMonth() < month);
  };
  
  const isCurrentMonth = (year: number, month: number) => {
    const now = new Date();
    return now.getFullYear() === year && now.getMonth() === month;
  };
  
  const [activeButton, setActiveButton] = useState<string | null>('tableButton');


  return (
    <div className="my-4 flex flex-col rounded-lg bg-white px-2 sm:px-8 py-4 shadow-lg dark:bg-slate-900/40 dark:shadow-slate-200/5">
      <div className=" rounded-lg flex flex-col sm:flex-row justify-between items-center gap-2 ">
        <h1 className="text-lg font-semibold text-black dark:text-slate-200 md:text-2xl xl:text-3xl">
          Your Yearly Fulfilment
        </h1>
        <div className='flex mx-4 gap-3 text-white text-bold'>
        <button
        className={`px-4 mr-2 border rounded-full border-blue-600 font-semibold ${activeButton === 'tableButton' ? 'bg-blue-300/20 text-blue-600 dark:bg-slate-800 dark:text-blue-400' : 'bg-blue-500 px-4 border rounded-full shadow'}`}
        onClick={() => setActiveButton('tableButton')}
      >
        Table
      </button>
      <button
        className={`px-4 border rounded-full border-blue-600 font-semibold ${activeButton === 'graphButton' ? 'bg-blue-300/20 text-blue-600 dark:bg-slate-800 dark:text-blue-400' : 'bg-blue-500 px-4 border rounded-full shadow'}`}
        onClick={() => setActiveButton('graphButton')}
      >
        Graph
      </button>

        </div>
      </div>
      
      {activeButton === 'tableButton' && (
        <div id="tableSection">
          <div className="hidden text-black dark:text-slate-200 md:block">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-center text-sm">
                      Overall Score
                    </th>
                    {months.map((month, index) => (
                      <th key={index} className="px-4 py-2">
                        {month}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(averagedData)
                    .map(([year, yearData], index) => (
                      <tr key={index}>
                        <td className="p-2 text-center">{year}</td>
                        {months.map((_month, monthIndex) => {
                          // console.log('AveragedData for large screen:', averagedData);
                          // console.log('Large screen yearData:', year, yearData);
                          const value = yearData[monthIndex];

                          // const borderClass = 
                          // value === undefined && isCurrentMonth(parseInt(year), monthIndex) ? borderColorClass : '';
                          
                          const bgClass =
                            value !== undefined ? bgColorClass(value) : '';
                          // console.log('large screen value', value)
                          return (
                            <td key={monthIndex} className="p-2">
                            <div
                                className={`text-white font-extrabold mx-auto  ${bgClass}   w-fit rounded-full px-3 py-2 text-sm`}
                              >
                              {
                                value !== undefined ? 
                                `${value.toFixed(1)}` : 
                                isFuture(parseInt(year), monthIndex) ? 
                                  <div className=' shadow-lg border border-black px-2 py-1 rounded-full bg-gradient-to-r from-gray-100 to-stone-300/50 dark:from-slate-50 dark:to-slate-200'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                    </svg>
                                  </div>
                                : isCurrentMonth(parseInt(year), monthIndex) ? 
                                <p className='text-black dark:text-white rounded-full px-2 py-1 font-semibold text-lg border-2 border-cyan-500 animate-bounce'><a href='/forms' className='p-2'>Update</a></p>
                                : ''
                              }
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeButton === 'graphButton' && (
        <div id="graphSection">
          {data && data.length >= 2 ? (
            <div className='my-4 sm:mx-4'>
              <Chart1 data={data} />
            </div>
            ) : (
              <>
                <h3 className='text-3xl text-black font-semibold mt-8'> 
                  Keep it up for more!
                </h3>
                <div className="p-8 bg-gradient-to-r from-sky-200/20 to-cyan-100/20 rounded-lg shadow-xl border-cyan-500 border-2" >
                <p className='text-xl font-medium text-slate-900 dark:text-slate-100 mb-6'>
                  And that's just the beginning! As you continue to track and engage with your Life Tracker, 
                  you'll unlock even more features and insights tailored to your unique goals and experiences. 
                  Stay engaged, and watch how the Life Tracker becomes an essential companion in your personal growth journey.
                </p>
                  <div className="bg-white dark:bg-black p-4 rounded-lg shadow-md mb-4 border border-sky-300">
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">Score Graph:</h4>
                    <Chart1 data={generateMockData(3)} />
                  </div>
                </div>
              </>
            )
          }
        </div>
      )}

      {/* Table for small screens */}
      {/* <div className="md:hidden">
        {Object.entries(averagedData)
          .map(([year, yearData], yearIndex) => (
            <div key={yearIndex} className="mb-4 text-black">
              <h2 className="my-4  mx-auto w-fit text-xl font-bold">{year}</h2>
              {months.map((month, monthIndex) => {
                const value = yearData[monthIndex];
                const bgClass =
                  value !== undefined ? bgColorClass(value) : '';
                // console.log('small screen value', value)
                return (
                  <div
                    key={monthIndex}
                    className="mx-auto mb-2 flex w-fit items-center justify-around gap-16 rounded-lg bg-slate-300/20 p-2 sm:px-16 sm:text-lg"
                  >
                    <span className="w-24 text-center">{month}</span>
                    <div className="relative">
                      <div
                        className={`text-white mx-auto border ${bgClass} w-fit rounded-full px-3 py-2 text-sm`}
                      >
                        <div className="mx-auto flex w-full gap-16">
                          {value !== undefined ? `${value.toFixed(1)}` : ''}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default HistoricalTable;
