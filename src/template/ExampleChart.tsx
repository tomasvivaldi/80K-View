import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/chart/ChartCard';

const data = [
  {
    users: 30,
    month: 'Apr',
  },
  {
    users: 25,
    month: 'May',
  },
  {
    users: 38,
    month: 'Jun',
  },
  {
    users: 45,
    month: 'Jul',
  },
  {
    users: 42,
    month: 'Aug',
  },
  {
    users: 40,
    month: 'Sep',
  },
  {
    users: 50,
    month: 'Oct',
  },
  {
    users: 55,
    month: 'Nov',
  },
  {
    users: 57,
    month: 'Dec',
  },
];

const CustomTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={25} y={5} dy={16} textAnchor="end" fill="#666" transform="rotate(-0)">
        {payload.value}
      </text>
    </g>
  );
};

const ExampleChart = () => (
  <ChartCard title="Overall Score:">
    <AreaChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
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
      <XAxis dataKey="month" tickLine={false} axisLine={false} tick={<CustomTick />}/>
      <YAxis domain={[0, 'dataMax']} tickLine={false} axisLine={false}/>
      <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false}/>
      <Tooltip />
      <Area
        type="monotone"
        dataKey="users"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  </ChartCard>

  
);

export { ExampleChart };