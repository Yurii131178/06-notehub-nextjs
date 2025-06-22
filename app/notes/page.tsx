import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

const NotesPage = async () => {
  const queryClient = new QueryClient();

  const initialNotes = await fetchNotes('', 1);

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1],
    queryFn: () => Promise.resolve(initialNotes),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialNotes={initialNotes} />
    </HydrationBoundary>
  );
};

export default NotesPage;
