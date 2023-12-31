import React from 'react';

// Define the type for your component's props
type SpecialUserProps = {
  onClick: () => void; // This function will be provided by the parent component
};

const SpecialUser: React.FC<SpecialUserProps> = ({ onClick }) => {
  return (
    <div className="bg-gray-200 dark:bg-slate-900 flex flex-col justify-center items-center">
      <div className="bg-white dark:bg-slate-800 p-12 rounded-lg shadow-xl w-3/4 sm:w-1/2 xl:w-1/3 text-center">
        <h1 className="text-2xl font-bold mb-4">Congratulations on receiving lifetime access!</h1>
        <p className="text-gray-700 dark:text-slate-200 mb-4">
          Our aim is to foster a community where motivated individuals can grow and flourish, free from financial constraints.
        </p>
        <p className="text-gray-700 dark:text-slate-200 mb-4">
          As a token of our appreciation, you have been granted lifetime access to our platform!
        </p>
        <p className="text-gray-700 dark:text-slate-200 mb-4">
          We recommend using 80k View at least once a month to maximize its value.
        </p>
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 active:bg-blue-600 transition font-semibold"
            onClick={onClick}
          >
            Start Your 80k Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialUser;
