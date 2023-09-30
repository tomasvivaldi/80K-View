import type { ReactNode } from 'react';

import { Logo } from '@/template/Logo';

type IFullCenterSectionProps = {
  children?: ReactNode;
  icon?: ReactNode;
  title: string;
  description?: ReactNode;
};

/**
 * A centered layout when the whole page needs to be centered.
 * @component
 */
const FullCenterSection = (props: IFullCenterSectionProps) => (
  <div className="flex min-h-screen items-center justify-center bg-primary-100 dark:bg-gray-900">
    <div className="w-full max-w-md text-center">
      

      <div className="mt-5 rounded-md bg-white dark:border-2 dark:border-blue-200/20 dark:bg-slate-900/80 dark:shadow-slate-200/5 py-7 px-6">
        <Logo xl/>
        {props.icon && <div className="my-1">{props.icon}</div>}

        <h1 className="text-xl font-semibold mt-4">{props.title}</h1>

        <div className="mt-1">
          {props.description && (
            <div className="mb-5 text-sm">{props.description}</div>
          )}

          <div className="text-left">{props.children}</div>
        </div>
      </div>
    </div>
  </div>
);

export { FullCenterSection };
