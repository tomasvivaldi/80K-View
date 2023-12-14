import type { Session } from 'next-auth';
import React, { useEffect, useState } from 'react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';

import type { CategoryData, MyFormData } from './AnswerSection';

interface Form2FillProps {
  category: CategoryName;
  register: UseFormRegister<MyFormData>;
  errors: FieldErrors<MyFormData>;
  session: Session | null;
  formData: CategoryData | {};
  setFormDataForCategory: (category: string, data: CategoryData) => void;
  hasSubmitted: boolean;
  setHasSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  showNotes: boolean;
  setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
}

type CategoryName = keyof typeof categoryQueries;

function isCategoryData(obj: any): obj is CategoryData {
  return (
    obj.hasOwnProperty('score') &&
    obj.hasOwnProperty('notes') &&
    obj.hasOwnProperty('action_plan') &&
    (obj.hasOwnProperty('goals') || true)
  );
}

const Form2Fill: React.FC<Form2FillProps> = ({
  category,
  register,
  formData,
  setFormDataForCategory,
  hasSubmitted,
  showNotes,
  setShowNotes,
  selectedDate,
}) => {
  // Set the initial value of 'score' to an empty string when the component is mounted
  useEffect(() => {
    setFormDataForCategory(category, { ...formData, });
  }, []);
  useEffect(() => {
    if (isCategoryData(formData) && formData.goals) {
      setGoals(formData.goals);
    } else {
      setGoals({ items: [] }); // Reset to default if no goals are present for the category
    }
  }, [category, formData]);


  const handleInput = (e: { target: { value: any } }) => {
    const { value } = e.target;

    // Check if the new value is valid
    const isValid =
      value === '' ||
      (!isNaN(value) &&
        parseFloat(value) >= 0 &&
        parseFloat(value) <= 10 &&
        /^10$|^[0-9]$/.test(value));

    // If the new value is valid, update the score
    if (isValid) {
      setFormDataForCategory(category, { ...formData, score: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const now = selectedDate;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = monthNames[now.getMonth()]; 

  // State to manage the goals
  const [goals, setGoals] = useState<Goal>({ items: [] });

  // Function to handle change in goal item's description
  // const handleDescriptionChange = (index: number, newDescription: string) => {
  //   const newItems = goals.items.map((item, idx) => 
  //     idx === index ? { ...item, description: newDescription } : item
  //   );
  //   setGoals({ items: newItems });
  // };

  // // Function to add a new goal item
  // const addNewGoalItem = () => {
  //   const newGoalItem: Item = { isChecked: false, description: '' };
  //   setGoals({ items: [...goals.items, newGoalItem] });
  // };

  //   // Function to delete a goal item
  //   const deleteGoalItem = (index: number) => {
  //     const newItems = goals.items.filter((_, idx) => idx !== index);
  //     setGoals({ items: newItems });
  //   };

  // Function to add a new goal item
  const addNewGoalItem = () => {
    const newGoalItem: Item = { isChecked: false, description: '' };
    const updatedGoals = { ...goals, items: [...goals.items, newGoalItem] };
    setGoals(updatedGoals);
    setFormDataForCategory(category, { ...formData, goals: updatedGoals });
  };

  // Function to delete a goal item
  const deleteGoalItem = (index: number) => {
    const updatedItems = goals.items.filter((_, idx) => idx !== index);
    const updatedGoals = { ...goals, items: updatedItems };
    setGoals(updatedGoals);
    setFormDataForCategory(category, { ...formData, goals: updatedGoals });
  };

  return (
    <div className="w-full rounded-md bg-transparent px-2">
      <form className="flex flex-col gap-0 lg:gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-around gap-0 ">
          <div className='flex flex-row'>
            <div className="flex flex-col items-baseline w-full text-left text-slate-800 dark:text-slate-100">
              <p className='text-2xl md:text-4xl font-semibold '>{currentMonth}</p>
              
              {showNotes ? (
                <button className='whitespace-nowrap  hover:underline underline-offset-1 decoration-gray-600 decoration-2 text-slate-500 dark:text-slate-400' onClick={() => setShowNotes(false)}>Back to This Month</button>
              ) : (
                <button className='whitespace-nowrap hover:underline underline-offset-1 decoration-gray-600 decoration-2 text-slate-500 dark:text-slate-400' onClick={() => setShowNotes(true)}>Show Last Entry</button>
              )}
                </div>
            
            
            <div className="flex flex-row items-center gap-2 lg:gap-4">
              <Label
                htmlFor="comment"
                colSpanSize="lg:col-start-1 lg:col-span-2 lg:row-start-1 mb-2"
              >
                Score:
              </Label>
              <input
                {...register('score', {
                  required: true,
                  pattern: /^10$|^[0-9]$/,
                })}
                type="text"
                id="score"
                className={`hide-arrows h-12 w-20 rounded-lg bg-sky-400/5  text-black dark:text-slate-200 text-center text-3xl  placeholder:text-lg  ${hasSubmitted && !(formData as CategoryData).score ? 'border-red-500' : 'border-sky-600'} border-2 lg:row-start-2`}
                placeholder="0-10" 
                value={
                  isCategoryData(formData)
                    ? formData.score !== null
                      ? formData.score
                      : ''
                    : ''
                }
                onChange={handleInput}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <div className={`flex w-full flex-col gap-2 ${hasSubmitted && !(formData as CategoryData).notes ? 'border-red-500' : ''}`}>
            <Label htmlFor="comment" colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-1">
            What happened this month?
            </Label>
            <FormElement colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-2">
              <div className={hasSubmitted && !(formData as CategoryData).notes ? 'w-full h-fit rounded-lg border-2 border-red-500' : ''}>
                <textarea
                  {...register('notes', { required: true })}
                  className="border-none block resize-none placeholder:text-xs text-black dark:text-slate-200 bg-transparent"
                  id="textarea"
                  rows={8}
                  placeholder="Describe what happened this month for this category and how you feel about it. You'll be able to review these notes later on the 80K View page and more detailed descriptions will result in more detailed feedback" 
                  value={
                    isCategoryData(formData)
                      ? formData.notes !== null
                        ? formData.notes
                        : ''
                      : ''
                  }
                  onChange={(e) =>
                    setFormDataForCategory(category, {
                      ...formData,
                      notes: e.target.value,
                    })
                  }
                />
              </div>
            </FormElement>
          </div>
          <div className={`flex w-full flex-col gap-2 ${hasSubmitted && !(formData as CategoryData).action_plan ? 'border-red-500' : ''}`}>
            <Label htmlFor="comment" colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-1">
              Action Plan:
            </Label>
            
            <FormElement colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-2 ">
              <div className={hasSubmitted && !(formData as CategoryData).action_plan ? 'w-full h-fit rounded-lg border-2 border-red-500' : ''}>
              <textarea
                {...register('action_plan', { required: true })}
                className="border-none block resize-none placeholder:text-xs text-black dark:text-slate-200 bg-transparent"
                id="textarea"
                rows={8}
                placeholder="Outline your action plan. You can write how you feel about this category or what you plan to do for improving next month" 
                value={
                  isCategoryData(formData)
                    ? formData.action_plan !== null
                      ? formData.action_plan
                      : ''
                    : ''
                }
                onChange={(e) =>
                  setFormDataForCategory(category, {
                    ...formData,
                    action_plan: e.target.value,
                  })
                }
              />
              </div>
            </FormElement>
          </div>

          <div className="mb-12 py-4 space-y-4 flex flex-col items-start">
          <Label htmlFor="comment" colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-1">
            Montly Goals:
          </Label>
            {goals.items.map((_item, index) => (
              <div key={index} className="flex flex-col w-full" >
                <div className="flex items-center gap-2">
                  <input
                  // {...register(`goals.items[${index}].description`, { required: false })} // Register each goal's description
                  {...register(`goals.${category}.items[${index}].description`)}
                    type="text"
                    // value={item.description}
                    // onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    value={
                      isCategoryData(formData) && formData.goals && formData.goals.items.length > index
                        ? formData?.goals?.items[index]?.description ?? ''
                        : ''
                    }
                    onChange={(e) => {
                      if (isCategoryData(formData) && formData.goals) {
                      const newDescription = e.target.value;
                      setFormDataForCategory(category, {
                        ...formData,
                        goals: {
                          ...formData?.goals,
                          items: formData?.goals.items.map((item: Item, idx: number) => 
                            idx === index ? { ...item, description: newDescription } : item
                          ),
                        },
                      });
                     }
                    }}
                    placeholder="Enter goal description"
                    className="w-full border rounded-lg block resize-none placeholder:text-xs text-black dark:text-slate-200 bg-transparent"
                  />
                  <button onClick={() => deleteGoalItem(index)} className="ml-2 text-black dark:text-white hover:text-red-500 dark:hover:text-red-500"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg></button>

                </div>
              </div>
            ))}
            <button 
              onClick={addNewGoalItem} 
              className={`mt-2 ${goals.items.length === 0 ? 'animate-bounce' : ''}`}
            >
              Add Goal
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { Form2Fill };
