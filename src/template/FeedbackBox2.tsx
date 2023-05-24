import { useSession } from 'next-auth/react';
import React from 'react';

type FeedbackBoxProps = {
  userData?: UserDataById;
};

function FeedbackBox({ userData }: FeedbackBoxProps) {

  const priority1 = userData?.overall_advice[0]?.advice1
  const priority2 = userData?.overall_advice[0]?.advice2
  const priority3 = userData?.overall_advice[0]?.advice3
  const priority4 = userData?.overall_advice[0]?.advice4
  
  const { data: session } = useSession();
  return session ? (
    <div className="rounded-lg shadow-lg text-black md:w-[1550px]
     bg-white p-2 md:p-4 flex flex-col items-left">
      <div className='flex h-fit mb-2'>
        <p className='font-semibold lg:text-lg'>
          Improvement suggestion for this month
        </p>
      </div>
      <div className='text-sm md:text-base'>
        <ol className='flex flex-col w-full list-inside list-[upper-roman] text-xs lg:text-sm xl:text-base'>
          <li>{priority1}</li>
          <li>{priority2}</li>
          <li>{priority3}</li>
          <li>{priority4}</li>       
        </ol>
      </div>      
    </div>
  ) : (
    <div className=""></div>
  );
}

export default FeedbackBox;
