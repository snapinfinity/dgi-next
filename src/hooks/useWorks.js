
import { useQuery } from '@tanstack/react-query';
import { getCollection } from '@/lib/firestore';

export function useWorks() {
  return useQuery({
    queryKey: ['works'],
    queryFn: () => getCollection('works'),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
