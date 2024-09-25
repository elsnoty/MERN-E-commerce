"use client";
import { useEffect } from "react";
import { ProductsProp } from "@/models/Products";
import Loader from "@/Util/Loader";
import PaginationComponent from "../ui/CustomPag";
import { useFetchProductList } from "@/hooks/FetchAllProduct";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import FilterSide from "./FilterSide";
import { selectProducts, setProducts } from "@/store/ProductSlice";
import ProductGrid from "./ProductGrid";

export default function AllProducts() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get selected categories from query (it could be a comma-separated string)
  const categoryFilter = searchParams.get("category")?.split(",") || [];
  const currentPage = searchParams.get("p") ? parseInt(searchParams.get("p") as string, 10) : 1;

  const limit = 8;

  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  // Fetch product data
  const { products: fetchedProducts, isPending, error } = useFetchProductList<ProductsProp[]>(
    `http://localhost:3002/api/products`,
    ["products"]
  );

  // Dispatch products to Redux store when data is fetched
  useEffect(() => {
    if (fetchedProducts.length > 0) {
      dispatch(setProducts(fetchedProducts));
    }
  }, [fetchedProducts, dispatch]);


  if (error) {
    return <div className="text-red-500">Error Fetching data...</div>;
  }

  const filteredProducts = categoryFilter.length
    ? products.filter(product =>
        product.categories?.some(category => categoryFilter.includes(category.toLowerCase()))
      )
    : products;

  const total = Math.ceil(filteredProducts.length / limit);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * limit, currentPage * limit);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total) {
      // Navigate to new page with the same category filters
      const categoryQuery = categoryFilter.length ? `category=${categoryFilter.join(',')}` : '';
      router.push(`/categories?${categoryQuery}&p=${newPage}`);
    }
  };

  return (

    <div className="p-4 flex justify-between gap-3">
      <FilterSide />
      <div className="flex-1">
        {isPending ?
        (
        <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:justify-center justify-items-center py-14 flex-1'>
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        </div>
        ):
        <ProductGrid products={paginatedProducts} />
      }
        <PaginationComponent
          page={currentPage}
          totalPages={total}
          handleNext={handlePageChange}
        />
      </div>
    </div>

  );
}
