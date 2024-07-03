import { useSession } from 'next-auth/react';
import FeedbackBox from './FeedbackBox';
import FeedbackBox2 from './FeedbackBox2';
import { useState, useEffect } from 'react';
import FeedbackCategories from './FeedbackCategories';

type FeedbackProps = {
  data: UserDataById;
};


function Feedback({ data }: FeedbackProps) {

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

  const formatCategoryName = (categoryName: string | undefined): string => {
    if (!categoryName) return '';
  
    return categoryName
      .split('_') // split the string into an array by '_'
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize the first letter of each word
      .join(' / '); // join the words back into a string with spaces
  }
  
  
  const [currentIndex, setCurrentIndex] = useState(0);

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
    scores?.sort((a: Category, b: Category) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());
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

  
    const handleCategorySelect = (index: number) => {
      setCurrentIndex(index);
    };
  return (
    <div className='flex flex-col'>
      <FeedbackCategories 
        categories={sortedCategoryNames.map(formatCategoryName)} 
        onCategorySelect={handleCategorySelect} 
        currentIndex={currentIndex}
        userData={data}
        sortedCategoryNames={sortedCategoryNames}
    />
      <div className='flex flex-col sm:flex-row gap-4'>
        <FeedbackBox 
        categoryNames={CategoryNames}
        category={sortedCategoryNames[currentIndex] ? formatCategoryName(sortedCategoryNames[currentIndex]) : ''}
        session={session}
        currentIndex={currentIndex}
        incrementIndex={incrementIndex}
        decrementIndex={decrementIndex}
        border={borderColorClass(highlightedScore)}
        background={bgColorClass(highlightedScore)}
        score={highlightedScore}
        />
        <FeedbackBox2 
        userData={data}
        categoryNames={CategoryNames}
        sortedCategoryNames={sortedCategoryNames}
        category={sortedCategoryNames[currentIndex] ? formatCategoryName(sortedCategoryNames[currentIndex]) : ''}
        session={session}
        currentIndex={currentIndex}
        incrementIndex={incrementIndex}
        decrementIndex={decrementIndex}
        border={borderColorClass(highlightedScore)}
        background={bgColorClass(highlightedScore)}
        score={highlightedScore}
        />
      </div>
    </div>
  );
}

export default Feedback;
