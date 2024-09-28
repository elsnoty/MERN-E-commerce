'use client'
import { ProductsProp } from '@/models/Products';
import { useFetchProductList } from '@/hooks/FetchAllProduct';
import Loader from '@/Util/Loader';
import Link from 'next/link';
import React from 'react'
import { AnimatedProduct } from '../Categories/AnimatedProduct';

const TrendingDetails= () => {
    const { products, isPending, error} = useFetchProductList<ProductsProp[]>(
        `http://localhost:3002/api/products?p=1&limit=4`,
        ["Trending"],
      );

      if (error) {
        return <div>Error Fetching data...</div>;
      }
  return (
    <div className='flex flex-wrap w-full justify-center items-center gap-5 '>
      {isPending && (
        <div className='flex-1 grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 py-14'>
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        </div>
      )}
        {
          products?.map((product) => (
            <Link
              href={`/categories/${product._id}`}
              className="max-w-[290px] p-3 shadow-2xl rounded-xl"
              key={product._id}
            >
              <AnimatedProduct item={product} />
            </Link>
          )
        )}
    </div>
  )
}

export default TrendingDetails

