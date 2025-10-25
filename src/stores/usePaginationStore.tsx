import { create } from "zustand";

interface PaginationState {
  page: number;
  query: string;
  setPage: (page: number) => void;
  setQuery: (query: string) => void;
}

export const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,
  query: "",

  setPage: (page: number) => set(() => ({ page })),
  setQuery: (query: string) => set(() => ({ query })),
}));
