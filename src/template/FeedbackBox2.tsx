import { Session } from 'next-auth';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';



interface FeedbackBoxProps {
  userData?: UserDataById;
  categoryNames: string[];
  sortedCategoryNames: string[];
  category: string;
  session: Session | null;
  currentIndex: number;
  incrementIndex: () => void;
  decrementIndex: () => void;
  border: string;
  background: string;
  score: number;
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({
  userData,
  sortedCategoryNames,
  session,
  currentIndex,
  border,
}) => {

  const feedbacks = [
    (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.feedback,
    (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice1,
    (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice2,
    (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice3,
    (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice4,
    (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice5,
  ];


  const [items, setItems] = useState(feedbacks);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const [checkedItems, setCheckedItems] = useState(new Array(items.length).fill(false));

  const handleCheckChange = (position: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[position] = !updatedCheckedItems[position];
    setCheckedItems(updatedCheckedItems);
};


  useEffect(() => {
    if (userData && userData[sortedCategoryNames[currentIndex] + "_feedback" as CategoryFeedbackKey]) {
   
    const feedbacks = [
      (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.feedback,
      (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice1,
      (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice2,
      (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice3,
      (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice4,
      (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice5,
    ];
    setItems(feedbacks);
    setCheckedItems(new Array(feedbacks.length).fill(false));
  }
  }, [userData, currentIndex]);

  const openModal = (index: number) => {
    setItemToDelete(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setItemToDelete(null);
  };

  const handleDelete = () => {
    if(itemToDelete !== null){
      setItems(items => items.filter((_item, i) => i !== itemToDelete));
    }
    closeModal();
  }
  return session ? (
    <>
      <div className={`w-full rounded-lg shadow-md text-gray-700 bg-white p-6 flex flex-col border-2 ${border}`}>
        <div className='mb-4'>
          <p className='text-lg font-semibold'>
            Improvement suggestion for this month
          </p>
        </div>
        <div className='text-base'>
          <ol className='space-y-4'>
          {items.length > 0 && items.map((item, index) => (index > 0 && userData &&
            <li key={index} className={`flex items-center space-x-2 ${checkedItems[index] ? 'line-through text-gray-500' : ''}`}>
              {index > 0 && userData && (
                <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" checked={checkedItems[index]} onChange={() => handleCheckChange(index)} />
              )}
              <span className='flex-grow'>{item}</span>
              {index > 0 && (
                <button className=" mx-auto p-1 text-gray-500 hover:text-red-500 focus:outline-none transition duration-150 ease-in-out" onClick={() => openModal(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              )}
            </li>
          ))}


          </ol>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="p-4 border-0 mx-auto my-20 bg-white rounded-lg outline-none max-w-sm"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center outline-none"
        contentLabel="Confirm deletion"
      >
        <h2 className="text-lg mb-4">Are you sure you want to delete this item?</h2>
        <div className='flex flex-row justify-center'>  
          <button className="border border-red-500 text-red-500 hover:border-red-700 hover:text-red-700 px-4 py-2 rounded mr-2" onClick={handleDelete}>
            Yes, delete
          </button>
          <button className="border border-gray-300 text-gray-700 hover:border-gray-700 px-4 py-2 rounded" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </>
  ) : (
    <div className=""></div>
  );
}

export default FeedbackBox;
