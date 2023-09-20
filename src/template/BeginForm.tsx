import { Button } from '@/button/Button';
import React from 'react';

interface BeginFormProps {
  handleNextClick: () => void; 
}

const BeginForm: React.FC<BeginFormProps> = ({ handleNextClick }) => {
  return (
    <div className="flex flex-col gap-4 rounded-md border-gray-200 bg-white px-4 py-12 w-[80%] mx-auto shadow-xl">
      <div className="my-2 w-full text-center text-lg font-semibold text-gray-800 sm:text-2xl">
        Update Tracker
      </div>
      <div className="space-y-4 px-4 text-xs sm:px-12 sm:text-base text-center md:max-w-[85%] mx-auto">
        <p className=''>
          Each category has 3 fields each,{' '}
          <span className="font-semibold text-gray-900">
            score, notes, and action plan.
          </span>{' '}
          Please make sure to fill out all fields before submitting the form.           
        </p>
        <p className=''>
        Once you submit, your answers will be saved, and you can revisit this page 
          at any time to update your answers. This also helps you make a better 
          assessment for the months going forward.
        </p>
      </div>
      <button
            className='flex justify-center'
              onClick={async () => {
                  handleNextClick();
              }}
            >
              <Button>
                Update Tracker 
              </Button>
            </button>
    </div>
  );
};

export default BeginForm;
