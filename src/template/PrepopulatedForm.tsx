import React from 'react';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';

interface PrepopulatedFormProps {
  data: Category;
}

const PrepopulatedForm: React.FC<PrepopulatedFormProps> = ({ data }) => {
  const dateObject = data ? new Date(data.created_at) : null;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const lastEntryMonth = dateObject ? monthNames[dateObject.getMonth()] : "No Entries";  


  return (
    <div className="w-full rounded-md border-gray-200 bg-white px-4 py-5">
      <div className="w-full text-center text-2xl font-semibold text-gray-800">
        Last Entry: {lastEntryMonth}
      </div>
      <form className="flex flex-col gap-0 lg:gap-8">
        <div className="flex flex-col justify-around gap-0 lg:flex-row lg:gap-8">
          <div className="flex flex-col items-center gap-2 lg:gap-8">
            <Label
              htmlFor="comment"
              colSpanSize="lg:col-start-1 lg:col-span-2 lg:row-start-1"
            >
              Score:
            </Label>
            <input
              type="text"
              id="score"
              value={data && data?.score}
              disabled
              className="hide-arrows h-24 w-24 rounded-full border-blue-700 border-4 bg-blue-400/20 text-black text-center text-5xl lg:row-start-2"
            />
          </div>
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            <Label
              htmlFor="comment"
              colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-1"
            >
              Notes:
            </Label>
            <FormElement colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-2">
              <textarea
                id="textarea"
                value={data && data?.notes}
                disabled
                rows={5}
              />
            </FormElement>
          </div>
          <div className="flex w-full flex-col gap-2 lg:gap-4">
            <Label
              htmlFor="comment"
              colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-1"
            >
              Action Plan:
            </Label>
            <FormElement colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-2">
              <textarea
                id="textarea"
                value={data && data?.action_plan}
                disabled
                rows={5}
              />
            </FormElement>
          </div>
        </div>
      </form>
    </div>
  );
};

export { PrepopulatedForm };
