import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { ProductOrderProp } from '@/models/Products';


const OrderItem = ({productId, name, price, quantity, image, size}: ProductOrderProp) => {
  return (
            <div className="flex items-center p-2 border rounded-lg">
                <Link href={`/categories/${productId}`}>
                <Image
                src={image}
                alt={`${name}`}
                className="w-16 h-16 object-cover mr-4"
                width={400}
                height={300}
                />
                <div>
                <p className="font-medium">{name}</p>
                <p>Quantity: {quantity}</p>
                <p>Price: ${price}</p>
                <p>Size: {size}</p>
                </div>
                </Link>
            </div>
  )
}

export default OrderItem
