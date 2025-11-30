import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7060';

interface UseProductOptions {
  productId: string;
  enabled?: boolean;
}

interface ProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  modelUrl: string;
  backgroundColor: string;
}

const fetchProduct = async (productId: string): Promise<ProductResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  return response.json();
};

const fetchProductIds = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/api/products/ids`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product IDs: ${response.statusText}`);
  }

  return response.json();
};

export const useProduct = ({ productId, enabled = true }: UseProductOptions) => {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    enabled: enabled && !!productId,
    select: (data): Product => ({
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      modelUrl: data.modelUrl,
      backgroundColor: data.backgroundColor,
    }),
  });
};

export const useProductIds = () => {
  return useQuery({
    queryKey: ['productIds'],
    queryFn: fetchProductIds,
  });
};

