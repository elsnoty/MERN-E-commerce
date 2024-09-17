import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchProduct = <T>(url: string, queryKey: string) => {
  const { data, isPending, error } = useQuery<T>({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    }
  });

  return {
    ProductData: data, // Ensure the data is at least an empty array
    isPending,
    error,
  };
};

export default useFetchProduct;
