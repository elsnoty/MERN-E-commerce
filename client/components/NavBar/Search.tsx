"use client"
import { useQuery } from '@tanstack/react-query';
import React, { useState, ChangeEvent } from 'react';
import { FetchAll } from '../Util/FetchAllProduct'; // Assume this function fetches all products
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import style from "./style.module.css"

interface Search {
    id: string;
  name: string;
}

const SearchComponent = () => {
  const [name, setName] = useState('');

  // Fetch all products using react-query
  const { data: products, isLoading, isError } = useQuery<Search[]>({
    queryKey: ['searchRes'],
    queryFn: FetchAll,
  });

  // Filter products 
  const filteredProducts = products?.filter((product) =>
    name && product.name.toLowerCase().includes(name.toLowerCase())
  );

    if (!filteredProducts) {
        return null
    }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="relative lg:min-w-[500px] ">
      <div className="bg-gray-300 p-2 rounded-lg">
          <FontAwesomeIcon icon={faMagnifyingGlass} /> 
        <input
          type="text"
          placeholder="Search for a product..."
          onChange={(e:ChangeEvent<HTMLInputElement>)=>setName(e.target.value)}
          value={name}
          className=' bg-transparent outline-none ml-1'
        />
      </div>

      <div className={`absolute max-h-[250px] overflow-hidden overflow-y-scroll rounded-md top-12 bg-gray-200 ${style.searchList}`}>
        {
          filteredProducts.map((product) => (
            <div key={product.id} className="p-2 hover:cursor-pointer">
                <p className='p-1 rounded-md hover:bg-gray-400'>
                    {product.name}
                </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchComponent;
