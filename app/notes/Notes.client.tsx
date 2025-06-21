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

  const { data } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

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

      {data?.notes?.length ? <NoteList notes={data.notes} /> : ''}

      {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
