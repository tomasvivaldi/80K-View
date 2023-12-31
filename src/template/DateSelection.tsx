import React, { SVGProps, useEffect, useState } from 'react';

type DateSelectionProps = {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  onContinue: () => void;
};

import toast from 'react-hot-toast';

const DateSelection: React.FC<DateSelectionProps> = ({ selectedDate, onDateSelect, onContinue }) => {
  // Update the activeDate state based on the selectedDate prop
  const [activeDate, setActiveDate] = useState<string | null>(selectedDate);

  useEffect(() => {
    // Update local state when selectedDate changes
    setActiveDate(selectedDate);
  }, [selectedDate]);

  const handleDateClick = (dateId: string) => {
    onDateSelect(dateId);
    setActiveDate(dateId); // Update local state as well
  };

  const handleContinue = () => {
    if (!activeDate) {
      toast.error("Please select a date before continuing.");
      return;
    }
    onContinue();
  };

  return (
    <div className="bg-gray-200 dark:bg-slate-900 text-white p-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-16 text-center text-slate-900 dark:text-white">What date of the month would you like to be reminded to run your 80K View?</h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center mb-10">
        {/* Early Bird Card */}
        <div className={`md:w-[250px] lg:w-[300px] gap-4 hover:scale-105 transition-all duration-300 relative flex flex-col items-center p-6 bg-white dark:bg-[#1e293b] rounded-lg shadow-lg ${activeDate === 'early-bird' ? 'ring ring-[#22c55e]' : ''}`}
             onClick={() => handleDateClick('early-bird')}>
          {activeDate === 'early-bird' ? <CheckCircleIcon className="absolute top-0 right-0 m-4 text-[#22c55e]" /> : <CircleIcon className="absolute top-0 right-0 m-4" />}
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-[#e2e8f0]">Early Bird</h2>
          <p className="text-center text-3xl font-semibold text-black dark:text-[#e2e8f0]">23rd</p>
          <p className="text-center text-black dark:text-[#e2e8f0]">Select this if you are always being pro-active.</p>
        </div>

        {/* Balanced Card */}
        <div className={`md:w-[250px] lg:w-[300px] gap-4 hover:scale-105 transition-all duration-300 relative flex flex-col items-center p-6 bg-white dark:bg-[#1e293b] rounded-lg shadow-lg ${activeDate === 'balanced' ? 'ring ring-[#22c55e]' : ''}`}
             onClick={() => handleDateClick('balanced')}>
          {activeDate === 'balanced' ? <CheckCircleIcon className="absolute top-0 right-0 m-4 text-[#22c55e]" /> : <CircleIcon className="absolute top-0 right-0 m-4" />}
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-[#e2e8f0]">Balanced</h2>
          <p className="text-center text-3xl font-semibold text-black dark:text-[#e2e8f0]">25th</p>
          <p className="text-center text-black dark:text-[#e2e8f0]">Select this if you are a mix of both or you are just unsure.</p>
        </div>

        {/* Last Minute Card */}
        <div className={`md:w-[250px] lg:w-[300px] gap-4 hover:scale-105 transition-all duration-300 relative flex flex-col items-center p-6 bg-white dark:bg-[#1e293b] rounded-lg shadow-lg ${activeDate === 'last-minute' ? 'ring ring-[#22c55e]' : ''}`}
             onClick={() => handleDateClick('last-minute')}>
          {activeDate === 'last-minute' ? <CheckCircleIcon className="absolute top-0 right-0 m-4 text-[#22c55e]" /> : <CircleIcon className="absolute top-0 right-0 m-4" />}
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-[#e2e8f0]">Last Minute</h2>
          <p className="text-center text-3xl font-semibold text-black dark:text-[#e2e8f0]">28th</p>
          <p className="text-center text-black dark:text-[#e2e8f0]">Select this if you are always leaving things until the last minute.</p>
        </div>
      </div>
      <button 
      className="bg-[#2563eb] text-white py-3 px-6 rounded-md hover:bg-[#3b82f6] focus:ring-4 focus:ring-[#2563eb] focus:ring-opacity-50 font-bold"
      onClick={handleContinue}>
        Continue
      </button>
    </div>
  )
}



function CheckCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function CircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}


export default DateSelection
  