// import { useState } from 'react';
// import { useQuery, keepPreviousData } from '@tanstack/react-query';
// import css from './App.module.css';
// import SearchBox from '@/components/SearchBox/SearchBox';
// import Pagination from '@/components/Pagination/Pagination';
// import NoteList from '@/components/NoteList/NoteList';
// import NoteModal from '@/components/NoteModal/NoteModal';
// import { fetchNotes, type FetchNotesResponse } from '@/lib/api';
// import { useDebounce } from 'use-debounce';

// export default function App() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [page, setPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [debouncedSearch] = useDebounce(search, 400);

//   const handleSearchChange = (newSearch: string) => {
//     setSearch(newSearch);
//     setPage(1);
//   };

//   const { data } = useQuery<FetchNotesResponse, Error>({
//     queryKey: ['notes', debouncedSearch, page],
//     queryFn: () => fetchNotes(debouncedSearch, page),
//     placeholderData: keepPreviousData,
//   });

//   return (
//     <div className={css.app}>
//       <header className={css.toolbar}>
//         <SearchBox value={search} onChange={handleSearchChange} />
//         {data && data.totalPages && data.totalPages > 1 && (
//           <Pagination
//             pageCount={data.totalPages}
//             currentPage={page}
//             onPageChange={setPage}
//           />
//         )}
//         <button className={css.button} onClick={() => setIsModalOpen(true)}>
//           Create note +
//         </button>
//       </header>

//       {data && data.notes && data.notes.length > 0 ? (
//         <NoteList notes={data.notes} />
//       ) : (
//         ''
//       )}

//       {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
//     </div>
//   );
// }

//////

import NotesClient from './Notes.client';

const NotesPage = () => {
  return <NotesClient />;
};

export default NotesPage;
