import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface FetchOptions {
  headers?: Record<string, string>; 
  enabled?: boolean;           
}

const useFetchProductList = <T>(url: string, queryKey: (string | number)[]) => {
  const { data, isLoading, error } = useQuery<{ products: T; }>({
    queryKey: queryKey, 
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  return {
    products: data?.products || [], 
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

const useFetchReview = <T>(url: string, queryKey: string) => {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: [queryKey, url],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  return {
    rEview: data,
    isLoading, 
    error,
  };
};

const useFetchOrders = <T>(url: string, queryKey: string, options?: FetchOptions) => {
  const { headers, enabled } = options || {};

  const { data, isLoading, error } = useQuery<T>({
    queryKey: [queryKey, url],
    queryFn: async () => {
      const response = await axios.get(url, { headers });
      return response.data;
    },
    enabled,
  });

  return {
    orders: data,
    isLoading,
    error,
  };
};
export {useFetchProductList, useFetchSingleProduct, useFetchReview, useFetchOrders};
