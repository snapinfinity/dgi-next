import { useQuery } from '@tanstack/react-query';
import { queryDocuments } from '@/lib/firestore';

export function useProject(slug) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => { 
      if (!slug) return null;
      const docs = await queryDocuments('projects', [
        { field: 'slug', operator: '==', value: slug },
        { field: 'status', operator: '==', value: 'published' }
      ]);
      return docs[0] || null;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
