"use client";
import { ProductsProp } from "@/models/Products";
import useFetchProduct from "@/Util/FetchAllProduct";
import Image from "next/image";



const ProductDetails = ({params}: {params: {id:string}}) => {
  const {ProductData, isPending, error} = useFetchProduct<ProductsProp>(
    `http://localhost:3002/api/products/${params.id}`,
    'product',
  )
  if (isPending) return <div>Loading...</div>;

  if (error) return <div>Error fetching product details...</div>;

  if (!ProductData) {
    return <div>error411</div>
  }
  return (
    <div>
      <h2>{ProductData.name}</h2>
      <p>Price: ${ProductData.price}</p>
      {ProductData.image && ProductData.image.length > 0 && (
        <Image
          src={ProductData.image[0]}
          alt={ProductData.name}
          width={450}
          height={400}
        />
      )}
    </div>
  );
};

export default ProductDetails;
