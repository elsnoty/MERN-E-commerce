export interface ProductsProp {
    _id: string;
    name: string;
    price: number;
    image: string[] | string;
    categories?: string[];
    discount:number;
  }
