import React from 'react'
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface OrderItemProps {
        productId: string;
        quantity: number;
        price: number;
        name: string;
        image: StaticImageData;
    }

const OrderItem = ({productId, name, price, quantity, image}: OrderItemProps) => {
  return (
            <div className="flex items-center p-2 border rounded-lg">
                <Link href={`/categories/${productId}`}>
                <Image
                src={image}
                alt={name}
                className="w-16 h-16 object-cover mr-4"
                width={400}
                height={300}
                />
                <div>
                <p className="font-medium">{name}</p>
                <p>Quantity: {quantity}</p>
                <p>Price: ${price}</p>
                </div>
                </Link>
            </div>
  )
}

export default OrderItem
