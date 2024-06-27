import React from 'react';
import { Area, AreaChart, XAxis, YAxis } from 'recharts';

interface MiniatureChartProps {
  data: Category[];
  onClick: () => void;
}

const MiniatureChart: React.FC<MiniatureChartProps> = ({ data, onClick }) => {
  const convertData = (data: Category) => {
    const dateObject = new Date(data.recorded_at);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const monthIndex = dateObject.getMonth();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const monthName = monthNames[monthIndex];
    const formattedDate = `${day} ${monthName}`;
    return { date: formattedDate, value: data.score };
  };

  const convertedData = data && data.length > 0 ? [...data].reverse().map(convertData) : [];

  return (
    <div onClick={onClick} className="cursor-pointer w-fit h-fit border border-stone-200 dark:border-slate-600 relative 
     shadow-sm hover:shadow-md hover:dark:shadow-slate-100 hover:dark:shadow-sm">
      <div className='cursor-pointer absolute w-full h-full inset-0 z-10'/>
      <AreaChart width={150} height={80} data={convertedData}>
        <defs>
          <linearGradient id="colorUvMini" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false} axisLine={false} hide />
        <YAxis domain={[0, 10]} tickLine={false} axisLine={false} hide />
        {/* <Tooltip /> */}
        <Area type="monotone" dataKey="value" stroke="#0284c7" fill="url(#colorUvMini)" fillOpacity={1} />
      </AreaChart>
    </div>
  );
};

export { MiniatureChart };
