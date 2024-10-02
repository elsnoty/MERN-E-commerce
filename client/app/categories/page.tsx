import AllProducts from '@/components/Categories/GetAllProducts'
import React, { Suspense } from 'react'

const Categories = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <AllProducts />
      </Suspense>
    </div>
  )
}

export default Categories
