import type { ReactNode } from 'react';

type IStatsCardProps = {
  icon: ReactNode;
  text: string;
  children: ReactNode;
};

const StatsCard = (props: IStatsCardProps) => (
  <div className="stats-card flex items-center rounded-md border border-gray-200 dark:border-blue-500 bg-white p-4 shadow-lg dark:bg-slate-900/80 dark:shadow-slate-200/5 dark:text-slate-200">
    <div className="flex h-16 xl:h-12 w-16 xl:w-12 shrink-0 items-center justify-center rounded-full bg-blue-500">
      {props.icon}
    </div>

    <div className="ml-4">
      <div className="text-lg font-bold text-gray-800 dark:text-slate-100">{props.children}</div>
      <div className="text-base font-semibold">{props.text}</div>
    </div>

    <style jsx>
      {`
        .stats-card :global(svg) {
          @apply text-gray-100 stroke-current w-8 h-8 stroke-2;
        }
      `}
    </style>
  </div>
);

export { StatsCard };
