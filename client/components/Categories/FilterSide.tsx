import React from 'react';

interface FilterSideProps {
  selectedCategories: string[];
  handleCategoryChange: (category: string) => void;
}

const categories = ['Men', 'Kids', 'Women', 'Shoes', 'Clothes', 'Electronics'];

const FilterSide: React.FC<FilterSideProps> = ({ selectedCategories, handleCategoryChange }) => {
  return (
    <div className="w-full p-4 shadow-lg">
      <h2 className="text-lg font-bold mb-4">Filter by Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value={category.toLowerCase()}
                checked={selectedCategories.includes(category.toLowerCase())}
                onChange={() => handleCategoryChange(category.toLowerCase())}
                className="mr-2"
              />
              {category}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSide;
