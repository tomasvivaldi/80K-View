import React from "react";
import { format } from "date-fns";

interface HistoricalDataItem {
  date: string;
  value: number;
}

interface HistoricalTableProps {
  data: HistoricalDataItem[];
}

const borderColorClass = (value: number): string => {
  if (value < 34) return "border-red-500";
  if (value < 67) return "border-yellow-500";
  return "border-green-500";
};

const groupBy = (array, keyFn) => {
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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const sortedData = data.slice().sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  const groupedData = groupBy(sortedData, (item) => {
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
  Object.entries(groupedData).forEach(([yearMonth, items]) => {
    const avgValue = average(items.map((item) => item.value));
    const [year, month] = yearMonth.split("-");
    if (!averagedData[year]) {
      averagedData[year] = {};
    }
    if (avgValue !== undefined) {
      averagedData[year][month] = avgValue;
    }
  });
  



  return (
    <div className="flex flex-col bg-white px-8 pt-4 pb-2 my-4 rounded-lg">
      <div className=" bg-blue-800 py-2 px-4 rounded-lg">
        <h1 className="font-semibold text-lg sm:text-2xl md:text-3xl text-gray-100">
          Life Fufillment Tracker
        </h1>
      </div>
      {/* Table for large screens */}
      <div className="hidden md:block text-black" >
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-sm text-center px-4 py-2">
                  Overall Score %
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
                .reverse()
                .map(([year, yearData], index) => (
                  <tr key={index}>
                    <td className="px-2 py-2 text-center">{year}</td>
                    {months.map((month, monthIndex) => {
                      const value = yearData[monthIndex];
                      const borderClass =
                        value !== undefined ? borderColorClass(value) : "";
                      return (
                        <td key={monthIndex} className="px-2 py-2">
                          <div
                            className={`mx-auto border ${borderClass} rounded-full w-fit px-3 py-2 text-sm`}
                          >
                            {value !== undefined ? `${value.toFixed(1)}%` : ""}
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
          .reverse()
          .map(([year, yearData], yearIndex) => (
            <div key={yearIndex} className="mb-4 text-black">
              <h2 className="w-fit  text-xl font-bold my-4 mx-auto">{year}</h2>
              {months.map((month, monthIndex) => {
                const value = yearData[monthIndex];
                const borderClass =
                  value !== undefined ? borderColorClass(value) : "";
                return (
                  <div
                    key={monthIndex}
                    className="flex sm:px-16 sm:text-lg bg-slate-300/20 p-2 rounded-lg items-center justify-around mb-2 w-fit mx-auto gap-16"
                  >
                    <span className="w-24 text-center">{month}</span>
                    <div className="relative">
                      <div
                        className={`mx-auto border ${borderClass} rounded-full w-fit px-3 py-2 text-sm`}
                      >
                        <div className="flex w-full mx-auto gap-16">
                          {value !== undefined ? `${value.toFixed(1)}%` : ""}
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
