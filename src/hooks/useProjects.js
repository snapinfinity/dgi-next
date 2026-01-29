
import { useQuery } from '@tanstack/react-query';
import { queryDocuments } from '@/lib/firestore';

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => queryDocuments('projects', [{ field: 'status', operator: '==', value: 'published' }]),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
