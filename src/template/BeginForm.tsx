import { Button } from '@/button/Button';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface BeginFormProps {
  handleNextClick: () => void; 
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}


const BeginForm: React.FC<BeginFormProps> = ({ handleNextClick, selectedDate, setSelectedDate }) => {
  const currentDate = new Date();
  const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const [cleared, setCleared] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <div className="flex flex-col gap-4 rounded-md border-gray-200 bg-white px-4 py-6 w-[95%] sm:w-[80%] mx-auto shadow-xl
    dark:bg-slate-900/40 dark:shadow-slate-200/5 sm:mt-[10vh]">
      <div className="my-2 w-full text-center text-2xl sm:text-3xl font-medium text-gray-800 md:text-4xl
      dark:text-slate-200 flex flex-col gap-4">
        To ensure best results, we recommend taking 20 minutes to complete your reflections
      </div>
      <div className="flex flex-col gap-4 px-4 text-xs sm:px-12 sm:text-base text-center md:max-w-[85%] mx-auto">
      
        {/* <p className=''>
          Each category has 3 fields each,{' '}
          
          <span className="font-semibold text-gray-900 dark:text-slate-100">
            score, notes, and action plan.
          </span>{' '}
          Please make sure to fill out all fields before submitting the form.           
        </p> */}
        <p className=''>
        Once you submit, your answers will be saved, and you can revisit this page 
          at any time to update your answers. This also helps you make a better 
          assessment for the months going forward.
        </p>
      </div>
      <div className=' max-w-2xl mx-auto flex flex-col gap-4'>
        <label className=' dark:text-slate-200 font-semibold text-center' htmlFor="month-picker">Select the month you want to update your tracker:</label>
        <DatePicker
        className='  dark:bg-slate-100 rounded-md dark:text-slate-200 dark:fill-slate-200 dark:decoration-slate-200 dark:border-slate-200 dark:ring-sky-400'
          openTo="month"
          views={['year', 'month']}
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate as Date)}
          slotProps={{
            field: { clearable: true, onClear: () => setCleared(true) },
          }}
          maxDate={lastDayOfCurrentMonth}
        />
      </div>
      <button
            className='mx-auto w-fit'
              onClick={async () => {
                handleNextClick();
              }}
            >
              <Button>
                Update Tracker 
              </Button>
            </button>
    </div>
  );
};

export default BeginForm;
