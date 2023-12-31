import React, { useEffect, useState } from 'react';
import { SVGProps } from "react"
import toast from 'react-hot-toast';

type UsePlanProps = {
  selectedPlan: string | null;
  onPlanSelect: (plan: string) => void;
  onContinue: () => void;
};


const UsePlan: React.FC<UsePlanProps> = ({ selectedPlan, onPlanSelect, onContinue }) => {
  
  // Update the activeCard state based on the selectedPlan prop
  const [activeCard, setActiveCard] = useState<string | null>(selectedPlan);

  useEffect(() => {
    // Update local state when selectedPlan changes
    setActiveCard(selectedPlan);
  }, [selectedPlan]);

  const handleCardClick = (cardId: string) => {
    onPlanSelect(cardId);
    setActiveCard(cardId); 
  };
  

  const handleContinue = () => {
    if (!activeCard) {
      toast.error("Please select a plan before continuing.");
      return;
    }
    onContinue();
  };

  return (
    <div className="bg-gray-200 dark:bg-slate-900 text-white p-8  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-6 text-center text-slate-900 dark:text-white">How are you planning to use 80k View?</h1>
      <p className="text-lg mb-10 text-center text-gray-700 dark:text-slate-200">We’ll streamline your setup experience accordingly.</p>
      <div className="flex flex-col md:flex-row gap-8 justify-center mb-10 ">
        {/* Discovery Card */}
        <div className={`md:w-[250px] lg:w-[300px] gap-4 hover:scale-105 transition-all duration-300 relative flex flex-col items-center p-6 bg-white dark:bg-[#1e293b] rounded-lg shadow-lg ${activeCard === 'discovery' ? 'ring ring-[#22c55e]' : ''}`}
             onClick={() => handleCardClick('discovery')}>
          {activeCard === 'discovery' ? <CheckCircleIcon className="absolute top-0 right-0 m-4 text-[#22c55e]" /> : <CircleIcon className="absolute top-0 right-0 m-4" />}
          <LightbulbIcon className="text-black dark:text-[#e2e8f0] mb-4 w-12 h-12" />
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-[#e2e8f0]">Discovery</h2>
          <p className="text-black dark:text-[#e2e8f0] text-center">I want to understand why I’m feeling the way that I do.</p>
        </div>

        {/* Direction Card */}
        <div className={`md:w-[250px] lg:w-[300px] gap-4 hover:scale-105 transition-all duration-300 relative flex flex-col items-center p-6 bg-white dark:bg-[#1e293b] rounded-lg shadow-lg ${activeCard === 'direction' ? 'ring ring-[#22c55e]' : ''}`}
             onClick={() => handleCardClick('direction')}>
          {activeCard === 'direction' ? <CheckCircleIcon className="absolute top-0 right-0 m-4 text-[#22c55e]" /> : <CircleIcon className="absolute top-0 right-0 m-4" />}
          <ArrowRightIcon className="text-black dark:text-[#e2e8f0] mb-4 w-12 h-12" />
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-[#e2e8f0]">Direction</h2>
          <p className="text-black dark:text-[#e2e8f0] text-center">I want to get clarity on what to focus on next and take action toward my goals.</p>
        </div>

        {/* Reflection Card */}
        <div className={`md:w-[250px] lg:w-[300px] gap-4 hover:scale-105 transition-all duration-300 relative flex flex-col items-center p-6 bg-white dark:bg-[#1e293b] rounded-lg shadow-lg ${activeCard === 'reflection' ? 'ring ring-[#22c55e]' : ''}`}
             onClick={() => handleCardClick('reflection')}>
          {activeCard === 'reflection' ? <CheckCircleIcon className="absolute top-0 right-0 m-4 text-[#22c55e]" /> : <CircleIcon className="absolute top-0 right-0 m-4" />}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mb-4 w-12 h-12 text-black dark:text-[#e2e8f0]">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2 text-black dark:text-[#e2e8f0]">Reflection</h2>
          <p className="text-black dark:text-[#e2e8f0] text-center">I want to build an awesome, retrospective life journal.</p>
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

function ArrowRightIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
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


function LightbulbIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
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

export default UsePlan