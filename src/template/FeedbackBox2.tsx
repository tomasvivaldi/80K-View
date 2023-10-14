import { Session } from 'next-auth';
import React, { useState } from 'react';
//  import Modal from 'react-modal';

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
  const [showNotes, setShowNotes] = useState(false);
  // const [items, setItems] = useState<string[]>([]);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  // const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  // useEffect(() => {
  //   if (userData && userData[sortedCategoryNames[currentIndex] + "_feedback" as CategoryFeedbackKey]) {

    // const feedbacks = [
      // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.feedback,
      // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice1,
      // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice2,
      // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice3,
      // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice4,
      // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice5,
    // ];
  //   const filteredFeedbacks = feedbacks.filter((item): item is string => item !== undefined);
  //   setItems(filteredFeedbacks);
  //   setCheckedItems(new Array(feedbacks.length).fill(false));
  // }
  // }, [userData, currentIndex, sortedCategoryNames]);

  // const openModal = (index: number) => {
  //   setItemToDelete(index);
  //   setCheckedItems(updatedCheckedItems);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setItemToDelete(null);
  // };

  // const handleDelete = () => {
  //   if(itemToDelete !== null){
  //     setItems(items => items.filter((_item, i) => i !== itemToDelete));
  //   }
  //   closeModal();
  // }
  return session ? (
    <>
      <div className={`w-full rounded-lg shadow-md text-gray-900 bg-white p-6 flex flex-col border-2 ${border}
      dark:bg-slate-900/80 dark:shadow-slate-200/5 dark:text-slate-200`}>
        <div className='mb-4 flex flex-row justify-between align-baseline'>
          <p className='text-lg font-semibold'>
            {showNotes ? "Notes:" : "Action Plan:"}
          </p>
          <div className=" text-gray-600 dark:text-slate-400">
          {showNotes ? (
            <button className='hover:underline underline-offset-1 decoration-gray-600 decoration-2' onClick={() => setShowNotes(false)}>Show AI Advice</button>
          ) : (
            <button className='hover:underline underline-offset-1 decoration-gray-600 decoration-2' onClick={() => setShowNotes(true)}>Show Notes And Action Plan</button>
          )}
        </div>
        </div>
        
        <div className='text-base'>
        {showNotes ? (
          <div className='flex flex-col gap-4'>
            <div className='text-base'>
              {/* <p className=' font-medium'>Notes</p> */}
              {(userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.notes}
            </div>

          </div>
          ) : (

            <div className='text-base'>
              {/* <p className=' font-medium'>Action Plan</p> */}
            {(userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.action_plan}
            </div>


          //  <ol className='space-y-4'>
          //  {items.length > 0 && items.map((item, index) => (index > 0 && userData &&
          //    <li key={index} className={`flex items-center space-x-2 ${checkedItems[index] ? 'line-through text-gray-500' : ''}`}>
          //      {/* {index > 0 && userData && (
          //        <input type="checkbox" className="form-checkbox h-5 w-5 text-sky-500" checked={checkedItems[index]} onChange={() => handleCheckChange(index)} />
          //      )} */}
          //      <span className='flex-grow'>{item}</span>
          //      {/* {index > 0 && (
          //        <button className=" mx-auto p-1 text-gray-500 hover:text-red-500 focus:outline-none transition duration-150 ease-in-out" onClick={() => openModal(index)}>
          //          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
          //            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          //          </svg>
          //        </button>
          //      )}  */}
          //    </li>
          //  ))}

          //  </ol>
          )}
         </div>
      </div>
      {/* <Modal
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
       </Modal> */}
    </>
  ) : (
    <div className=""></div>
  );
}

export default FeedbackBox;
