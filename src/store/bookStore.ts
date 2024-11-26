import { create } from 'zustand';
import { Review } from '../../types/type';

interface BookState {
  books:  Review | null;
  setBooks: (user: Review | null) => void;
}

export const useBookStore = create<BookState>((set) => ({
    books: null,
    setBooks: (books) => set({ books }),
}));
