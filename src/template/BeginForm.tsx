import React from 'react';

interface BeginFormProps {}

const BeginForm: React.FC<BeginFormProps> = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border-gray-200 bg-white px-4 py-5">
      <div className="my-4 w-full text-center text-lg font-semibold text-gray-800 sm:text-2xl">
        Answer Questions
      </div>
      <div className="space-y-4 px-4 text-xs sm:px-12 sm:text-base md:px-44">
        <p className=' indent-4'>
          Each category has 3 fields each,{' '}
          <span className="font-semibold text-gray-900">
            score, notes, and action plan.
          </span>{' '}
          Please make sure to fill out all fields before submitting the form.           
        </p>
        <p className=' indent-4'>
        Once you submit, your answers will be saved, and you can revisit this page 
          at any time to update your answers. This also helps you make a better 
          assessment for the months going forward.
        </p>
      </div>
    </div>
  );
};

export default BeginForm;
