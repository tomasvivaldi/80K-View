import type { ReactElement } from 'react';
import { ResponsiveContainer } from 'recharts';

type IChartCardProps = {
  title: string;
  children: ReactElement;
};

const ChartCard = (props: IChartCardProps) => (
  <div className="rounded-lg border border-gray-200 bg-white pt-6 pb-8">
    <div className="mb-8 pl-5 text-center text-lg font-semibold text-gray-800 sm:text-xl">
      {props.title}
    </div>

    <ResponsiveContainer height={300}>{props.children}</ResponsiveContainer>
  </div>
);

export { ChartCard };
