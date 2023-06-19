import { Session } from 'next-auth';
import React from 'react';

// type FeedbackBoxProps = {
//   userData?: UserDataById;
// };
interface FeedbackBoxProps {
  userData?: UserDataById;
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
  userData,
  categoryNames,
  session,
  currentIndex,
  border,
}) => {  
// function FeedbackBox({ userData }: FeedbackBoxProps) {

  const feedback = (userData as UserDataById)?.[`${categoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.feedback
  const step1 = (userData as UserDataById)?.[`${categoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice1
  const step2 = (userData as UserDataById)?.[`${categoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice2
  const step3 = (userData as UserDataById)?.[`${categoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice3
  const step4 = (userData as UserDataById)?.[`${categoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice4
  const step5 = (userData as UserDataById)?.[`${categoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice5
console.log('userData - from feedback',userData)
console.log('categoryNames[currentIndex] - from feedback',categoryNames[currentIndex])
console.log('feedback - from feedback',feedback)
  return session ? (
    <div className={`rounded-lg shadow-lg text-black md:w-[1550px]
     bg-white p-2 md:p-4 flex flex-col items-left border-2 ${border}`}>
      <div className='flex h-fit mb-2'>
        <p className='font-semibold lg:text-lg'>
          Improvement suggestion for this month
        </p>
      </div>
      <div className='text-sm md:text-base'>
        <ol className='flex flex-col w-full list-inside list-[upper-roman] text-xs lg:text-sm xl:text-base'>
        <li>{feedback}</li>
        <li>{step1}</li>
        <li>{step2}</li>
        <li>{step3}</li>
        <li>{step4}</li>
        <li>{step5}</li>       
        </ol>
      </div>      
    </div>
  ) : (
    <div className=""></div>
  );
}

export default FeedbackBox;
