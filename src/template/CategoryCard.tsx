import React from 'react'

interface CategoryCardProps {
  data: Category;
  isOpen: boolean;
}

const CategoryCard:React.FC<CategoryCardProps> = ( { data, isOpen }) => {
  function formatDate1(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    const [day, month] = formattedDate.split(' ');
    return `${month} ${getOrdinal(day as string)}`;
}

function getOrdinal(n: string): string {
    const num = parseInt(n, 10);
    if (num > 3 && num < 21) return n + 'th';
    switch (num % 10) {
        case 1:  return n + "st";
        case 2:  return n + "nd";
        case 3:  return n + "rd";
        default: return n + "th";
    }
  }
  
  function formatDate2(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  }

  const bgColorClass = (value: number): string => {
    if (value < 3.3) return ' shadow-lg bg-gradient-to-r from-red-500 to-rose-400';
    if (value < 6.6) return ' shadow-lg bg-gradient-to-r from-amber-500 to-yellow-400';
    return ' shadow-lg bg-gradient-to-r from-green-500 to-teal-400';
  };
  const bgClass =
  data?.score !== undefined ? bgColorClass(data?.score) : '';
  return (
    <button className={`bg-slate-50 dark:bg-slate-800 h-fit mx-2
      hover:shadow-xl hover:scale-105 dark:hover:bg-slate-900 focus:bg-green-500 active:bg-red-500
      rounded-lg shadow dark:shadow-slate-300/5
      dark:text-slate-200 text-slate-800 
      transition-all duration-500 ease-in-out overflow-x-hidden
      ${isOpen ? 'opacity-100 transform translate-x-0 w-[300px]' : 'opacity-0 transform -translate-x-4 w-[0px]'}`
    }>
      <div className='flex flex-row'>
          <div className={`${bgClass} w-[75px] flex justify-center items-center `}>
          <p className='text-5xl text-white'>{data && data?.score}</p>
        </div>
        <div className='flex flex-col px-4 py-2 w-[225px]'>
          <p className='text-xl font-bold text-left'>{data && data?.created_at ? formatDate1(data.created_at) : ""}</p>
          <div className='flex flex-row gap-1 items-center'>
            <p className=' font-semibold'>Notes: </p>
            <p className='font-light truncate text-sm'>{data && data?.notes}</p>
          </div>
          <div className='flex flex-row gap-1 items-center'>
            <p className=' font-semibold'>Action&nbsp;Plan: </p>
            <p className='font-light truncate text-sm'>{ data &&  data?.action_plan}</p>
          </div>
          <div className='flex flex-row gap-1 text-xs self-end'>
            <p> date:</p>
            <p>{data && data?.created_at ? formatDate2(data.created_at) : ""}</p>
          </div>
        </div>
      </div>
    </button>
  )
}

export default CategoryCard