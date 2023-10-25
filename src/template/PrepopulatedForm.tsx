import React from 'react';
import { FormElement } from '@/form/FormElement';
import { Label } from '@/form/Label';

interface PrepopulatedFormProps {
  data: Category;
  showNotes: boolean;
  setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrepopulatedForm: React.FC<PrepopulatedFormProps> = ({ data, showNotes, setShowNotes }) => {
  const dateObject = data ? new Date(data.recorded_at) : null;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const lastEntryMonth = dateObject ? monthNames[dateObject.getMonth()] : "No Entries";  

  return (
    <div className="w-full rounded-md bg-transparent px-2">
      <form className="flex flex-col gap-0 lg:gap-8" >
        <div className="flex flex-col justify-around gap-0 ">
          <div className='flex flex-row'>
            <div className="flex flex-col items-baseline w-full text-left text-slate-800 dark:text-slate-100">
              <p className='text-2xl md:text-4xl font-semibold '>Last Entry: {lastEntryMonth}</p>
              
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
                
                type="text"
                id="score"
                className="hide-arrows h-12 w-20 rounded-lg bg-sky-400/5  text-slate-800 dark:text-slate-200 text-center text-3xl border-sky-600'} border-2 lg:row-start-2"
                value={data && data?.score}
                disabled
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 ">
            <Label htmlFor="comment" colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-1">
            What happened this month?
            </Label>
            <FormElement colSpanSize="lg:col-start-2 lg:col-span-2 lg:row-start-2">
              <div className="w-full h-fit rounded-lg">
                <textarea
                  className="border-none block resize-none text-slate-800 dark:text-slate-200 bg-transparent lg:text-lg"
                  id="textarea"
                  rows={8}
                  value={data && data?.notes}
                  disabled
                />
              </div>
            </FormElement>
          </div>
          <div className="flex w-full flex-col gap-2 ">
            <Label htmlFor="comment" colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-1">
              Action Plan:
            </Label>
            
            <FormElement colSpanSize="lg:col-start-3 lg:col-span-2 lg:row-start-2 ">
              <div className="">
              <textarea
                className="border-none block resize-none text-slate-800 dark:text-slate-200 bg-transparent lg:text-lg"
                id="textarea"
                rows={8}
                value={data && data?.action_plan}
                disabled
              />
              </div>
            </FormElement>
          </div>
        </div>
      </form>
    </div>
  );
};

export { PrepopulatedForm };
