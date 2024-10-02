"use client"
import { ProductsProp } from "@/models/Products";
import { useFetchSingleProduct } from "@/hooks/FetchAllProduct";
import ProductDProp from "./ProductDProp";
import style from './style.module.css'

const ProductDetails = ({ params }: { params: { id: string } }) => {
  const { ProductData, isLoading, error } = useFetchSingleProduct<ProductsProp>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${params.id}`,
    'product',
  );

  if (isLoading) {
    return (
      <div className={`${style.LoaderContainer}`}>
        <span className={`${style.loader}`}></span>
      </div>
    );
  }

  if (error) return <div>Error fetching product details...</div>;

  if (!ProductData) {
    return <div>No product found.</div>;
  }
  console.log("Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

  return (
    <div>
      <ProductDProp item={ProductData}/>
    </div>
  );
};

export default ProductDetails;
