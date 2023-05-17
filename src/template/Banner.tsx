import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

function Banner() {
  const { data: session } = useSession();
  return session ? (
    <div className="font-semibold rounded-lg shadow-lg my-4
     bg-gradient-to-r from-cyan-400 via-teal-300 to-green-400 text-slate-800 
      sm:text-base  p-2 md:p-8 md:pr-16 flex flex-col md:flex-row h-20 items-center justify-between">
      <div className='flex h-fit my-4'>
        <p className='text-xl'>
          It's time to update your life fulfilment tracker!
        </p>
        
      </div>
      <div className='my-4'>
        <Link href="/forms" className="mx-auto my-16">
          <button className='text-lg w-44 bg-blue-300/20 rounded-full p-1 border-2 text-black border-gray-800 hover:bg-blue-400/20 active:bg-blue-300/20'>Update Now!</button>
        </Link>
      </div>      
    </div>
  ) : (
    <div className="">
      
    </div>
  );
}

export default Banner;
