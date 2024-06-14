import Link from 'next/link';
import React from 'react';

function VideoBanner() {
  return (
    <div className="font-semibold rounded-lg shadow-lg relative
     bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 dark:text-white  text-black
      sm:text-base md:text-lg lg:text-xl  px-4 py-2  flex flex-col md:h-40 md:w-[70%]  justify-between">
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-70 -z-0 rounded-lg"></div>
      <div className='flex h-fit items-start'>
        <p className=' text-left w-[35%] lg:w-[42%] z-0'>
        Watch our quick video guide and master the art of easy navigation. Your journey to effortless usage starts here!
        </p>
        
      </div>
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <Link href="/forms" className="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.8" stroke="currentColor" className="w-16 h-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>
        </Link>
      </div>      
    </div>
  ) 
}

export default VideoBanner;
