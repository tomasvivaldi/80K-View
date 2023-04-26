import React from 'react';

interface ProgressBarProps {
  page: number;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const totalPages = 11;
  const progressPercentage = (props.page / totalPages) * 100;

  return (
    <div className="mx-auto h-4 w-[80%] rounded-lg border border-gray-500 bg-white">
      <div
        className={`relative h-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000`}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
