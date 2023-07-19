import { Session } from 'next-auth';
import React from 'react';

interface FeedbackBoxProps {
  categoryNames: string[];
  category: string;
  session: Session | null;
  currentIndex: number;
  incrementIndex: () => void;
  decrementIndex: () => void;
  border: string;
  background: string;
  score: number;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({
  categoryNames,
  category,
  session,
  currentIndex,
  incrementIndex,
  decrementIndex,
  border,
  background,
  score,
}) => {  

  return session ? (
    <div className={` rounded-lg shadow-lg text-black md:min-w-[350px] border-2 
     bg-white relative justify-center
     text-xs sm:text-base  p-2 md:py-4 flex flex-col items-left ${border}`}>
    
    <div className='text-lg font-semibold ml-2 '>Most Recent Score&nbsp;<span className=' font-normal text-gray-600'>&nbsp;(Lowest First)</span></div>
      <div className='flex h-fit my-2 flex-row text-2xl items-center justify-center'>
      <div className={`flex font-semibold text-white text-4xl m-2 p-2 rounded-lg w-16 h-16 items-center justify-center ${background}`}>
      {score}
      </div>
        <div className='flex flex-col mx-2 w-52 '>
          <p className='font-semibold '>
            Category:
          </p>
          <p className=' text-2xl'>
          {category}
          </p>
          {/* <p className=' text-2xl'>
          {formatCategoryName(CategoryNames[currentIndex])}
          </p> */}
        </div>
        <div className='flex flex-col gap-1'>
          <button
            className={`cursor-pointer border border-black px-1 ${currentIndex === 0 ? 'text-gray-400' : 'text-black'}`}
            onClick={decrementIndex}
            disabled={currentIndex === 0}
          > 
            &uarr;
          </button>
          <button
            className={`cursor-pointer border border-black ${currentIndex === categoryNames.length - 1 ? 'text-gray-400' : 'text-black'}`}
            onClick={incrementIndex}
            disabled={currentIndex === categoryNames.length - 1}
          > 
            &darr;
          </button>
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