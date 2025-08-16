import { useState } from "react";

// Add new state for tracking expanded categories
const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());

// Add toggle function for category expansion
const toggleCategory = (categoryId: number) => {
  setExpandedCategories(prev => {
    const newSet = new Set(prev);
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId);
    } else {
      newSet.add(categoryId);
    }
    return newSet;
  });
};

// Update the categories section in the JSX
// Example categories data (replace with your actual data or import)
const categories = [
  {
    id: 1,
    name: "Category 1",
    icon: "📁",
    subcategories: [
      { id: 11, name: "Subcategory 1-1", icon: "📄" },
      { id: 12, name: "Subcategory 1-2", icon: "📄" }
    ]
  },
  {
    id: 2,
    name: "Category 2",
    icon: "📁",
    subcategories: [
      { id: 21, name: "Subcategory 2-1", icon: "📄" }
    ]
  }
];

<div className="space-y-1">
  {categories.map((category) => (
    <div key={category.id} className="space-y-1">
      {/* Main category row */}
      <div 
        className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => toggleCategory(category.id)}
      >
        <div className="flex items-center gap-2">
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {/* Add chevron icon that rotates when expanded */}
          <svg
            className={`w-4 h-4 transition-transform ${
              expandedCategories.has(category.id) ? 'transform rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Sub-categories */}
      {expandedCategories.has(category.id) && category.subcategories && (
        <div className="ml-6 space-y-1">
          {category.subcategories.map((subcat) => (
            <div
              key={subcat.id}
              className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <span>{subcat.icon}</span>
              <span>{subcat.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>