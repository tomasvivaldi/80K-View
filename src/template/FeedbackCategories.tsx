interface FeedbackCategoriesProps {
  categories: string[];
  onCategorySelect: (categoryIndex: number) => void;
  currentIndex: number;
}

function FeedbackCategories({ categories, onCategorySelect, currentIndex }: FeedbackCategoriesProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4 justify-between">
      {categories.map((category, index) => (
        <button
          key={category}
          className={`px-2 py-1 border rounded-full text-sm font-semibold ${index === currentIndex ? 'bg-blue-500 text-white border-gray-100' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => onCategorySelect(index)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FeedbackCategories;
