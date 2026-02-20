import { create } from "zustand";
import { Category, categoryService } from "../services/categoryService";

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchAllCategories: () => Promise<void>;
  fetchCategoriesWithSubs: () => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchAllCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await categoryService.getAllCategories();
      set({ categories: data, loading: false });
    } catch (err: any) {
      set({ error: err.toString(), loading: false });
    }
  },

  fetchCategoriesWithSubs: async () => {
    set({ loading: true, error: null });
    try {
      const data = await categoryService.getCategoriesWithSubs();
      set({ categories: data, loading: false });
    } catch (err: any) {
      set({ error: err.toString(), loading: false });
    }
  },

  fetchCategoryById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await categoryService.getCategoryById(id);
      set({ currentCategory: data, loading: false });
    } catch (err: any) {
      set({ error: err.toString(), loading: false });
    }
  },
}));
