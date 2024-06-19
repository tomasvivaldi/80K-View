import React, { useState } from 'react'
import ReactDOM from 'react-dom';
import Modal from './Modal';

interface MonthDataSmallCardProps {
  data: Category;

}

const MonthDataSmallCard:React.FC<MonthDataSmallCardProps> = ( { data }) => {
  function formatDate1(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    const [_day, month] = formattedDate.split(' ');
    return `${month} `;
}

  const bgColorClass = (value: number): string => {
    if (value < 3.3) return ' shadow-lg bg-gradient-to-r from-red-500 to-rose-400';
    if (value < 6.6) return ' shadow-lg bg-gradient-to-r from-amber-500 to-yellow-400';
    return ' shadow-lg bg-gradient-to-r from-green-500 to-teal-400';
  };
  const bgClass =
  data?.score !== undefined ? bgColorClass(data?.score as number) : '';

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button 
        className={`bg-slate-50 dark:bg-slate-800 h-fit mx-2
        hover:shadow-xl hover:scale-105 dark:hover:bg-slate-900 
        rounded-lg shadow dark:shadow-slate-300/5
        dark:text-slate-200 text-slate-800 
         
        
        `
        }
        onClick={() => {
        setIsModalOpen(true)}}
      >
        <div className='flex flex-row '>
          <div className={`${bgClass} w-fit flex justify-center items-center rounded-l-lg `}>
            <p className='text-3xl text-white px-4'>{data && data?.score}</p>
          </div>
          <div className='flex flex-col px-4 py-2 w-fit '>
            <p className='text-lg font-bold text-left whitespace-nowrap'>{data && data?.recorded_at ? formatDate1(data.recorded_at) : ""}</p>
          </div>
        </div>
      </button>

        {isModalOpen && ReactDOM.createPortal(
          <Modal data={data} onClose={() => setIsModalOpen(false)} />,
            document.body
        )}
    </>
  )
}

export default MonthDataSmallCard