import { productService } from "@/services/productService";
import { create } from "zustand";

interface ProductState {
  productsByFlag: Record<string, any[]>;
  productsByCategory: Record<string, any[]>;
  productsBySubCategory: Record<string, any[]>;
  productBySlug: any | null;
  filteredProducts: any[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;

  // Actions
  fetchFlaggedProducts: (params: {
    flag: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) => Promise<void>;
  fetchProductsByCategory: (params: {
    category: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) => Promise<void>;
  fetchProductsBySubCategory: (params: {
    subCategory: string;
    page?: number;
    limit?: number;
    sort?: string;
  }) => Promise<void>;
  fetchProductBySlug: (slug: string) => Promise<void>;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  productsByFlag: {},
  productsByCategory: {},
  productsBySubCategory: {},
  productBySlug: null,
  filteredProducts: [],
  isLoading: false,
  isError: false,
  errorMessage: "",

  clearError: () => set({ isError: false, errorMessage: "" }),

  fetchFlaggedProducts: async ({ flag, page, limit, sort }) => {
    set({ isLoading: true, isError: false });
    try {
      const data = await productService.getFlaggedProducts(
        flag,
        page,
        limit,
        sort,
      );
      set((state) => ({
        productsByFlag: {
          ...state.productsByFlag,
          [flag]: Array.isArray(data) ? data : data?.products || [],
        },
        isLoading: false,
      }));
    } catch (error: any) {
      set({ isLoading: false, isError: true, errorMessage: error.message });
    }
  },

  fetchProductsByCategory: async ({ category, page, limit, sort }) => {
    set({ isLoading: true, isError: false });
    try {
      const data = await productService.getProductsByCategory({
        category,
        page,
        limit,
        sort,
      });
      set((state) => ({
        productsByCategory: {
          ...state.productsByCategory,
          [category]: data.products || [],
        },
        isLoading: false,
      }));
    } catch (error: any) {
      set({ isLoading: false, isError: true, errorMessage: error.message });
    }
  },

  fetchProductsBySubCategory: async ({ subCategory, page, limit, sort }) => {
    // Check cache first to prevent redundant API calls
    if (get().productsBySubCategory[subCategory]) return;

    set({ isLoading: true, isError: false });
    try {
      const data = await productService.getProductsBySubCategory({
        subCategory,
        page,
        limit,
        sort,
      });
      set((state) => ({
        productsBySubCategory: {
          ...state.productsBySubCategory,
          [subCategory]: Array.isArray(data) ? data : data?.products || [],
        },
        isLoading: false,
      }));
    } catch (error: any) {
      set({ isLoading: false, isError: true, errorMessage: error.message });
    }
  },

  fetchProductBySlug: async (slug) => {
    set({ isLoading: true, isError: false, productBySlug: null });
    try {
      const data = await productService.getProductBySlug(slug);
      set({ productBySlug: data, isLoading: false });
    } catch (error: any) {
      set({ isLoading: false, isError: true, errorMessage: error.message });
    }
  },
}));
