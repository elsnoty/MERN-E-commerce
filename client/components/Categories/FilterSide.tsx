"use client";
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { toggleCategory, selectSelectedCategories } from '@/store/ProductSlice';

const categories = ['Men', 'Kids', 'Women', 'Shoes', 'Clothes', 'Electronics'];

const FilterSide = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const selectedCategories = useSelector(selectSelectedCategories);

  const handleCategoryChange = (category: string) => {
    dispatch(toggleCategory(category.toLowerCase()));

    // Build a new query string with updated categories
    const updatedCategories = [...selectedCategories];
    if (selectedCategories.includes(category.toLowerCase())) {
      updatedCategories.splice(updatedCategories.indexOf(category.toLowerCase()), 1); // Remove if already selected
    } else {
      updatedCategories.push(category.toLowerCase()); // Add if not already selected
    }

    const queryString = updatedCategories.length
      ? `category=${updatedCategories.join(',')}`
      : '';

    router.push(`/categories?${queryString}`);
  };

  return (
    <div className="p-4 bg-[#39405842] text-white rounded-lg max-w-[400px] w-full">
      <h2 className="text-lg font-bold mb-4">Filter by Category</h2>
      <ul>
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                value={category.toLowerCase()}
                checked={selectedCategories.includes(category.toLowerCase())}
                onChange={() => handleCategoryChange(category)}
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
