import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api'; // Ваша функція для отримання нотаток

// Компонент сторінки має бути async, оскільки ми попередньо завантажуємо дані
const NotesPage = async () => {
  const queryClient = new QueryClient();

  // Попередньо завантажуємо початковий список нотаток.
  // QueryKey ('notes', '', 1) має відповідати початковому стану в NotesClient.tsx
  // (тобто без пошуку та перша сторінка)
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1], // Ключ, який буде використовуватися на клієнті
    queryFn: () => fetchNotes('', 1), // Викликаємо API для отримання першої сторінки нотаток
  });

  return (
    // HydrationBoundary передає попередньо завантажені дані з сервера на клієнт.
    // NotesClient тепер отримає дані з цього кешу.
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Передаємо NotesClient без пропсів, оскільки дані вже в кеші React Query. */}
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;
