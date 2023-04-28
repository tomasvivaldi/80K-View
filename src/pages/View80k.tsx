import { Meta } from '@/layout/Meta';
import { Section } from '@/layout/Section';
import { Shell } from '@/template/Shell';
import { AppConfig } from '@/utils/AppConfig';
import { useSession } from 'next-auth/react';

type DataItem = {
  date: string;
  category: string;
  ytdTrend: number;
  score: number;
  notes: string;
  actionPlan: string;
};

const View80k = () => {
  const { data: session } = useSession();

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const data: DataItem[] = [];

  const categories = [
    'Category 1',
    'Category 2',
    'Category 3',
    'Category 4',
    'Category 5',
    'Category 6',
    'Category 7',
    'Category 8',
    'Category 9',
    'Category 10',
  ];

  categories.forEach((category) => {
    months.forEach((month, monthIndex) => {
      data.push({
        date: new Date(2023, monthIndex, 1).toISOString(),
        category,
        ytdTrend: Math.floor(Math.random() * 21) - 10, // Random YTD trend between -10 and 10
        score: Math.floor(Math.random() * 41) + 60, // Random score between 60 and 100
        notes: 'Example notes',
        actionPlan: 'Example action plan',
      });
    });
  });

  function getMonthName(dateString: string | number | Date) {
    const date = new Date(dateString);
    return date.toLocaleString('default', { month: 'long' });
  }
  
  return (
    <>
      <Meta title={AppConfig.title} description={AppConfig.description} />
      <Shell title="80K View">
        {session ? (
          <>
            {/* Table for large screens */}
            <div className="hidden text-black md:block m-2 rounded-lg border-2 border-gray-800">
              <div className="overflow-x-auto ">
                <table className="w-full table-auto">
                  <thead className=' bg-blue-800 text-white'>
                    <tr>
                      <th className="sticky top-0 px-4 py-2 text-center text-sm border-r border-gray-200">Category</th>
                      <th className="sticky top-0 px-4 py-2 text-center text-sm border-r border-gray-200">YTD Trend</th>
                      {months.map((month, monthIndex) => (
                        <th key={monthIndex} className="sticky top-0 mx-4 my-2 text-center text-sm border-l border-gray-200">
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
                    {categories.map((category) => (
                      <tr key={category} className=''>
                        <td className="h-64 p-2 text-center border-r border-b border-gray-500">{category}</td>
                        <td className="p-2 text-center border-b border-gray-500">
                          {data
                            .filter((item) => item.category === category)
                            .reduce((acc, item) => acc + item.ytdTrend, 0)}
                        </td>
                        {months.map((month, monthIndex) => {
                        const item = data.find(
                          (d) =>
                            getMonthName(d.date) === month && d.category === category
                        );
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
            <div className="md:hidden">
              {months.map((month, monthIndex) => (
                <div key={monthIndex} className="mb-4 text-black">
                  <h2 className="my-4 mx-auto w-fit text-xl font-bold">{month}</h2>
                  {categories.map((category) => {
                    const item = data.find(
                      (d) =>
                        getMonthName(d.date) === month && d.category === category
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
            </div>
          </>
        ) : (
          <>
            <Section>
              <div className="w-full rounded-md border-gray-200 bg-white px-4 py-5">
                <div className="w-full text-center text-2xl font-semibold text-gray-800">
                  Please Log In to Continue
                </div>
              </div>
            </Section>
          </>
        )}
      </Shell>
    </>
  );
};

export default View80k;

