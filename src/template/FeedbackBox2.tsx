import { useMutation } from '@apollo/client';
import { Session } from 'next-auth';
import React, { useEffect, useState } from 'react';
import {
  UPDATE_CAREER_WORK_GOALS,
  UPDATE_COMMUNITY_GOALS,
  UPDATE_ENVIRONMENT_GOALS,
  UPDATE_FAMILY_FRIENDS_GOALS,
  UPDATE_FUN_RELAXATION_GOALS,
  UPDATE_GROWTH_LEARNING_GOALS,
  UPDATE_HEALTH_FITNESS_GOALS,
  UPDATE_MONEY_FINANCES_GOALS,
  UPDATE_PARTNER_LOVE_GOALS,
  UPDATE_SPIRITUALITY_GOALS,
} from 'graphql/mutations';
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

interface Item {
  description: string;
  isChecked: boolean;
}
interface Goal {
  items: Item[]
}

const FeedbackBox: React.FC<FeedbackBoxProps> = ({
  userData,
  sortedCategoryNames,
  session,
  currentIndex,
  border,
}) => {
  const [showNotes, setShowNotes] = useState(false);
  const [goals, setGoals] = useState<Goal>();
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  // const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    if (userData && userData[sortedCategoryNames[currentIndex] as CategoryFeedbackKey]) {
      
      
      const goals = (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.goals as Goal
      
      setGoals(goals);
      console.log("***goals",goals)
    }  
  }, [userData, currentIndex, sortedCategoryNames]);

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
  //     setGoals(items => items?.filter((_item, i) => i !== itemToDelete));
  //   }
  //   closeModal();
  // }

  const [updateCareerWorkGoals] = useMutation(UPDATE_CAREER_WORK_GOALS);
  const [updateCommunityGoals] = useMutation(UPDATE_COMMUNITY_GOALS);
  const [updateEnvironmentGoals] = useMutation(UPDATE_ENVIRONMENT_GOALS);
  const [updateFamilyFriendsGoals] = useMutation(UPDATE_FAMILY_FRIENDS_GOALS);
  const [updateFunRelaxationGoals] = useMutation(UPDATE_FUN_RELAXATION_GOALS);
  const [updateGrowthLearningGoals] = useMutation(UPDATE_GROWTH_LEARNING_GOALS);
  const [updateHealthFitnessGoals] = useMutation(UPDATE_HEALTH_FITNESS_GOALS);
  const [updateMoneyFinancesGoals] = useMutation(UPDATE_MONEY_FINANCES_GOALS);
  const [updatePartnerLoveGoals] = useMutation(UPDATE_PARTNER_LOVE_GOALS);
  const [updateSpiritualityGoals] = useMutation(UPDATE_SPIRITUALITY_GOALS);

  // const handleCheckChange = (index: number) => {
  //   // Ensure goals and the item at the specified index are defined
  //   if (goals && goals.items && goals.items[index]) {
  //     // Create a new copy of the items array and toggle the isChecked property
  //     const newItems = goals.items.map((item, idx) => 
  //       idx === index ? { ...item, isChecked: !item.isChecked } : item
  //     );
  
  //     // Update the goals state with the new items array
  //     setGoals({ ...goals, items: newItems });
  
  //     console.log("***newGoals", { ...goals, items: newItems });
  //     try {
  //       const commonVariables = {
  //         id: (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.id,
  //         goals: goals
  //       };
  //       updateCareerWorkInfo({ variables: commonVariables });
  //       console.log('Sending Data - commonVariables:', commonVariables)
  //     } catch (error) {
  //     console.error(`Error during form submission for ${userData?.[sortedCategoryNames[currentIndex] as CategoryFeedbackKey]}:`, error);
  //     }
  //   }
  // };

  
  useEffect(() => {
    if (userData && userData[sortedCategoryNames[currentIndex] as CategoryFeedbackKey]) {
      const currentGoals = (userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.goals as Goal;
      setGoals(currentGoals);
    } else {
      setGoals({ items: [] }); // Reset if no goals are available for the current category
    }
  }, [userData, currentIndex, sortedCategoryNames]);

  const updateGoalsInDatabase = async (commonVariables: any) => {
    try {
      const typeName = userData?.[sortedCategoryNames[currentIndex] as CategoryKey]?.[0]?.__typename;
      const typeNameWithLowercaseFirstLetter = typeName ? typeName.charAt(0).toLowerCase() + typeName.slice(1) : '';
      switch (typeNameWithLowercaseFirstLetter) {
        case 'career_work':
          await updateCareerWorkGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'community':
          await updateCommunityGoals({ variables: commonVariables });
          console.log('***community - commonVariables',commonVariables)
          break;
        case 'environment':
          await updateEnvironmentGoals({ variables: commonVariables });
          console.log('***environment - commonVariables',commonVariables)
          break;
        case 'family_friends':
          await updateFamilyFriendsGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'fun_relaxation':
          await updateFunRelaxationGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'growth_learning':
          await updateGrowthLearningGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'health_fitness':
          await updateHealthFitnessGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'money_finances':
          await updateMoneyFinancesGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'partner_love':
          await updatePartnerLoveGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
        case 'spirituality':
          await updateSpiritualityGoals({ variables: commonVariables });
          // console.log('commonVariables',commonVariables)
          break;
      
        default:
          console.error('Unknown category:', typeNameWithLowercaseFirstLetter);
      }
    } catch (error) {
      console.error(`Error updating goals for ${sortedCategoryNames[currentIndex]}:`, error);
    }
  };

  const handleCheckChange = (index: number) => {
    if (goals && goals.items && goals.items[index]) {
      const newItems = goals.items.map((item, idx) => 
        idx === index ? { ...item, isChecked: !item.isChecked } : item
      );
      
      const updatedGoals = { ...goals, items: newItems };
      setGoals(updatedGoals);

      // Prepare variables for mutation
      const commonVariables = {
        id: userData?.[sortedCategoryNames[currentIndex] as CategoryKey]?.[0]?.id,
        goals: updatedGoals,
      };
      updateGoalsInDatabase(commonVariables);
    }
  };



  // const handleCheckChange = (index: number) => {
  //   // Ensure goals and the item at the specified index are defined
  //   if (goals && goals.items && goals.items[index]) {
  //     const newItems = goals.items.map((item, idx) => 
  //       idx === index ? { ...item, isChecked: !item.isChecked } : item
  //     );
  
  //     setGoals({ ...goals, items: newItems });
  //   }
  // };
  
  // useEffect(() => {
  //   const updateGoals = async () => {
  //     if (goals) {
  //       try {
  //         const commonVariables = {
  //           id: userData?.[sortedCategoryNames[currentIndex] as CategoryKey]?.[0]?.id,
  //           goals: goals
  //         };
  //         switch (userData?.[sortedCategoryNames[currentIndex] as CategoryKey]?.[0]?.__typename) {
  //           case 'career_work':
  //             await updateCareerWorkGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           case 'community':
  //             await updateCommunityGoals({ variables: commonVariables });
  //             console.log('***community - commonVariables',commonVariables)
  //             break;
  //           case 'environment':
  //             await updateEnvironmentGoals({ variables: commonVariables });
  //             console.log('***environment - commonVariables',commonVariables)
  //             break;
  //           case 'family_friends':
  //             await updateFamilyFriendsGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           case 'fun_relaxation':
  //             await updateFunRelaxationGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           case 'growth_learning':
  //             await updateGrowthLearningGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           case 'health_fitness':
  //             await updateHealthFitnessGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           case 'money_finances':
  //             await updateMoneyFinancesGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           case 'partner_love':
  //             await updatePartnerLoveGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           case 'spirituality':
  //             await updateSpiritualityGoals({ variables: commonVariables });
  //             // console.log('commonVariables',commonVariables)
  //             break;
  //           default:
  //             console.error('Unknown category:', (userData?.[sortedCategoryNames[currentIndex] as CategoryKey]?.[0]?.__typename));
  //             throw new Error('Unknown category');
  //         }

  //       } catch (error) {
  //         console.error(`Error updating goals for ${sortedCategoryNames[currentIndex]}:`, error);
  //       }
  //     }
  //   };
  //     updateGoals();
  // }, [goals, userData, sortedCategoryNames, currentIndex, updateCareerWorkGoals, /* include other update functions in dependencies */]);
  
  console.log("*****goals.items",goals?.items)
  return session ? (
    <>
      <div className={`w-full rounded-lg shadow-md text-gray-900 bg-white p-6 flex flex-col border-2 ${border}
      dark:bg-slate-900/80 dark:shadow-slate-200/5 dark:text-slate-200`}>
        <div className='mb-4 flex flex-row justify-between align-baseline'>
          <p className='text-lg font-semibold'>
            {showNotes ? "Notes and Action Plan:" : "Goals:"}
          </p>
          <div className=" text-gray-600 dark:text-slate-400">
          {showNotes ? (
            <button className='hover:underline underline-offset-1 decoration-gray-600 decoration-2' onClick={() => setShowNotes(false)}>Show Goals</button>
          ) : (
            <button className='hover:underline underline-offset-1 decoration-gray-600 decoration-2' onClick={() => setShowNotes(true)}>Show Note and Action Plan</button>
          )}
        </div>
        </div>
        
        <div className='text-base'>
        {showNotes ? (
          <div className='flex flex-col gap-4'>
            <div className='text-base'>
              <p className=' font-semibold'>Notes</p>
              {(userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.notes}
            </div>
            <div className='text-base'>
              <p className=' font-semibold'>Action Plan</p>
            {(userData as UserDataById)?.[`${sortedCategoryNames[currentIndex]}` as CategoryKey]?.[0]?.action_plan}
            </div>
          </div>
          ) : (
            <ol className='space-y-4'>
            {goals && goals.items.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                {userData && (
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-sky-500"
                    checked={item.isChecked}
                    onChange={() => handleCheckChange(index)}
                  />
                )}
                <span className={`flex-grow ${item.isChecked ? 'line-through text-gray-500' : ''}`}>
                  {item.description}
                </span>
                {/* <button
                  className="mx-auto p-1 text-gray-500 hover:text-red-500 focus:outline-none transition duration-150 ease-in-out"
                  onClick={() => openModal(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button> */}
              </li>
            ))}
          </ol>
          
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
