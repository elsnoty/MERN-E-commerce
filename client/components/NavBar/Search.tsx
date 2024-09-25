"use client";
import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import style from "./style.module.css";
import { useRouter } from 'next/navigation';
import { useFetchProductList } from '@/hooks/FetchAllProduct';

interface Search {
  _id: string;
  name: string;
}

const SearchComponent = () => {
  const [name, setName] = useState('');
  const router = useRouter();

  const { products: ProductData, isPending } = useFetchProductList<Search[]>(
    "http://localhost:3002/api/products",
    ['searchRes']
  );

  const filteredProducts = name
    ? ProductData?.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      )
    : [];

  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleProductClick = (productId: string) => {
    setName('');
    router.push(`/categories/${productId}`); 
  };
  
  if (!filteredProducts) {
    return <div>Sorry, SomeThing Went Wrong</div>
  }

  return (
    <div className="relative lg:min-w-[500px] ">
      <div className="bg-gray-300 p-2 rounded-lg flex items-center">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="text"
          placeholder="Search for a product..."
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-none ml-1 w-full"
        />
      </div>

      {filteredProducts.length > 0 && (
        <div className={`absolute max-h-[250px] overflow-hidden overflow-y-scroll rounded-md top-12 bg-gray-200 z-50 ${style.searchList}`}>
          {filteredProducts.map((product) => (
            <div key={product._id} className="p-2 hover:cursor-pointer" onClick={() => handleProductClick(product._id)}>
              <p className="p-1 rounded-md hover:bg-gray-400">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && name && (
        <div className="absolute top-12 bg-gray-200 z-50 p-2">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
