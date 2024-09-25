'use client'
import { ProductsProp } from '@/models/Products';
import { useFetchProductList } from '@/hooks/FetchAllProduct';
import Loader from '@/Util/Loader';
import Link from 'next/link';
import React from 'react'
import { AnimatedProduct } from '../Categories/AnimatedProduct';

const TrendingDetails= () => {
    const { products, isPending, error} = useFetchProductList<ProductsProp[]>(
        `http://localhost:3002/api/products?p=&limit=4`,
        ["products"],
      );

      if (error) {
        return <div>Error Fetching data...</div>;
      }
  return (
    <div className='flex flex-wrap w-full justify-center items-center gap-5 px-5'>
      {isPending && (
        <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center justify-items-center py-14 flex-1'>
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
              className="max-w-[290px] p-3 shadow-2xl rounded-xl text-start"
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

