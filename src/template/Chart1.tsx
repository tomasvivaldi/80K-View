import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/chart/ChartCard';

interface Chart1Props {
  data: Array<{ date: string; value: number }>;
}

const Chart1: React.FC<Chart1Props> = ({ data }) => {
  const convertData = (data: { date: string | number | Date; value: any }) => {
    const dateObject = new Date(data.date);
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
    // const year = dateObject.getFullYear();
    // const formattedDate = `${day} ${monthName} ${year}`;
    const formattedDate = `${day} ${monthName}`;

    return {
      date: formattedDate,
      value: data.value,
    };
  };

  const convertedData = data && data.length > 0 ? data.map(convertData) : [];

  return (
    <ChartCard title="Overall Score %">
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
          name={'Overall Score %'}
          strokeWidth={2}
          stroke="#667EEA"
          fill="url(#colorUv)"
          fillOpacity={1}
        />
      </AreaChart>
    </ChartCard>
  );
};

export { Chart1 };
