
import { useQuery } from '@tanstack/react-query';
import { getCollection } from '@/lib/firestore';

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: () => getCollection('services'),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
