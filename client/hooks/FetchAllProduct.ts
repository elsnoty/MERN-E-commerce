import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchProductList = <T>(url: string, queryKey: (string | number)[]) => {
  const { data, isLoading, error } = useQuery<{ products: T; totalCount: number }>({
    queryKey: queryKey, 
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  return {
    products: data?.products || [],  
    totalCount: data?.totalCount,
    isPending: isLoading,
    error,
  };
};

const useFetchSingleProduct = <T>(url: string, queryKey: string) => {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: [queryKey, url],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  return {
    ProductData: data,
    isLoading, 
    error,
  };
};


export {useFetchProductList, useFetchSingleProduct};
