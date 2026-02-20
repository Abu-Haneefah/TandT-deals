import marketPlace from "@/utils/axiosConfig";
import { AxiosError } from "axios";

export interface Category {
  id: string;
  name: string;
  image?: string;
  subCategories?: any[]; // Replace with specific interface if available
}

export const categoryService = {
  // 1. Get all categories
  getAllCategories: async (): Promise<Category[]> => {
    console.log("🔍 Fetching all categories...");
    try {
      const { data } = await marketPlace.get("category");
      console.log("✅ Categories fetched successfully:", data.data, "items");
      return data.data; // Assuming your API returns { success: true, data: [...] }
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        "❌ Get all categories error:",
        err.response?.data || err.message,
      );
      throw err.response?.data || "Failed to load categories";
    }
  },

  // 2. Get a single category by ID
  getCategoryById: async (id: string): Promise<Category> => {
    console.log(`🔍 Fetching category details for ID: ${id}`);
    try {
      const { data } = await marketPlace.get(`category/${id}`);
      console.log("✅ Category detail received:", data.data);
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        `❌ Get category ${id} error:`,
        err.response?.data || err.message,
      );
      throw err.response?.data || "Failed to load category details";
    }
  },

  // 3. Get all categories with their subcategories
  getCategoriesWithSubs: async (): Promise<Category[]> => {
    console.log("🔍 Fetching categories with sub-categories...");
    try {
      const { data } = await marketPlace.get("category/with-subs/all");
      // Matching your Redux logic: data.data.data
      const result = data?.data?.data || data?.data || [];
      console.log("✅ Categories with subs fetched:", result, "items");
      return result;
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        "❌ Get categories with subs error:",
        err.response?.data || err.message,
      );
      throw err.response?.data || "Failed to load sub-categories";
    }
  },
};
