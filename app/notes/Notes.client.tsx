'use client';

import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import NoteModal from '@/components/NoteModal/NoteModal';
import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
import { useDebounce } from 'use-debounce';

export default function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 400);

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };

  const { data, isLoading, error } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, page], // Ключ запиту (має відповідати prefetchQuery)
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error) {
    console.error('Error fetching notes:', error);
    return <p>Could not fetch the list of notes. {error.message}</p>;
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {(data?.totalPages ?? 0) > 1 && (
          <Pagination
            pageCount={data?.totalPages ?? 0}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* Перевіряємо, чи є дані та нотатки, перш ніж рендерити NoteList */}
      {data?.notes?.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>No notes found.</p> // Можна додати іншу розмітку, якщо нотаток немає
      )}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
