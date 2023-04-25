import React from 'react'

interface BeginFormProps {
  
}

const BeginForm: React.FC<BeginFormProps> = () => {
  return (
    <div className="flex flex-col rounded-md border-gray-200 bg-white px-4 py-5 w-full gap-4">
      <div className="text-lg sm:text-2xl font-semibold text-gray-800 text-center w-full my-4">Answer Questions</div>
      <div className='text-xs sm:text-base px-4 sm:px-12 md:px-44 space-y-4'>
        <p>Each category has 3 fields each, <span className='font-semibold text-gray-900'>- score, notes, and action plan -</span> and all of them are required. You will be able to see the inserts from the last time you filled out the form, so you can compare and reflect on your previous answers.</p>
        <p>Please make sure to fill out all fields before submitting the form. Once you submit, your answers will be saved, and you can revisit this page at any time to update your answers.</p>
      </div>
    </div>
  );
};

export default BeginForm;