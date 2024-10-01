import Link from "next/link";
import { ProductsProp } from "@/models/Products";
import { AnimatedProduct } from "./AnimatedProduct";

interface ProductGridProps {
  products: ProductsProp[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
<div className="grid grid-cols-4 gap-y-3 max-CU1S:grid-cols-3 max-xl:grid-cols-2 
max-lg:grid-cols-3 max-CU2S:grid-cols-2 max-sm:grid-cols-1 place-items-center mb-7">
      {products.map((product) => (
        <Link
          href={`/categories/${product._id}`}
          className="max-w-[290px] rounded-xl bg-white shadow-lg"
          key={product._id}
        >
          <AnimatedProduct item={product} />
        </Link>
      ))}
    </div>
  );
}
