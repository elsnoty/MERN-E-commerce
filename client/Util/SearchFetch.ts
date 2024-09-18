import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchProduct = <T>(url: string, queryKey: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data; // Adjust this if your API response has a different structure
    }
  });

  // Check if data is an object containing the array
  const products = data && Array.isArray(data.products) ? data.products : [];

  return {
    ProductData: products as T, // Ensure the data is at least an empty array
    isLoading,
    error,
  };
};

export default useFetchProduct;
