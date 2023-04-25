import React from 'react'

interface ProgressBarProps {
  page: number;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const totalPages = 11;
  const progressPercentage = ((props.page) / totalPages) * 100;

  return (
    <div className="h-4 w-[80%] mx-auto bg-white rounded-lg border border-gray-500">
      <div
        className={`h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg transition-all duration-1000 relative`}
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;