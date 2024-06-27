import React from 'react';

interface ChartModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ChartModal: React.FC<ChartModalProps> = ({ onClose, children }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center dark:bg-black/80 w-screen h-screen z-[500]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-[80%] lg:max-w-[80%] mx-auto p-6 dark:bg-slate-900 z-[500] max-h-[80%]"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal content from closing the modal
      >
        <div className="max-h-[70vh] overflow-y-scroll">
          {children}
        </div>
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full font-semibold"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ChartModal;
