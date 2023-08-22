import { Session } from 'next-auth';
import React from 'react';
// import Modal from 'react-modal';



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

  // const [items, setItems] = useState<string[]>([]);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  // const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  // useEffect(() => {
  //   if (userData && userData[sortedCategoryNames[currentIndex] + "_feedback" as CategoryFeedbackKey]) {
   
  //   const feedbacks = [
  //     (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.action_plan,
  //     (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryKey]?.[0]?.action_plan,
  //     (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryKey]?.[0]?.action_plan,
  //     // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice1,
  //     // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice2,
  //     // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice3,
  //     // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice4,
  //     // (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}_feedback` as CategoryFeedbackKey]?.[0]?.advice5,
  //   ];
  //   const filteredFeedbacks = feedbacks.filter((item): item is string => item !== undefined);
  //   setItems(filteredFeedbacks);
  //   setCheckedItems(new Array(feedbacks.length).fill(false));
  // }
  // }, [userData, currentIndex, sortedCategoryNames]);

  // const openModal = (index: number) => {
  //   setItemToDelete(index);
  //   setModalIsOpen(true);
  // };


  // const handleCheckChange = (position: number) => {
  //   const updatedCheckedItems = [...checkedItems];
  //   updatedCheckedItems[position] = !updatedCheckedItems[position];
  //   setCheckedItems(updatedCheckedItems);
  // };

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setItemToDelete(null);
  // };

  // const handleDelete = () => {
  //   if(itemToDelete !== null){
  //     // setItems(items => items.filter((_item, i) => i !== itemToDelete));
  //   }
  //   closeModal();
  // }
  return session ? (
    <>
      <div className={`w-full rounded-lg shadow-md text-gray-700 bg-white p-6 flex flex-col border-2 ${border}`}>
        <div className='mb-4'>
          <p className='text-lg font-semibold'>
            Improvement suggestion for this month
          </p>
        </div>
        <div className='text-base'>
        {(userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.action_plan}
        </div>
      </div>

    </>
  ) : (
    <div className=""></div>
  );
}

export default FeedbackBox;
