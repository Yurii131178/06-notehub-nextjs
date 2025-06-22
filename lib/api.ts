import axios, { type AxiosResponse } from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

if (!TOKEN) {
  throw new Error('❌NEXT_PUBLIC_NOTEHUB_TOKEN is not defined❌');
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export type CreateNoteTodo = {
  title: string;
  content: string;
  tag: Note['tag'];
};

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number = 12,
): Promise<FetchNotesResponse> => {
  const params: FetchNotesParams = {
    page,
    perPage,
    search: search || undefined,
  };
  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get(
    '',
    { params },
  );
  return response.data;
};

export const createNote = async (note: CreateNoteTodo): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post('', note);
  return response.data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.delete(`/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.get(`/${id}`);
  return response.data;
};
