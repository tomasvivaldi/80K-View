import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/chart/ChartCard';

interface CategoryChartProps {
  data: Category[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ data }) => {
  
  const convertData = (data: Category) => {
    console.log('CATEGORY CHART DATA', data)
    const dateObject = new Date(data.created_at);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const monthIndex = dateObject.getMonth(); // Months are zero-based
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = monthNames[monthIndex];
    const formattedDate = `${day} ${monthName}`;

    return {
      date: formattedDate,
      value: data.score,
    };
  };


  const convertedData =
  data && data.length > 0
  ? [...data].reverse().map(convertData)
    : [];


  // if (loading) {
  //   return (
  //     <div className="w-full rounded-md border-gray-200 bg-gray-300 px-4 py-5">
  //       <div className="w-full text-center text-2xl font-semibold text-gray-800/80">
  //         <p className="text center m-auto h-full w-fit">Loading Data...</p>
  //       </div>
  //     </div>
  //   );
  // }
  
  const typename = data[0]?.__typename;
  const modifiedTypename = typename?.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' / ');
  const title = `${modifiedTypename} Score`;

  return (
    <ChartCard title={title} >
      <AreaChart
        data={convertedData}
        margin={{
          top: 0,
          right: 28,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false} axisLine={false} />
        <YAxis domain={[0, 10]} tickLine={false} axisLine={false} />
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="value"
          name={title}
          strokeWidth={2}
          stroke="#667EEA"
          fill="url(#colorUv)"
          fillOpacity={1}
        />
      </AreaChart>
    </ChartCard>
  );
};

export { CategoryChart };
