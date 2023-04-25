import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { Session } from 'inspector';
import { MyFormData } from './AnswerSection';

interface Form2FillProps {
  category: string;
  register: UseFormRegister<MyFormData>;
  errors: FieldErrors<MyFormData>;
  session: Session | null;
  formData: MyFormData;
  setFormDataForCategory: (category: string, data: MyFormData) => void;
}

const Form2Fill: React.FC<Form2FillProps> = ({
  category,
  register,
  formData,
  setFormDataForCategory,
  }) => {
  // Set the initial value of 'score' to an empty string when the component is mounted
  useEffect(() => {
    setFormDataForCategory(category, { ...formData, score: '' });
  }, []);

  const handleInput = (e) => {
    const value = e.target.value;
  
    // Check if the new value is valid
    const isValid =
      value === '' ||
      (!isNaN(value) &&
        parseFloat(value) >= 0 &&
        parseFloat(value) <= 10 &&
        /^(\d(\.\d?)?|10(\.0)?)$/.test(value));
  
    // If the new value is valid, update the score
    if (isValid) {
      setFormDataForCategory(category, { ...formData, score: value });
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };  

  return(
  <div className="rounded-md border-gray-200 bg-white px-4 py-5 w-full">
    <div className="text-2xl font-semibold text-gray-800 text-center w-full">This Month</div>
    <form className="flex flex-col gap-0 lg:gap-8" onSubmit={handleSubmit}>
      <div className='flex flex-col lg:flex-row justify-around gap-0 lg:gap-8'>
        <div className='flex flex-col items-center gap-2 lg:gap-8'>
          <Label htmlFor="comment" colSpanSize="lg:col-start-1 lg:col-span-2 lg:row-start-1">
            Score:
          </Label>
          <input
            {...register('score', { required: true, pattern: /^(10(\.0)?|(\d(\.\d?)?))$/ })}
            type="text"
            id="score"
            className="text-center w-24 h-24 text-5xl bg-blue-700 text-white rounded-full hide-arrows lg:row-start-2"
            value={formData.score}
            onChange={handleInput}
            onFocus={(e) => e.target.select()}
          />
        </div>
        <div className='flex flex-col w-full gap-2 lg:gap-4'>
          <Label htmlFor="comment" colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-1">
            Notes:
          </Label>
          <FormElement colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-2">
            <textarea
              {...register('notes',{ required: true})}
              id="textarea"
              rows={5}
              value={formData.notes}
              onChange={(e) => setFormDataForCategory(category, { ...formData, notes: e.target.value })}
            />
          </FormElement>
        </div>
        <div className='flex flex-col w-full gap-2 lg:gap-4'>
          <Label htmlFor="comment" colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-1">
            Action Plan:
          </Label>
          <FormElement colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-2">
            <textarea 
              {...register('action_plan',{ required: true})}
              id="textarea" 
              rows={5}
              value={formData.action_plan}
              onChange={(e) => setFormDataForCategory(category, { ...formData, action_plan: e.target.value })}
            />
          </FormElement>
        </div>
      </div>
    </form>
  </div>
);
  };

export { Form2Fill };
