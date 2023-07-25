import React from 'react';

const FeedbackBox: React.FC = () => {  

  // Hardcoded mock data
  const mockCategory = 'Health & Fitness';
  const mockBorder = 'border-yellow-500';
  const mockBackground = 'bg-yellow-500';
  const mockScore = 4;

  return (
    <div className={`rounded-lg shadow-lg text-black md:min-w-[350px] border-2 
      bg-white relative justify-center
      text-xs sm:text-base  p-2 md:py-4 flex flex-col items-left ${mockBorder}`}>
    
      <div className='text-lg font-semibold ml-2 '>Most Recent Score&nbsp;<span className='font-normal text-gray-600'>&nbsp;(Lowest First)</span></div>
      <div className='flex h-fit my-2 flex-row text-2xl items-center justify-center'>
      <div className={`flex font-semibold text-white text-4xl m-2 p-2 rounded-lg w-16 h-16 items-center justify-center ${mockBackground}`}>
      {mockScore}
      </div>
        <div className='flex flex-col mx-2 w-52 '>
          <p className='font-semibold '> Category: </p>
          <p className='text-2xl'> {mockCategory} </p>
        </div>
        <div className='flex flex-col'>
          <button
            className=" text-gray-400"
            disabled
          > 
            &uarr;
          </button>
          <button
            className=" text-black"
            disabled
          > 
            &darr;
          </button>
        </div> 
      </div>
    
    </div>
  );
}

export default FeedbackBox;
