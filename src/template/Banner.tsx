import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

function Banner() {
  const { data: session } = useSession();
  return session ? (
    <div className="font-semibold rounded-lg shadow-lg
     bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 text-slate-800 
     text-xs sm:text-base md:text-xl p-2 md:p-8 flex flex-col md:flex-row items-center justify-between">
      <div className='flex h-fit my-4'>
        <p>
          It's time to  
        </p>
        <span className="relative mx-2 inline-block before:absolute before:-inset-1 before:block before:rounded-lg before:bg-blue-800">
          <span className="relative px-1 text-white">
          update
          </span>
        </span>
        <p>
        your life fulfilment tracker!
        </p>
        
      </div>
      <div className='my-4'>
        <Link href="/forms" className="mx-auto my-16">
          <button className='bg-blue-800 rounded-full py-2 px-8 border-2 text-gray-100 border-gray-200 hover:bg-blue-900 active:bg-blue-700'>Click here!</button>
        </Link>
      </div>
      <div />
      
    </div>
  ) : (
    <div className="">
      
    </div>
  );
}

export default Banner;
