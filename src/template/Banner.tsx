import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

function Banner() {
  const { data: session } = useSession();
  return session ? (
    <div className="font-semibold rounded-lg shadow-lg
     bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 text-slate-800 
     text-xs sm:text-base md:text-4xl p-2 md:p-8 flex flex-col md:flex-row items-center justify-between">
      <div className='flex h-fit my-4'>
        <p>
          It's time to update your life fulfilment tracker!
        </p>
        
      </div>
      <div className='my-4'>
        <Link href="/forms" className="mx-auto my-16">
          <button className='text-xl w-64 bg-blue-300/20 rounded-full py-2 px-8 border-2 text-black border-gray-800 hover:bg-blue-400/20 active:bg-blue-300/20'>Update Now!</button>
        </Link>
      </div>      
    </div>
  ) : (
    <div className="">
      
    </div>
  );
}

export default Banner;
