import type { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type IChartCardProps = {
  title: string;
  children: ReactElement;
};

const ChartCard = (props: IChartCardProps) => (
  <div className="rounded-lg border-2 border-gray-200 bg-white pt-6 pb-8 text-gray-800 dark:bg-slate-900/80 dark:shadow-slate-200/5 dark:text-slate-200 dark:border-blue-500">
    <div className="mb-8 pl-5 text-center text-lg font-semibold sm:text-xl">
      {props.title}
    </div>

    <ResponsiveContainer height={300}>{props.children}</ResponsiveContainer>
  </div>
);

export { ChartCard };
