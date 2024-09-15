"use client";
import { FetchAll } from "@/components/Util/FetchAllProduct";
import Image, { StaticImageData } from "next/image";
import { useQuery } from "@tanstack/react-query";

interface ProductsProp {
  id: string;
  name: string;
  price: number;
  image: StaticImageData[];
}

export default function Home() {
  const { data, isLoading, error } = useQuery<ProductsProp[]>({
    queryKey: ["product"],
    queryFn: FetchAll    
  }
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>Error fetching data</div>;
  return (
    <div>
      <h1>Home Page</h1>
      <div className="products-list">
        {data?.map((product) => (
          <div key={product.name} className="product-item">
            <h2>{product.id}</h2>
            <p>Price: ${product.price}</p>
            <Image
              src={product.image[0]}
              alt={product.name}
              width={450}
              height={400}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
