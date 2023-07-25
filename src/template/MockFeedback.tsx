import React from 'react';
import MockFeedbackBox from './MockFeedbackBox';
import MockFeedbackBox2 from './MockFeedbackBox2';

const MockFeedback = () => {

  return (
    <div className='flex flex-col sm:flex-row gap-4'>
      <MockFeedbackBox />
      <MockFeedbackBox2 />
    </div>
  );
}

export default MockFeedback;
