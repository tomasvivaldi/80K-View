import type { Session } from 'next-auth';
import React, { useEffect } from 'react';
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
}

type CategoryName = keyof typeof categoryQueries;

function isCategoryData(obj: any): obj is CategoryData {
  return (
    obj.hasOwnProperty('score') &&
    obj.hasOwnProperty('notes') &&
    obj.hasOwnProperty('action_plan')
  );
}

const Form2Fill: React.FC<Form2FillProps> = ({
  category,
  register,
  formData,
  setFormDataForCategory,
  hasSubmitted,
  showNotes,
  setShowNotes
}) => {
  // Set the initial value of 'score' to an empty string when the component is mounted
  useEffect(() => {
    setFormDataForCategory(category, { ...formData, });
  }, []);

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

  const now = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = monthNames[now.getMonth()]; 

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

        </div>
      </form>
    </div>
  );
};

export { Form2Fill };
