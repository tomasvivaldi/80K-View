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
}) => {
  // Set the initial value of 'score' to an empty string when the component is mounted
  useEffect(() => {
    setFormDataForCategory(category, { ...formData, score: null });
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
    <div className="w-full rounded-md border-gray-200 bg-white px-4 py-5">
      <div className="w-full text-center text-2xl font-semibold text-gray-800">
        {currentMonth}
      </div>
      <form className="flex flex-col gap-0 lg:gap-8" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-around gap-0 lg:flex-row lg:gap-8">
          <div className="flex flex-col items-center gap-2 lg:gap-8">
            <Label
              htmlFor="comment"
              colSpanSize="lg:col-start-1 lg:col-span-2 lg:row-start-1"
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
              className={`hide-arrows h-24 w-24 rounded-full bg-blue-400/20 text-black text-center text-5xl  placeholder:text-3xl ${hasSubmitted && !(formData as CategoryData).score ? 'border-red-500' : 'border-blue-700'} border-4 lg:row-start-2`}
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
          <div className={`flex w-full flex-col gap-2 lg:gap-4 ${hasSubmitted && !(formData as CategoryData).notes ? 'border-red-500' : ''}`}>
  <Label htmlFor="comment" colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-1">
  What happened this month?
  </Label>
  <FormElement colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-2">
    <div className={hasSubmitted && !(formData as CategoryData).notes ? 'w-full h-fit rounded-lg border-2 border-red-500' : ''}>
      <textarea
        {...register('notes', { required: true })}
        className="block resize-none placeholder:text-xs"
        id="textarea"
        rows={5}
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
<div className={`flex w-full flex-col gap-2 lg:gap-4 ${hasSubmitted && !(formData as CategoryData).action_plan ? 'border-red-500' : ''}`}>
  <Label htmlFor="comment" colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-1">
    Action Plan:
  </Label>
  
  <FormElement colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-2 ">
    <div className={hasSubmitted && !(formData as CategoryData).action_plan ? 'w-full h-fit rounded-lg border-2 border-red-500' : ''}>
    <textarea
      {...register('action_plan', { required: true })}
      className="block resize-none placeholder:text-xs"
      id="textarea"
      rows={5}
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
