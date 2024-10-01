"use client";
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { toggleCategory, selectSelectedCategories } from '@/store/ProductSlice';

const categories = ['Men', 'Kids', 'Women', 'Shoes', 'Clothes', 'Electronics'];

const FilterSide = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="relative lg:static h-full">
      <button
        className="lg:hidden block mb-4 text-white bg-blue-600 px-4 py-2 rounded-lg shadow-md "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`p-4 bg-white text-black rounded-lg max-w-full lg:min-w-[300px] shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? "block" : "hidden lg:block"
        }`}
      >
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">
          Filter by Category
        </h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category} className="mb-2 w-fit">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={category.toLowerCase()}
                  checked={selectedCategories.includes(category.toLowerCase())}
                  onChange={() => handleCategoryChange(category)}
                  className="hidden"
                />
                <span
                  className={`px-3 py-1 rounded-full border-2 border-gray-500 transition-all duration-200 ease-in-out hover:bg-blue-800 hover:text-white ${
                    selectedCategories.includes(category.toLowerCase())
                      ? "bg-blue-700 text-white"
                      : "bg-gray-100 text-black"
                  }`}
                >
                  {category}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSide;
