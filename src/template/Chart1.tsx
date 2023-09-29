import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useTheme } from 'next-themes';
import { ChartCard } from '@/chart/ChartCard';

interface Chart1Props {
  data: Array<{ date: string; value: number }>;
}

const Chart1: React.FC<Chart1Props> = ({ data }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const convertData = (data: { date: string | number | Date; value: any }) => {
    const dateObject = new Date(data.date);
    // const day = String(dateObject.getDate()).padStart(2, '0');
    const monthIndex = dateObject.getMonth(); // Months are zero-based
    const monthNames = [
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
    const monthName = monthNames[monthIndex];
    const year = dateObject.getFullYear();
    // const formattedDate = `${day} ${monthName} ${year}`;
    const formattedDate = `${monthName} ${year}`;

    return {
      date: formattedDate,
      value: data.value,
    };
  };

  const convertedData = data && data.length > 0 ? data.map(convertData).reverse() : [];

  const CustomTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={25} y={5} dy={16} textAnchor="end" fill="#ABABAB" transform="rotate(-0)">
          {payload.value}
        </text>
      </g>
    );
  };
  
  

  return (
    <ChartCard title="Overall Score:">
      <AreaChart
        data={convertedData}
        margin={{
          top: 20,
          right: 35,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          {
          isDarkMode ? (
          <>
            <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
          </>
          ) : (
          <>
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
          </>
          )}
          </linearGradient>
        </defs>
        <XAxis dataKey="date" tickLine={false} axisLine={false} tick={<CustomTick />}/>
        <YAxis domain={[0, 10]} tickLine={false} axisLine={false} ticks={[3, 6, 10]}/>
        <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false}/>
        <Tooltip
        labelClassName='dark:text-slate-200'
        contentStyle={
          isDarkMode 
            ? { backgroundColor: '#0f172a', color: '#fff', border: '1px solid #0284c7', borderRadius: '4px', }
            : { backgroundColor: '#FFF', color: '#333', border: '1px solid #0ea5e9', borderRadius: '4px' }
        }
        />
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
          name={'Overall Score'}
          strokeWidth={2}
          stroke={isDarkMode ? ("#bae6fd") : ("#0284c7")}
          fill="url(#colorUv)"
          fillOpacity={1}
        />
      </AreaChart>
    </ChartCard>
  );
};

export { Chart1 };
