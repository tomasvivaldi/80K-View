import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { ChartCard } from '@/chart/ChartCard';
import { useSession } from 'next-auth/react';
import { queries } from 'graphql/queries';
import { useQuery } from '@apollo/client';



interface CategoryChartProps {
  category: string;
}

const CategoryChart: React.FC<CategoryChartProps> = ({ category }) => {
  
  const { data: session } = useSession();
    // Map the category to the corresponding query
    const categoryQueries = {
      career_work: queries.GET_CAREER_WORK_INFO_BY_USER,
      community: queries.GET_COMMUNITY_INFO_BY_USER,
      environment: queries.GET_ENVIRONMENT_INFO_BY_USER,
      family_friends: queries.GET_FAMILY_FRIENDS_INFO_BY_USER,
      fun_relaxation: queries.GET_FUN_RELAXATION_INFO_BY_USER,
      growth_learning: queries.GET_GROWTH_LEARNING_INFO_BY_USER,
      health_fitness: queries.GET_HEALTH_FITNESS_INFO_BY_USER,
      money_finances: queries.GET_MONEY_FINANCES_INFO_BY_USER,
      partner_love: queries.GET_PARTNER_LOVE_INFO_BY_USER,
      spirituality: queries.GET_SPIRITUALITY_INFO_BY_USER,
    };

    function toCamelCase(str: string): string {
      return str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      );
    }
    
    if (!category || !categoryQueries[category]) {
      return <p>Invalid category.</p>;
    }
    
    const { loading, data } = useQuery<Record<string, any>>(categoryQueries[category], {
      variables: { username: session?.user?.name },
    });
    
    const categoryData = data && data[`${toCamelCase(category)}ListByUser`];

    const convertData = (categoryData) => {
      const dateObject = new Date(categoryData.created_at);
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
      const year = dateObject.getFullYear();
      const formattedDate = `${day} ${monthName} ${year}`;
      
      return {
        date: formattedDate,
        value: categoryData.score,
      };
    };

    const convertedData = categoryData && categoryData.length > 0 ? categoryData.map(convertData) : [];

  if (loading) {
    return (
    <div className="rounded-md border-gray-200 bg-gray-300 px-4 py-5 w-full">
      <div className="text-2xl font-semibold text-gray-800/80 text-center w-full">
        <p className='text center m-auto h-full w-fit'>Loading Data...</p>
      </div>
    </div>
    );
  }
  return(
  <ChartCard title={category + " Score %"}>
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
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
    </linearGradient>
  </defs>
      <XAxis dataKey="date" tickLine={false} axisLine={false} />
      <YAxis domain={[0, 10]} tickLine={false} axisLine={false} />
      <CartesianGrid stroke="#E5E7EB" strokeDasharray="15" vertical={false} />
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area
        type="monotone"
        dataKey="value"
        name={category + "Score %"}
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