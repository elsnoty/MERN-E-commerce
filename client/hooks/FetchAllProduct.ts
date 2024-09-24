import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchProductList = <T>(url: string, queryKey: (string | number)[]) => {
  const { data, isPending, error } = useQuery<{ products: T; totalCount?: number}>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  return {
    ProductData: data?.products || [],  // For product list
    totalCount: data?.totalCount,
    isPending,
    error,
  };
};
const useFetchSingleProduct = <T>(url: string, queryKey: string) => {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: [queryKey, url], // Ensure queryKey includes both a unique key and the URL
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  return {
    ProductData: data,
    isLoading,  // You can alias isLoading to isPending if preferred
    error,
  };
};


export {useFetchProductList, useFetchSingleProduct};
