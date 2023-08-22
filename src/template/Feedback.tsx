import { useSession } from 'next-auth/react';
import FeedbackBox from './FeedbackBox';
import FeedbackBox2 from './FeedbackBox2';
import { useState, useEffect } from 'react';
import FeedbackCategories from './FeedbackCategories';
import { UPDATE_COMMUNITY_FEEDBACK_CHECKED1, UPDATE_COMMUNITY_FEEDBACK_CHECKED2, UPDATE_COMMUNITY_FEEDBACK_CHECKED3 } from 'graphql/mutations';
import client from 'apollo-client';

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

  
    const handleCategorySelect = (index: number) => {
      setCurrentIndex(index);
    };




  // This should be placed higher up where the state is defined
const [checkedItems, setCheckedItems] = useState<Record<string, boolean[]>>({});

    


  const handleCheckChange = (position: number) => {
    const currentCategory = sortedCategoryNames[currentIndex];
    if (!currentCategory) {
      console.error('Invalid category index:', currentIndex);
      return;
    }
    // Use nullish coalescing to default to an empty array if the category isn't present
    const updatedCheckedItemsForCategory = [...(checkedItems[currentCategory] ?? [])];
    // Toggle the checkbox at the given position
    updatedCheckedItemsForCategory[position] = !updatedCheckedItemsForCategory[position];
    // Update the state
    setCheckedItems({
      ...checkedItems,
      [currentCategory]: updatedCheckedItemsForCategory
    });
    // Save changes if needed
    saveCheckedStateForItem(position, updatedCheckedItemsForCategory[position] as boolean);
  };
  




  const getMutationAndVariable = (position: number) => {
    const mutations = [
        UPDATE_COMMUNITY_FEEDBACK_CHECKED1,
        UPDATE_COMMUNITY_FEEDBACK_CHECKED2,
        UPDATE_COMMUNITY_FEEDBACK_CHECKED3,
        // ... add others here as needed ...
    ];

    if (position < 0 || position >= mutations.length) {
        console.error('Invalid position:', position);
        return {};
    }

    return {
        mutation: mutations[position - 1],
        variableName: `isChecked${position}` // Starting with isChecked1
    };
  };


  const saveCheckedStateForItem = async (position: number, isChecked: boolean) => {
    const { mutation, variableName } = getMutationAndVariable(position);
    if (!mutation || !variableName) {
        console.error('Failed to find mutation or variable for position:', position);
        return;
    }

    const variables = {
        user_ref: data?.id,
        [variableName]: isChecked
    };

    try {
        await client.mutate({
            mutation,
            variables
        });
    } catch (error) {
        console.error('Error updating the checked state:', error);
        // Handle this error as required
    }
  };
  
  // You can also move the saveCheckedStateForItem and getMutationAndVariable functions here.
  





  return (
    <div className='flex flex-col'>
      <FeedbackCategories 
        categories={sortedCategoryNames.map(formatCategoryName)} 
        onCategorySelect={handleCategorySelect} 
        currentIndex={currentIndex}
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
        //////
        checkedItems={checkedItems[sortedCategoryNames[currentIndex] as string] || []} 
        onCheckChange={handleCheckChange}
        setCheckedItems={setCheckedItems}
        />
      </div>
    </div>
  );
}

export default Feedback;
