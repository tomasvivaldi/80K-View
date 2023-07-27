import React from 'react';

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

const borderColorClass = (value: number): string => {
  if (value < 3.3) return ' shadow-lg bg-gradient-to-r from-red-500 to-rose-400';
  if (value < 6.6) return ' shadow-lg bg-gradient-to-r from-amber-500 to-yellow-400';
  return ' shadow-lg bg-gradient-to-r from-green-500 to-teal-400';
};

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
  Object.entries(groupedData).forEach(
    ([yearMonth, items]: [string, HistoricalDataItem[]]) => {
      if (items && items.length > 0) {
        const avgValue = average(items.map((item) => item.value));
        const [year, month] = yearMonth.split('-') as [string, string];
        if (year && month) {
          if (!averagedData[year]) {
            averagedData[year] = {};
          }
          if (avgValue !== undefined) {
            (averagedData[year] as { [key: string]: number })[month] =
              avgValue ?? 0;
          }
        }
      }
    }
  );

  return (
    <div className="my-4 flex flex-col rounded-lg bg-white px-8 py-4 shadow-lg">
      <div className=" rounded-lg ">
        <h1 className="text-lg font-semibold text-black sm:text-2xl md:text-3xl">
          Your Yearly Fulfilment
        </h1>
      </div>
      {/* Table for large screens */}
      <div className="hidden text-black md:block">
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
                      const borderClass =
                        value !== undefined ? borderColorClass(value) : '';
                      // console.log('large screen value', value)
                      return (
                        <td key={monthIndex} className="p-2">
                          <div
                            className={`text-white font-extrabold mx-auto border ${borderClass} w-fit rounded-full px-3 py-2 text-sm`}
                          >
                            {value !== undefined ? `${value.toFixed(1)}` : ''}
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

      {/* Table for small screens */}
      <div className="md:hidden">
        {Object.entries(averagedData)
          .map(([year, yearData], yearIndex) => (
            <div key={yearIndex} className="mb-4 text-black">
              <h2 className="my-4  mx-auto w-fit text-xl font-bold">{year}</h2>
              {months.map((month, monthIndex) => {
                const value = yearData[monthIndex];
                const borderClass =
                  value !== undefined ? borderColorClass(value) : '';
                // console.log('small screen value', value)
                return (
                  <div
                    key={monthIndex}
                    className="mx-auto mb-2 flex w-fit items-center justify-around gap-16 rounded-lg bg-slate-300/20 p-2 sm:px-16 sm:text-lg"
                  >
                    <span className="w-24 text-center">{month}</span>
                    <div className="relative">
                      <div
                        className={`text-white mx-auto border ${borderClass} w-fit rounded-full px-3 py-2 text-sm`}
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
      </div>
    </div>
  );
};

export default HistoricalTable;
