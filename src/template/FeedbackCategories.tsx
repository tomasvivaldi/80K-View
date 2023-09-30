interface FeedbackCategoriesProps {
  categories: string[];
  onCategorySelect: (categoryIndex: number) => void;
  currentIndex: number;
}

function toCapitalized(str: string): string {
  return str.replace(/(?:^|[-_])([a-z])/g, (match, letter) => {
    if (match.startsWith('-') || match.startsWith('_')) {
      return match[0] === '-' ? ' ' + letter.toUpperCase() : ' / ' + letter.toUpperCase();
    }
    return letter.toUpperCase();
  });
}

function FeedbackCategories({ categories, onCategorySelect, currentIndex }: FeedbackCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-between">
      {categories.map((category, index) => (
        <button
          key={category}
          className={` shadow-lg px-2 py-1 border rounded-full text-sm font-semibold ${index === currentIndex ? 'bg-blue-500 text-white border-gray-100 dark:bg-slate-800 dark:text-blue-400 dark:border-blue-600' : 'bg-white dark:bg-blue-600 dark:text-white text-blue-500 border-blue-600'}`}
          onClick={() => onCategorySelect(index)}
        >
          {toCapitalized(category)}
        </button>
      ))}
    </div>
  );
}

export default FeedbackCategories;
