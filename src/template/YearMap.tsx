import React, { useState } from 'react';



interface TableProps {
  data: UserDataById;
}

type CategoryKeys = 
| 'career_work'
| 'community'
| 'environment'
| 'family_friends'
| 'fun_relaxation'
| 'growth_learning'
| 'health_fitness'
| 'money_finances'
| 'partner_love'
| 'spirituality';

type selectedItem = {
  action_plan: string
categoryName: string
created_at: string
id: string
notes: string
score: number
user_ref: number
username: string
__typename: string
}

const categories: CategoryKeys[] = [
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

const bgColorClass = (value: number): string => {
  if (value < 3.3) return ' shadow-lg bg-gradient-to-r from-red-500 to-rose-400';
  if (value < 6.6) return ' shadow-lg bg-gradient-to-r from-amber-500 to-yellow-400';
  return ' shadow-lg bg-gradient-to-r from-green-500 to-teal-400';
};

// const borderColorClass = (): string => {
//   return ' shadow-lg border-2 border-red-500 ';
// };

type KeyFunction = (item: any) => string;


const groupByCategoryAndDate = (
  data: { career_work: Category[]; community: Category[]; environment: Category[]; family_friends: Category[]; fun_relaxation: Category[]; growth_learning: Category[]; health_fitness: Category[]; money_finances: Category[]; partner_love: Category[]; spirituality: Category[]; },
  keyFn: KeyFunction
): { [key: string]: { [subKey: string]: any[] } } => {
  // Flatten the data into a single array with a category name property
  const flattenedData = [];
  for (const categoryKey of categories) {
    for (const item of data[categoryKey]) {
      flattenedData.push({
        ...item,
        categoryName: categoryKey,
      });
    }
  }

  // Now, group this flattened array by the desired property
  return flattenedData.reduce((acc, item) => {
    const key = keyFn(item);
    const subKey = item.categoryName;
  
    if (!acc[key]) {
      acc[key] = {};
    }
  
    if (!acc[key]![subKey!]) {
      acc[key]![subKey!] = [];
    }
    // @ts-ignore
    acc[key]![subKey!].push(item);
  
    return acc;
  }, {} as { [key: string]: { [subKey: string]: any[] } });
  
};


const average = (arr: number[]): number | undefined => {
  if (arr.length === 0) return undefined;
  const sum = arr.reduce((a, b) => a + b, 0);
  return sum / arr.length;
};

// Function to format category name
const formatCategory = (category: string) => {
  if (!category) {
    return "";
  }
  
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' / ');
}

// Function to format date
const formatDate = (dateString: string | undefined): string => {
  if (dateString) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }
  return '';
};

