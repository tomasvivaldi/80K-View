import Link from 'next/link';
import React from 'react';

function FillFormBanner() {
  return (
    <div className="font-semibold rounded-lg shadow-lg my-2 sm:my-4
     bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 text-slate-800 
      sm:text-base  p-2 md:p-8 md:pr-16 flex flex-col md:flex-row md:h-20 items-center justify-between">
      <div className='flex h-fit my-1 sm:my-4'>
        <p className='text-sm sm:text-xl text-center'>
          It's time to update your life fulfilment tracker!
        </p>
        
      </div>
      <div className='my-2 sm:my-4'>
        <Link href="/forms" className="mx-auto my-16">
          <button className='text-[14px] sm:text-lg w-32 sm:w-44 bg-blue-300/20 rounded-full p-1 border-2 text-black border-gray-800 hover:bg-blue-400/20 active:bg-blue-300/20'>Update Now!</button>
        </Link>
      </div>      
    </div>
  ) 
}

export default FillFormBanner;
