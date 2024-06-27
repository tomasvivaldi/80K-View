import React, { Suspense, useState } from 'react';
import Tooltip from './Tooltip';
import { Form2Fill } from './Form2Fill';
import { PrepopulatedForm } from './PrepopulatedForm';
import PreviousDataList from './PreviousDataList';
import ChartWithPreview from './ChartWithPreview';

interface ContentAreaProps {
    isOpen: boolean;
    page: number;
    setPage: (value: ((prevState: number) => number) | number) => void;
    handleNextClick: () => void;
    PageNames: string[];
    tooltipText: string[];
    CategoryNames: string[];
    handleCategorySelect: (index: number) => void;
    register: any;
    errors: any;
    session: any;
    formData: any;
    setFormDataForCategory: (category: string, data: any) => void;
    hasSubmitted: boolean;
    setHasSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
    data?: UserDataById;
    selectedDate: Date;
    
}

type CategoryScores = {
  [key in CategoryKey]: number | null;
};



const ContentArea: React.FC<ContentAreaProps> = ({
    isOpen,
    page,
    handleNextClick,
    PageNames,
    tooltipText,
    CategoryNames,
    // handleCategorySelect,
    register,
    errors,
    session,
    formData,
    setFormDataForCategory,
    hasSubmitted,
    setHasSubmitted,
    data,
    selectedDate,
}) => {
  function toCapitalized(str: string): string {
    return str.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
      if (match.startsWith('-') || match.startsWith('_')) {
        return match[0] === '-' ? ' ' + letter.toUpperCase() : ' / ' + letter.toUpperCase();
      }
      return letter.toUpperCase();
    });
  }

    const [showNotes, setShowNotes] = useState(false);
  
    const initialScores = CategoryNames.reduce<CategoryScores>((acc, category) => {
      acc[category as CategoryKey] = null; // Initialize each category score to null
      return acc;
    }, {} as CategoryScores);
    

  const [categoryScores, setCategoryScores] = useState(initialScores);

  const handleScoreSelect = (category: string, score: number | null) => {
    setCategoryScores(prevScores => ({
      ...prevScores,
      [category]: score
    }));
  };

  const now = selectedDate;
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = monthNames[now.getMonth()]; 

  const [isPreviousDataVisible, setIsPreviousDataVisible] = useState(false);

  const togglePreviousDataVisibility = () => {
    setIsPreviousDataVisible(!isPreviousDataVisible);
  };

    return (
       
      <div className={`mx-2 lg:mx-4 flex flex-col transition-width duration-1000 ease-in-out ${isOpen ? 'w-[33vw] sm:w-[51vw] md:w-[73vw]' : 'w-[90vw]'} overflow-hidden`}>
          <div className="flex flex-col gap-4 relative">
          <div className="w-full flex max-w-[80%] flex-col rounded-lg md:w-fit">
            <div className='flex flex-row my-2 text-slate-800 dark:text-slate-200 '>

              <div className='flex flex-row items-center gap-2 mr-2 my-3'>
                <h1 className=" w-fit whitespace-nowrap text-center text-xl font-semibold text-slate-800 dark:text-slate-100 sm:text-3xl md:text-4xl">
                {currentMonth}: {toCapitalized(PageNames[page] ?? '')}
                </h1>
                <Tooltip text={toCapitalized(tooltipText[page - 1] ?? '')} positionY='down' positionX='right' width='w-64' />
              </div>
              <div className='flex flex-row gap-4 absolute right-0'>
                {data &&
                  // @ts-ignore
                  data[CategoryNames[page - 1]]?.length >= 2 && (
                      // <CategoryChart data={data[CategoryNames[page - 1] as keyof typeof data] as Category[]} />
                      <ChartWithPreview data={data[CategoryNames[page - 1] as keyof typeof data] as Category[]} />
                  )}
                <button
                  className={`  flex items-center justify-center rounded-lg bg-opacity-50 transition-transform duration-150 ease-in-out 
                  px-2
                              hover:bg-opacity-70 `}
                  onClick={async () => {
                      handleNextClick();
                  }}
                >
                  <span className=" active:scale-95 dark:text-slate-100 font-semibold text-slate-900 rounded-lg bg-slate-100 dark:bg-slate-700 py-1 px-2
                  dark:hover:bg-slate-800 hover:bg-slate-200">Review</span>
                </button>
              </div>
              
            </div>
            {/* <p className='text-sm'>Each category has 3 fields each, score, notes, and action plan. Please make sure to fill out all fields before submitting the form.</p> */}
            <div>
      <div className="flex items-center">
        <p className=' font-semibold text-slate-800 dark:text-slate-100'>Previous Months</p>
        <button onClick={togglePreviousDataVisibility} className="ml-2 focus:outline-none">
        {isPreviousDataVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:text-blue-500 active:text-blue-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg> 
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:text-blue-500 active:text-blue-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </button>
      </div>
      <div className={`transition-all duration-1000 ${isPreviousDataVisible ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
  {data && (
    <div className={`w-[90vw] ${isPreviousDataVisible ? 'overflow-hidden' : ''}`}>
    <PreviousDataList
      data={data[CategoryNames[page - 1] as keyof typeof data] as Category[]}
      isOpen={isOpen}
    /></div>
  )}
</div>

    </div>
          </div>
         
          </div>
            <div className="flex w-full flex-col gap-4 ">
            {!showNotes ? 
              <Form2Fill
                selectedDate={selectedDate}
                category={CategoryNames[page - 1] as CategoryKey}
                register={register}
                errors={errors}
                session={session}
                formData={formData[CategoryNames[page - 1] as string] ?? {}}
                setFormDataForCategory={setFormDataForCategory}
                hasSubmitted={hasSubmitted}
                setHasSubmitted={setHasSubmitted}
                showNotes={showNotes}
                setShowNotes={setShowNotes}
               selectedScore={categoryScores[CategoryNames[page - 1] as keyof typeof categoryScores]}
        handleScoreSelect={(score: number) => handleScoreSelect(CategoryNames[page - 1] as string, score)}
              /> 
            : 
            <>
              <Suspense fallback={<p>Loading feed...</p>}>
              {data && 
              // @ts-ignore
              data[CategoryNames[page - 1]]?.[0] &&(
                <PrepopulatedForm 
                // @ts-ignore
                  data={data[CategoryNames[page - 1]]?.[0]}
                  showNotes={showNotes}
                  setShowNotes={setShowNotes}
                />
              )}
              </Suspense>
            </>
            }
            </div>
          </div>
        
      );
    }


export default ContentArea;
