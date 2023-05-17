import { useSession } from 'next-auth/react';
import React from 'react';

function FeedbackBox() {
  const { data: session } = useSession();


  const highlightedScore = 5; // Or wherever your number is coming from

  const borderColorClass = (value: number): string => {
    if (value < 3.3) return 'border-red-500';
    if (value < 6.6) return 'border-yellow-500';
    return 'border-green-500';
  };
  const bgColorClass = (value: number): string => {
    if (value < 3.3) return 'bg-red-500';
    if (value < 6.6) return 'bg-yellow-500';
    return 'bg-green-500';
  };




  return session ? (
    <div className={` rounded-lg shadow-lg text-black md:min-w-[350px] border-2 
     bg-white relative
     text-xs sm:text-base  p-2 md:py-4 flex flex-col items-left ${borderColorClass(highlightedScore)}`}>
    
    <div className='text-lg font-semibold ml-2'> Current Score</div>
      <div className='flex h-fit my-2 flex-row text-2xl items-center'>
      <div className={`flex font-semibold text-white text-4xl m-2 p-2 rounded-lg bg-red-500 w-16 h-16 items-center justify-center ${bgColorClass(highlightedScore)}`}>
      {highlightedScore}
      </div>
        <div className='flex flex-col mx-2'>
          <p className='font-semibold '>
            Category:
          </p>
          <p className=' text-2xl'>
            Money and Finance
          </p>
        </div>
        <div className='flex flex-col ml-2'>
          <div className=' '> &uarr;</div>
          <div className=' '> &darr;</div>
        </div>
      </div>
      <div className='text-sm md:text-base'>
      <ol className='flex flex-col w-full list-inside list-[upper-roman] '>
        
      </ol>
      </div>      
    </div>
  ) : (
    <div className="">
    </div>
  );
}

export default FeedbackBox;



// Nice green: bg-green-400/80