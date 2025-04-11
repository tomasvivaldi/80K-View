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

  // const convertedData = data && data.length > 0 ? data.map(convertData).reverse() : [];


  // 1. Determine the starting year of your data
  
  const firstDate = data?.[data.length - 1]?.date || '';
  const startDate = new Date(firstDate);
  const startYear = startDate.getFullYear();
console.log('***data',data)
console.log('***firstDate',firstDate)
console.log('***startYear',startYear)


  // 2. Create an array of dates that span 5 years from that start date
  const fiveYearsData = [];
  for (let year = startYear; year < startYear + 5; year++) {
    for (let month = 0; month < 12; month++) {
      const date = new Date(year, month, 1); // 1st day of the month
      fiveYearsData.push({
        date: convertData({ date: date.toString(), value: 0 }).date,
        value: null, // null will ensure this data point won't be shown on the graph
      });
    }
  }
  console.log('***fiveYearsData',fiveYearsData)


  // 3. Merge your existing data with the new array of dates
  const mergeData = (data: Array<{ date: string; value: number }>): Array<{ date: string; value: number }> => {
    const aggregatedData: Record<string, { sum: number; count: number }> = {};

    data.forEach((item) => {
      const date = new Date(item.date);
      const monthYearKey = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

      const currentData = aggregatedData[monthYearKey];
      if (!currentData) {
          aggregatedData[monthYearKey] = { sum: item.value, count: 1 };
      } else {
          currentData.sum += item.value;
          currentData.count += 1;
      }
  });

    // Convert aggregated data to the desired format
    const mergedData = Object.keys(aggregatedData).map((key) => {
      const currentItem = aggregatedData[key];
      return {
          date: key,
          value: currentItem ? currentItem.sum / currentItem.count : 0, // Assign a default value of 0 if necessary
      };
  });

  return mergedData;
}

const merged = mergeData(data);
console.log("****merged",merged);


const overlayData = (
  baseData: Array<{ date: string; value: number | null }>,
  actualData: Array<{ date: string; value: number }>
) => {
  return baseData.map(baseItem => {
    const actualItem = actualData.find(item => item.date === baseItem.date);
    return {
      date: baseItem.date,
      value: (actualItem ? actualItem.value : 0) as number // use type assertion here
    };
  });
}

// Since overlayData now always returns values as number, you can use the below type.
const finalData: Array<{ date: string; value: number }> = overlayData(fiveYearsData, mergeData(data));




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
        data={finalData}
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
        <CartesianGrid stroke={isDarkMode ? "#fff" : "#000"} strokeDasharray="5 15" vertical={false}/>
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
