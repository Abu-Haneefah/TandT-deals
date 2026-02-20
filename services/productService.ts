import marketPlace from "@/utils/axiosConfig";
import { AxiosError } from "axios";

// --- Interfaces for Product Data ---
export interface Product {
  id: string;
  title: string;
  slug: string;
  images: string[];
  description: string;
  price?: number;
  vendorProducts?: any[];
  category: {
    title: string;
    slug: string;
  };
}

export interface ProductQuery {
  category?: string; // Should be SLUG
  subCategory?: string; // Should be SLUG
  page?: number;
  limit?: number;
  sort?: string;
}

export const productService = {
  // 1. Fetch products by category or subcategory
  getProductsBySubCategory: async ({
    subCategory,
    page = 1,
    limit = 40,
    sort,
  }: ProductQuery): Promise<any> => {
    // IMPORTANT: Verify in logs if 'subCategory' is a slug (e.g., "red") or UUID.
    console.log(`🔍 [ProductService] Requesting Category: ${subCategory}`);

    try {
      const { data } = await marketPlace.get(
        `/products/category/${subCategory}`,
        {
          params: { page, limit, sort },
        },
      );

      // RAW LOGGING: This will show you exactly what the backend sends
      console.log(
        `✅ [ProductService] Raw Response for ${subCategory}:`,
        JSON.stringify(data, null, 2),
      );

      // Per your web log, products are inside data.data.products
      return data?.data || { products: [], total: 0 };
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        `❌ [ProductService] Error for ${subCategory}:`,
        JSON.stringify(err.response?.data || err.message, null, 2),
      );
      throw err.response?.data || "Failed to load sub-category products";
    }
  },

  // 2. Fetch flagged products (Featured, Flash Sale, etc.)
  getFlaggedProducts: async (
    flag: string,
    page = 1,
    limit = 10,
    sort?: string,
  ): Promise<any> => {
    console.log(`🔍 [ProductService] Fetching Flag: ${flag}`);
    try {
      const { data } = await marketPlace.get(`/products/flagged/${flag}`, {
        params: { page, limit, sort },
      });
      console.log(
        `✅ [ProductService] Flagged Raw:`,
        JSON.stringify(data.data, null, 2),
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        `❌ [ProductService] Flag error:`,
        err.response?.data || err.message,
      );
      throw err.response?.data || "Failed to load flagged products";
    }
  },

  // 3. Fetch single product details by slug
  getProductBySlug: async (slug: string): Promise<Product> => {
    console.log(`🔍 [ProductService] Fetching Slug: ${slug}`);
    try {
      const { data } = await marketPlace.get(`/products/${slug}`);
      console.log(
        `✅ [ProductService] Product Raw:`,
        JSON.stringify(data.data, null, 2),
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      console.error(
        `❌ [ProductService] Slug error:`,
        err.response?.data || err.message,
      );
      throw err.response?.data || "Failed to load product details";
    }
  },

  // 4. General Category Fetch
  getProductsByCategory: async ({
    category,
    page = 1,
    limit = 40,
    sort,
  }: ProductQuery): Promise<any> => {
    console.log(`🔍 [ProductService] Fetching Category: ${category}`);
    try {
      const { data } = await marketPlace.get(`/products/category/${category}`, {
        params: { page, limit, sort },
      });
      console.log(
        `✅ [ProductService] Category Raw:`,
        JSON.stringify(data.data, null, 2),
      );
      return data.data;
    } catch (error) {
      const err = error as AxiosError;
      throw err.response?.data || "Failed to load category products";
    }
  },
};
