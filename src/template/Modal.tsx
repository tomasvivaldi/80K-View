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

  function formatDate1(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
    const [_day, month] = formattedDate.split(' ');
    return `${month} `;
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
        className="bg-white rounded-lg w-[80%] lg:max-w-[80%] mx-auto pl-6 dark:bg-slate-800 z-[500]
        max-h-[80%] "
        onClick={(e) => e.stopPropagation()}  // Prevent clicks inside the modal content from closing the modal
      >
        <div className='max-h-[70vh] overflow-y-scroll px-2 my-1 py-6 '>
        <div className='flex flex-col sm:flex-row justify-between items-start pb-4'>
          <div className='flex flex-row items-center gap-4 text-lg sm:text-xl md:text-3xl'>
            <h3 className='font-semibold'>{toCapitalized(data?.__typename)}</h3>
            <p className=''> - </p>
            <p>{formatDate1(data?.recorded_at)}</p>
          </div>
          <p className='my-auto'>date: <span className='text-sm'>{formatDate2(data?.recorded_at)}</span></p>  
        </div>
        <h4 className="text-base sm:text-xl font-bold mb-2">Score:</h4>
        <p className="mb-4">{data?.score}</p>
        <h4 className="text-base sm:text-xl font-bold mb-2">Notes:</h4>
        <p className="mb-4">{data?.notes}</p>
        <h4 className="text-base sm:text-xl font-bold mb-2">Action Plan:</h4>
        <p className="mb-4">{data?.action_plan}</p>
        <h4 className="text-base sm:text-xl font-bold mb-2">Goals:</h4>
        <ol className="space-y-4">
          {data && data.goals && data.goals.items.length > 0 ? (
            data.goals.items.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-sky-500"
                  checked={item.isChecked}
                  readOnly
                />
                <span className={`flex-grow ${item.isChecked ? 'line-through text-gray-500' : ''}`}>
                  {item.description}
                </span>
                {/* Uncomment this section if you need to handle delete functionality
                <button
                  className="mx-auto p-1 text-gray-500 hover:text-red-500 focus:outline-none transition duration-150 ease-in-out"
                  onClick={() => openModal(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
                */}
              </li>
                ))
              ) : (
                <p>No goals found for this category, this month.</p>
              )}
            </ol>

        <button 
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-full font-semibold" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
    </div>
  );
};

export default Modal;
