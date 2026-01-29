
import { useQuery } from '@tanstack/react-query';
import { getCollection } from '@/lib/firestore';

export function useClienteleLogos() {
  return useQuery({
    queryKey: ['clientele'],
    queryFn: () => getCollection('clientele'),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
