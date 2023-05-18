import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

type FeedbackBox = {
  data?: UserDataById;
}

function FeedbackBox({ data }: FeedbackBox) {
  const { data: session } = useSession();
  const CategoryNames = [
    'career_work',
    'community',
    'environment',
    'family_friends',
    'fun_relaxation',
    'growth_learning',
    'health_fitness',
    'money_finances',
    'partner_love',
    'spirituality',
  ];

  const formatCategoryName = (categoryName: string): string => {
    return categoryName
      .split('_') // split the string into an array by '_'
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize the first letter of each word
      .join(' '); // join the words back into a string with spaces
  }
  
  const [currentIndex, setCurrentIndex] = useState(0);
  // @ts-ignore
  // const highlightedScore = data && currentIndex >= 0 && currentIndex < CategoryNames.length ? [...data[CategoryNames[currentIndex]]]?.sort((a: Category, b: Category) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]?.score || 0 : 0;
  // const incrementIndex = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % CategoryNames.length);
  // };
  // const decrementIndex = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + CategoryNames.length) % CategoryNames.length);
  // };

  const borderColorClass = (value: number): string => {
    if (value < 3.3) return 'border-red-500';
    if (value < 6.6) return 'border-yellow-500';
    return 'border-green-500';
  };
  const bgColorClass = (value: number): string => {
    if (value < 3.3) return 'bg-red-500';
    if (value < 6.6) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  


  const getMostRecentScore = (category: string) => {
    const scores = data && [...(data[category as keyof UserDataById] as Category[])];
    scores?.sort((a: Category, b: Category) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return scores?.[0]?.score || 0;
  };
  
  

  // define initial state for sortedCategoryNames
  const [sortedCategoryNames, setSortedCategoryNames] = useState<string[]>([]);
  
  // calculate sortedCategoryNames when data changes
  useEffect(() => {
    if (data) {
      const sorted = CategoryNames.sort((a, b) => getMostRecentScore(a) - getMostRecentScore(b));
      setSortedCategoryNames(sorted);
    }
  }, [data]);
  
  // then, use sortedCategoryNames when setting the category
  const incrementIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sortedCategoryNames.length);
  };
  const decrementIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sortedCategoryNames.length) % sortedCategoryNames.length);
  };
  
  // adjust highlightedScore
  const highlightedScore = data && currentIndex >= 0 && currentIndex < sortedCategoryNames.length ? 
    getMostRecentScore(sortedCategoryNames[currentIndex] || '') : 0;

  

  return session ? (
    <div className={` rounded-lg shadow-lg text-black md:min-w-[350px] border-2 
     bg-white relative
     text-xs sm:text-base  p-2 md:py-4 flex flex-col items-left ${borderColorClass(highlightedScore)}`}>
    
    <div className='text-lg font-semibold ml-2'> Most Recent Score</div>
      <div className='flex h-fit my-2 flex-row text-2xl items-center'>
      <div className={`flex font-semibold text-white text-4xl m-2 p-2 rounded-lg bg-red-500 w-16 h-16 items-center justify-center ${bgColorClass(highlightedScore)}`}>
      {highlightedScore}
      </div>
        <div className='flex flex-col mx-2 w-52'>
          <p className='font-semibold '>
            Category:
          </p>
          <p className=' text-2xl'>
          {formatCategoryName(sortedCategoryNames[currentIndex] || '')}
          </p>
          {/* <p className=' text-2xl'>
          {formatCategoryName(CategoryNames[currentIndex])}
          </p> */}
        </div>
        <div className='flex flex-col'>
          <button
            className={`cursor-pointer ${currentIndex === 0 ? 'text-gray-400' : 'text-black'}`}
            onClick={decrementIndex}
            disabled={currentIndex === 0}
          > 
            &uarr;
          </button>
          <button
            className={`cursor-pointer ${currentIndex === CategoryNames.length - 1 ? 'text-gray-400' : 'text-black'}`}
            onClick={incrementIndex}
            disabled={currentIndex === CategoryNames.length - 1}
          > 
            &darr;
          </button>
        </div>
      </div>
      <div className='text-sm md:text-base'>
      <ol className='flex flex-col w-full list-inside list-[upper-roman] '>
        
      </ol>
      </div>      
    </div>
  ) : (
    <div className="">
    </div>
  );
}

export default FeedbackBox;



// Nice green: bg-green-400/80