const YearMap: React.FC<TableProps> = ({ data }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  

  
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

  const sortedData: { [key in CategoryKeys]: Category[] } = {
    career_work: [...data.career_work].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    community: [...data.community].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    environment: [...data.environment].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    family_friends: [...data.family_friends].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    fun_relaxation: [...data.fun_relaxation].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    growth_learning: [...data.growth_learning].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    health_fitness: [...data.health_fitness].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    money_finances: [...data.money_finances].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    partner_love: [...data.partner_love].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),
    spirituality: [...data.spirituality].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()),


  };

  console.log('sortedData',sortedData)


  const groupedData = groupByCategoryAndDate(sortedData, (item) => {
    console.log('!!!sortedData',sortedData)
    const dateObj = new Date(item.created_at);
    return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
  });

  // type AveragedData = {
  //   [category: string]: {
  //     [month: string]: number | undefined;
  //   };
  // };


  // const initEmptyMonths = () => {
  //   const obj: any = {};
  //   months.forEach((_, idx) => {
  //     obj[String(idx + 1).padStart(2, '0')] = undefined;
  //   });
  //   return obj;
  // };


  // Initialize averagedData with an empty object structure for each category
  const averagedData: { [key in CategoryKeys]: { [month: string]: number } } = Object.fromEntries(
    categories.map((cat) => [cat, {}])
  ) as any;

  console.log('averagedData',averagedData)
  console.log('!!groupedData!!', groupedData);

  Object.entries(groupedData).forEach(([monthKey, categoriesData]) => {
    console.log('monthKey', monthKey);

    Object.entries(categoriesData).forEach(([category, items]) => {
      console.log('category', category);
      console.log('items', items);
      
      if (items && items.length > 0) {
        const avgScore = average(items.map((item) => {
          console.log('item score', item.score);
          return item.score;
        }));
        
        console.log('avgScore', avgScore);

        if (averagedData[category as CategoryKeys]) {
          const month = monthKey.split('-')[1];
          console.log('month', month);
          if (month) {
            averagedData[category as CategoryKeys][month] = avgScore !== undefined ? avgScore : 0;
          } else {
            console.error('Unexpected monthKey format: ', monthKey);
          }
        }
      }
    });
  });

  console.log('Final averagedData', averagedData);






  

  // const isFuture = (year: number, month: number) => {
  //   const now = new Date();
  //   return now.getFullYear() < year || (now.getFullYear() === year && now.getMonth() < month);
  // };
  
  // const isCurrentMonth = (year: number, month: number) => {
  //   const now = new Date();
  //   return now.getFullYear() === year && now.getMonth() === month;
  // };
  

  return (
    <div className="my-4 flex flex-col rounded-lg bg-white px-8 py-4 shadow-lg
    dark:bg-slate-900/60 dark:shadow-slate-200/5 ">
      <div className=" rounded-lg ">
        <h1 className="text-lg font-semibold text-black sm:text-2xl md:text-3xl
        dark:text-slate-100">
          Your Year's 80k View
        </h1>
      </div>
      {/* Table for large screens */}
      <div className="hidden text-black md:block
      dark:text-slate-200">
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
    {categories.map(category => (
      <tr key={category}>
        <td className="p-2 text-center">{formatCategory(category)}</td>
        {months.map((_, monthIdx) => {
          const monthKey = `${new Date().getFullYear()}-${String(monthIdx + 1).padStart(2, '0')}`;
          const monthlyData = groupedData[monthKey]?.[category];

          console.log('*monthKey', monthKey);
          console.log('*category', category);
          console.log('*groupedData[monthKey]', groupedData[monthKey]);
          console.log('*monthlyData', monthlyData);

          console.log('monthKey', monthKey);
          console.log('monthlyData', monthlyData);
          
          let value;
          if (groupedData && monthlyData && monthlyData.length) {
            // Compute your average value here by accessing the 'score' property inside each item in the list.
            if (monthlyData && monthlyData.length) {
              // Compute your average value here by accessing the 'score' property of each item directly.
              const total = monthlyData.reduce((sum, item) => {
                console.log('*sum', sum); // Logging sum here to track the accumulated sum at each step
                return sum + item.score; // Adding the score of the current item to the accumulated sum
              }, 0);
              console.log('*total', total); // Logging the total sum after the reduce function has completed its execution
              value = total / monthlyData.length; // Calculating the average score
            }
            
          }

          const bgClass = value !== undefined ? bgColorClass(value) : '';
          return (
            <td key={monthKey} className="p-2">
              <div className={`text-white font-extrabold mx-auto ${bgClass} w-fit rounded-full px-3 py-2 text-sm cursor-pointer`}
                onClick={() => {
                  setSelectedItem(monthlyData ? monthlyData[0] : null); 
                  setIsModalOpen(true);
                }}>
                {value !== undefined ? 
                  `${value.toFixed(1)}` : 
                  <div className='shadow-lg border border-black px-2 py-1 rounded-full bg-gradient-to-r from-gray-100 to-stone-300/50 dark:from-slate-100 dark:to-slate-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                }
              </div>
            </td>
          );
        })}
      </tr>
    ))}
    {isModalOpen && selectedItem && (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center
    dark:bg-black/80">
      <div className="bg-white p-6 rounded-lg w-[80%] lg:max-w-[80%] mx-auto px-8
      dark:bg-slate-800">
        <div className='flex flex-row pb-4 items-center gap-4 text-3xl'>
          <h3 className='font-semibold'>{formatCategory((selectedItem as selectedItem)?.categoryName)}</h3>
          <p> - </p>
          <p className=''>{formatDate((selectedItem as selectedItem)?.created_at)}</p>
        </div>
        <h4 className="text-xl font-bold mb-2">Notes</h4>
        <p className="mb-4">{(selectedItem as selectedItem)?.notes}</p>

        <h4 className="text-xl font-bold mb-2">Action Plan</h4>
        <p className="mb-4">{(selectedItem as selectedItem)?.action_plan}</p>
        <button 
          className="py-2 px-4 bg-blue-500 text-white rounded-full font-semibold" 
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  )}
    </tbody>
          </table>
        </div>
      </div>

      
    </div>
  
  );
};




export default YearMap;
