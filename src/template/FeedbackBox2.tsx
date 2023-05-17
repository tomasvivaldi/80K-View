import { useSession } from 'next-auth/react';
import React from 'react';

function FeedbackBox() {
  const { data: session } = useSession();
  return session ? (
    <div className=" rounded-lg shadow-lg text-black md:w-[1550px]
     bg-white
       p-2 md:p-4 flex flex-col items-left ">
      <div className='flex h-fit mb-2'>
        <p className='font-semibold lg:text-lg'>
          Improvement suggestion for this month
        </p>
      </div>
      <div className='text-sm md:text-base'>
      <ol className='flex flex-col w-full list-inside list-[upper-roman] text-xs lg:text-sm xl:text-base'>
        <li>First item iputm lorem ipsum bla  item iputm lorem ipsum bla</li>
        <li>First item iputm lorem ipsum bla  item iputm lorem ipsum bla</li>
        <li>First item iputm lorem ipsum bla  item iputm lorem ipsum bla</li>
        <li>First item iputm lorem ipsum bla  item iputm lorem ipsum bla</li>       
      </ol>
      </div>      
    </div>
  ) : (
    <div className="">
      
    </div>
  );
}

export default FeedbackBox;
