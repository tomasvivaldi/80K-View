import React from 'react';

interface ModalProps {
  data: Category;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {

  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
      if (match.startsWith('-') || match.startsWith('_')) {
        return match[0] === '-' ? ' ' + letter.toUpperCase() : ' / ' + letter.toUpperCase();
      }
      return letter.toUpperCase();
    });
  }

  function formatDate2(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  }

  return (
    <div 
      className="absolute inset-0 bg-gray-500 bg-opacity-80 flex items-center justify-center dark:bg-black/80 w-screen h-screen z-[500]"
      onClick={onClose}  // Close the modal when the background is clicked
    >
      <div 
        className="bg-white p-6 rounded-lg w-[80%] lg:max-w-[80%] mx-auto px-8 dark:bg-slate-800 z-[500]"
        onClick={(e) => e.stopPropagation()}  // Prevent clicks inside the modal content from closing the modal
      >
        <div className='flex flex-row justify-between items-center pb-4'>
          <div className='flex flex-row items-center gap-4 text-3xl'>
            <h3 className='font-semibold'>{toCapitalized(data?.__typename)}</h3>
            <p> - </p>
            <p>Score: {data?.score}</p>
          </div>
          <p className=''>date: <span className='text-sm'>{formatDate2(data?.recorded_at)}</span></p>  
        </div>
        <h4 className="text-xl font-bold mb-2">Notes</h4>
        <p className="mb-4">{data?.notes}</p>

        <h4 className="text-xl font-bold mb-2">Action Plan</h4>
        <p className="mb-4">{data?.action_plan}</p>
        <button 
          className="py-2 px-4 bg-blue-500 text-white rounded-full font-semibold" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
