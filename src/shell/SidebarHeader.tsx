import className from 'classnames';
import type { ReactNode } from 'react';

import { ToggleMenuButton } from '@/button/ToggleMenuButton';
import { useMenu } from '@/utils/Navigation';

import { Sidebar } from './Sidebar';

type ISidebarHeaderProps = {
  topLinks: ReactNode;
  bottomLinks: ReactNode;
  title: string;
  leftContent: ReactNode;
  children: ReactNode;
};

const SidebarHeader = (props: ISidebarHeaderProps) => {
  const { showMenu, handleToggleMenu, handleClose } = useMenu();

  const clickableBgClass = className(
    'fixed',
    'w-full',
    'h-full',
    'z-40',
    'inset-0',
    'bg-black',
    'opacity-50',
    'cursor-default',
    {
      hidden: !showMenu,
    },
    '2xl:hidden'
  );

  return (
    <div className="flex h-screen text-gray-600 dark:text-slate-200 antialiased">
      <button
        className={clickableBgClass}
        onClick={handleClose}
        aria-label="Close"
        type="button"
        tabIndex={-1}
      />

      <Sidebar
        show={showMenu}
        topLinks={props.topLinks}
        bottomLinks={props.bottomLinks}
      />

      <div className="flex flex-1 flex-col overflow-hidden ">
        <header className="flex h-16 items-center justify-between bg-white dark:bg-slate-800 p-3 sm:px-5 lg:px-6">
          <div className="mr-2 2xl:hidden">
            <ToggleMenuButton onClick={handleToggleMenu} />
          </div>

          <div className="text-lg font-bold text-gray-900 dark:text-slate-200">{props.title}</div>

          <div className="ml-auto">{props.leftContent}</div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export { SidebarHeader };
