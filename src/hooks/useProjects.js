
import { useQuery } from '@tanstack/react-query';
import { queryDocuments } from '@/lib/firestore';

export function useProjects(limitCount = null) {
  return useQuery({
    queryKey: ['projects', limitCount],
    queryFn: () => queryDocuments('projects', [{ field: 'status', operator: '==', value: 'published' }], null, limitCount),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
