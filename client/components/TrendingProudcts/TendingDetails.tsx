'use client'
import { ProductsProp } from '@/models/Products';
import { useFetchProductList } from '@/hooks/FetchAllProduct';
import Loader from '@/Util/Loader';
import Link from 'next/link';
import React from 'react'
import { AnimatedProduct } from '../Categories/AnimatedProduct';

const TrendingDetails= () => {
    const { ProductData, isPending, error} = useFetchProductList<ProductsProp[]>(
        `http://localhost:3002/api/products?p=&limit=4`,
        ["products"],
      );
    
      if (error) {
        return <div>Error Fetching data...</div>;
      }
  return (
    <div className='flex flex-wrap w-full justify-center items-center gap-5 '>
        {isPending ? (
          <Loader />
        ) : (
          ProductData?.map((product) => (
            <Link
              href={`/categories/${product._id}`}
              className="max-w-[290px] p-3 shadow-2xl rounded-xl"
              key={product._id}
            >
              <AnimatedProduct item={product} />
            </Link>
          ))
        )}
    </div>
  )
}

export default TrendingDetails

