// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { fetchNoteById } from '@/lib/api';

// interface NoteDetailsClientProps {
//   noteId: string;
// }

// export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
//   const {
//     data: note,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ['note', noteId],
//     queryFn: () => fetchNoteById(noteId),
//   });

//   if (isLoading) return <p>Loading note...</p>;
//   if (error || !note) return <p>Note not found.</p>;

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>{note.title}</h1>
//       <p>{note.content}</p>
//       <span
//         style={{
//           display: 'inline-block',
//           marginTop: '1rem',
//           padding: '0.25rem 0.5rem',
//           backgroundColor: '#eee',
//           borderRadius: '4px',
//         }}
//       >
//         #{note.tag}
//       </span>
//     </div>
//   );
// }
//////////////////////////////////

'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import css from './NoteDetails.module.css';

export default function NoteDetailsClient() {
  const { id } = useParams();
  const noteId = id as string; // Ensure noteId is a string

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  // 🟡 Стани:
  if (isLoading) {
    return <p className={css.content}>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p className={css.content}>Something went wrong.</p>;
  }

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.editBtn}>Edit note</button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
////////// виправляємо косяк в пейджі id, УВАГА, цей файл був робочий!!! ////////////////
