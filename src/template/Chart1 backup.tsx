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
    users: 10,
    month: 'Apr',
  },
  {
    users: 12,
    month: 'May',
  },
  {
    users: 20,
    month: 'Jun',
  },
  {
    users: 25,
    month: 'Jul',
  },
  {
    users: 50,
    month: 'Aug',
  },
  {
    users: 35,
    month: 'Sep',
  },
  {
    users: 42,
    month: 'Oct',
  },
  {
    users: 62,
    month: 'Nov',
  },
  {
    users: 72,
    month: 'Dec',
  },
];

const placeholderData = [
  {
    date: "2022-01-15T14:30:00",
    value: 5,
  },
  {
    date: "2022-02-20T10:15:00",
    value: 15,
  },
  {
    date: "2022-03-10T18:45:00",
    value: 25,
  },
  {
    date: "2022-04-07T09:00:00",
    value: 35,
  },
  {
    date: "2022-05-28T16:30:00",
    value: 45,
  },
  {
    date: "2022-06-18T10:00:00",
    value: 55,
  },
  {
    date: "2022-07-21T14:30:00",
    value: 65,
  },
  {
    date: "2022-08-11T10:15:00",
    value: 75,
  },
  {
    date: "2022-09-01T18:45:00",
    value: 85,
  },
  {
    date: "2022-10-15T18:45:00",
    value: 30,
  },
  {
    date: "2022-11-23T10:15:00",
    value: 20,
  },
  {
    date: "2022-12-01T14:30:00",
    value: 10,
  },
  {
    date: "2023-01-12T10:00:00",
    value: 60,
  },
  {
    date: "2023-02-25T16:30:00",
    value: 50,
  },
  {
    date: "2023-03-31T09:00:00",
    value: 40,
  },
];

const Chart1 = () => (
  <ChartCard title="Overall Score %">
    <AreaChart
      data={placeholderData}
      margin={{
        top: 0,
        right: 28,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
      <XAxis dataKey="date" tickLine={false} axisLine={false} />
      <YAxis tickLine={false} axisLine={false} />
      <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area
        type="monotone"
        dataKey="value"
        name="Overall Score %"
        strokeWidth={2}
        stroke="#667EEA"
        fill="url(#colorUv)"
        fillOpacity={1}
      />
    </AreaChart>
  </ChartCard>
);

export { Chart1 };
