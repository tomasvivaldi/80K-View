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

const Chart2 = () => (
  <ChartCard title="Revenue">
    <AreaChart
      data={data}
      margin={{
        top: 0,
        right: 28,
        left: 0,
        bottom: 0,
      }}
    >
      <XAxis dataKey="month" tickLine={false} axisLine={false} />
      <YAxis tickLine={false} axisLine={false} />
      <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="users"
        name="Users"
        strokeWidth={5}
        stroke="#3B82F6"
        fill="#3B82F6"
        fillOpacity={0.25}
      />
    </AreaChart>
  </ChartCard>
);

export { Chart2 };
