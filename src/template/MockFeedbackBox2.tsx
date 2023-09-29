import React, { useState } from 'react';

const FeedbackBox = () => {
  const feedbacks = [
    'Look for gyms near you',
    'Get a gym subscription',
    'Research and make a workout plan',
    'Start going to the gym',
    'Write down your exercises and weights for future reference',
  ];
  
  const border = 'border-yellow-500';

  const [checkedItems] = useState([true, true, false, false, false]);

  return (
    <div className={`w-full rounded-lg shadow-md text-gray-700 bg-white p-6 flex flex-col border-2 ${border}
    dark:bg-slate-900/80 dark:shadow-slate-200/5 dark:text-slate-200`}>
      <div className='mb-4'>
        <p className='text-lg font-semibold'>
          Improvement suggestion for this month
        </p>
      </div>
      <div className='text-base'>
        <ol className='space-y-4'>
          {feedbacks.map((item, index) => (
            <li key={index} className={`flex items-center space-x-2 ${checkedItems[index] ? 'line-through text-gray-500' : ''}`}>
              <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={checkedItems[index]} readOnly />
              <span className='flex-grow'>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default FeedbackBox;
