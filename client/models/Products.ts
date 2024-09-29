import { StaticImageData } from "next/image";

export interface ProductsProp {
    _id: string;
    name: string;
    price: number;
    image: string[] | string;
    categories: string[];
    discount:number;
    size: string[];
    description: string;
  }

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

export interface ProductOrderProp {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: StaticImageData;
  size: string;
}