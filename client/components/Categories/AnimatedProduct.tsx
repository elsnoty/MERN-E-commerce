import { ProductsProp } from "@/models/Products";
import Image from "next/image";
import { motion } from "framer-motion";

export const AnimatedProduct = (props: { item: ProductsProp }) => {
  const { item } = props;

  // Calculate the discounted price if there is a discount
  const discountedPrice = item.discount > 0 ? item.price - (item.price * item.discount) / 100 : item.price;

  return (
    <motion.div
      className="p-4 border border-gray-300 rounded-lg shadow-md transition-shadow duration-200 "
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="relative w-full h-[300px]">
        <Image
          src={item.image[0]}
          alt={item.name}
          className="rounded-lg shadow-lg object-cover h-full"
          width={280}
          height={250}
          priority
        />
        {item.discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-semibold px-2 py-1 rounded">
            -{item.discount}%
          </span>
        )}
      </div>
      <h2 className="mt-2 text-lg font-semibold text-gray-800">
        <p className="overflow-hidden whitespace-nowrap text-ellipsis max-w-[290px]">
          {item.name}
        </p>
      </h2>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xl font-bold text-gray-900">
          ${discountedPrice.toFixed(2)}
        </p>
        {item.discount > 0 && (
          <p className="text-sm text-gray-500 line-through">
            ${item.price.toFixed(2)} 
          </p>
        )}
      </div>
    </motion.div>
  );
};
