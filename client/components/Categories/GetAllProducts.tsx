"use client";
import Link from "next/link";
import useFetchProduct from "@/Util/FetchAllProduct";
import { ProductsProp } from "@/models/Products";
import { AnimatedProduct } from "./AnimatedProduct";

export default function AllPorducts() {

  const {ProductData, isPending} = useFetchProduct<ProductsProp[]>(
    "http://localhost:3002/api/products",
    'products',
  )

  if (isPending) {
    return <div>Loading...</div>;
  }
  
  if (!ProductData) {
    return <div>Sorry, SomeThing Went Wrong</div>
  }
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {ProductData?.map((product) => (
        <Link href={`/categories/${product._id}`} className="" >
          <AnimatedProduct item={product} key={product._id}/>
        </Link>
      ))}
    </div>
  );
}
