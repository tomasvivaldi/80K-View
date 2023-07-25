import React from 'react';
import MockFeedbackBox from './MockFeedbackBox';
import MockFeedbackBox2 from './MockFeedbackBox2';

const MockFeedback = () => {

  const mockData = {
    id: '1',
    username: 'Test User',
    category1_feedback: [
      {
        feedback: 'feedback 1',
        advice1: 'advice 1',
        advice2: 'advice 2',
        advice3: 'advice 3',
        advice4: 'advice 4',
        advice5: 'advice 5',
      },
    ],
  };

  return (
    <div className='flex flex-col sm:flex-row gap-4'>
      <MockFeedbackBox />
      <MockFeedbackBox2 />
    </div>
  );
}

export default MockFeedback;
