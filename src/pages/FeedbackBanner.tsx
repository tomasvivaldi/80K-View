import Link from 'next/link';
import React from 'react';

function FeedbackBanner() {
  return (
    <div className="font-semibold rounded-lg shadow-lg relative
     bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 dark:text-white  text-black
      sm:text-base   px-4 py-2  flex flex-col md:h-40 md:w-[30%]  justify-between">
      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-900 opacity-70 -z-0 rounded-lg"></div>
      <div className='flex h-fit items-start z-0 flex-col'>
        <p className=' text-left w-full text-xl '>
        Your opinion shapes our world!
        </p>
        <p className='dark:text-slate-300 text-gray-700'> Share your feedback and help us enhance your experience. </p>
        
      </div>
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <Link href="/forms" className="">
          
        </Link>
      </div>      
    </div>
  ) 
}

export default FeedbackBanner;
