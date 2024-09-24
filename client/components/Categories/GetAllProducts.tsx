"use client";
import Link from "next/link";
import { ProductsProp } from "@/models/Products";
import { AnimatedProduct } from "./AnimatedProduct";
import Loader from "@/Util/Loader";
import { useState, useEffect } from "react";
import PaginationCompontent from "../ui/CustomPag";
import { useFetchProductList } from "@/hooks/FetchAllProduct";
import { useRouter, useSearchParams } from "next/navigation";

export default function AllProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const limit = 8;
  const currentPage = searchParams.get('p') ? parseInt(searchParams.get('p') as string, 10) : 1;
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const { ProductData, isPending, error, totalCount } = useFetchProductList<ProductsProp[]>(
    `http://localhost:3002/api/products?p=${page}&limit=${limit}`,
    ["products", page],
  );

  if (!totalCount) {
    return null;
  }
  
  const total = Math.ceil(totalCount / limit);
  
  const handlePage = (newPage: number) => {
    if (newPage >= 0 && newPage <= total) {
      router.push(`/categories?p=${newPage}`);
    }
  };

  if (error) {
    return <div>Error Fetching data...</div>;
  }
//   const handleFilter = ()=>{
    
//   }
//   console.log(
// ProductData.filter((e)=>ProductData.image && ProductData.image.length > 0 e.categories[0] === )
//   )

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {isPending ? (
          <Loader />
        ) : (
          ProductData?.map((product) => (
            <Link
              href={`/categories/${product._id}`}
              className="max-w-[290px] rounded-xl"
              key={product._id}
            >
              <AnimatedProduct item={product} />
            </Link>
          ))
        )}
      </div>
      <PaginationCompontent 
        page={page}
        totalPages={total}
        handleNext={handlePage}
      />
    </div>
  );
}
