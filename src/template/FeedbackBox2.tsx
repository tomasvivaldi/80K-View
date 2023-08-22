import { Session } from 'next-auth';
import React, { useState } from 'react';

interface FeedbackBoxProps {
  userData?: UserDataById;
  categoryNames: string[];
  sortedCategoryNames: string[];
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
  sortedCategoryNames,
  session,
  currentIndex,
  border,
}) => {
  const [showNotes, setShowNotes] = useState(false);

  return session ? (
    <>
      <div className={`w-full rounded-lg shadow-md text-gray-900 bg-white p-6 flex flex-col border-2 ${border}`}>
        <div className='mb-4'>
          <p className='text-lg font-semibold'>
            {showNotes ? "Last Month's Notes:" : "Last Month's Action Plan:"}
          </p>
        </div>
        <div className=''>
          {showNotes ? (
            <div className='text-base'>
              {(userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.notes}
            </div>
          ) : (
            <div className='text-base'>
              {(userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.action_plan}
            </div>
          )}
        </div>
        <div className="mt-4 text-gray-600 ">
          {showNotes ? (
            <button className='hover:underline underline-offset-1 decoration-gray-600 decoration-2' onClick={() => setShowNotes(false)}>Show Action Plan</button>
          ) : (
            <button className='hover:underline underline-offset-1 decoration-gray-600 decoration-2' onClick={() => setShowNotes(true)}>Show Notes</button>
          )}
        </div>
      </div>
    </>
  ) : (
    <div className=""></div>
  );
}

export default FeedbackBox;
