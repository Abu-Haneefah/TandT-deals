import { productService } from "@/services/productService";
import { create } from "zustand";

interface ProductState {
  productsByFlag: Record<string, any[]>;
  productsBySubCategory: Record<string, any[]>;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  fetchFlaggedProducts: (params: {
    flag: string;
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
}

export const useProductStore = create<ProductState>((set) => ({
  productsByFlag: {},
  productsBySubCategory: {},
  isLoading: false,
  isError: false,
  errorMessage: "",

  fetchFlaggedProducts: async ({ flag, page, limit, sort }) => {
    set({ isLoading: true, isError: false });
    try {
      const data = await productService.getFlaggedProducts(
        flag,
        page,
        limit,
        sort,
      );
      // data is now { products: [...] } because of service update
      const productList = data.products || [];

      set((state) => ({
        productsByFlag: { ...state.productsByFlag, [flag]: productList },
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        isLoading: false,
        isError: true,
        errorMessage: "Failed to fetch flagged products",
      });
    }
  },

  fetchProductsBySubCategory: async ({ subCategory, page, limit, sort }) => {
    set({ isLoading: true, isError: false });
    try {
      const data = await productService.getProductsBySubCategory({
        subCategory,
        page,
        limit,
        sort,
      });
      // data is now { products: [...], total: X } because of service update
      const productList = data.products || [];

      set((state) => ({
        productsBySubCategory: {
          ...state.productsBySubCategory,
          [subCategory]: productList,
        },
        isLoading: false,
      }));
    } catch (error: any) {
      set({ isLoading: false, isError: true, errorMessage: error.message });
    }
  },
}));
