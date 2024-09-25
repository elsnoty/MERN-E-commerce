import Link from "next/link";
import { ProductsProp } from "@/models/Products";
import { AnimatedProduct } from "./AnimatedProduct";

interface ProductGridProps {
  products: ProductsProp[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          href={`/categories/${product._id}`}
          className="max-w-[290px] rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
          key={product._id}
        >
          <AnimatedProduct item={product} />
        </Link>
      ))}
    </div>
  );
}
