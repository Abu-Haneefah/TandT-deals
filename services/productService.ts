import marketPlace from "@/utils/axiosConfig";
import { AxiosError } from "axios";

// --- Normalization Helper ---
const normalizeProduct = (p: any) => {
  if (!p) return null;

  // The core data is usually in 'product' or 'productId' or the object itself
  const details = p.product || p.productId || p;

  const normalized = {
    id: p.id || p._id || details.id || details._id,
    title: details.title || details.name || "Untitled Product",
    slug: details.slug || "",
    brand: details.brand || "",
    description: details.description || "",
    totalrating: details.totalrating || details.rating || 0,
    quantity: details.quantity || p.quantity || 0,

    images: Array.isArray(details.images)
      ? details.images.map((img: any) =>
          typeof img === "string" ? img : img.url,
        )
      : [],

    // PRICE FIX: Check top level, then details level, then vendor level
    price: p.price || details.price || p.vendorProducts?.[0]?.price || 0,

    salePrice:
      p.salePrice ||
      p.sale_price ||
      details.salePrice ||
      details.sale_price ||
      p.vendorProducts?.[0]?.salePrice ||
      0,

    vendor: p.vendor || details.vendor || null,
    colors: details.colors || [],
    tags: details.tags || [],
    category: details.category || null,
  };

  return normalized;
};

export interface ProductQuery {
  category?: string;
  subCategory?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export const productService = {
  getProductsBySubCategory: async ({
    subCategory,
    page = 1,
    limit = 40,
    sort,
  }: ProductQuery): Promise<any> => {
    try {
      const { data } = await marketPlace.get(
        `/products/category/${subCategory}`,
        {
          params: { page, limit, sort },
        },
      );

      // Handle both { data: { products: [] } } and { data: [] }
      const rawList =
        data?.data?.products || (Array.isArray(data?.data) ? data.data : []);

      return {
        products: rawList.map(normalizeProduct).filter(Boolean),
        total: data?.data?.total || rawList.length,
      };
    } catch (error) {
      const err = error as AxiosError;
      throw err.response?.data || "Failed to load sub-category products";
    }
  },

  getFlaggedProducts: async (
    flag: string,
    page = 1,
    limit = 10,
    sort?: string,
  ): Promise<any> => {
    try {
      const { data } = await marketPlace.get(`/products/flagged/${flag}`, {
        params: { page, limit, sort },
      });
      const rawList =
        data?.data?.products || (Array.isArray(data?.data) ? data.data : []);
      return {
        products: rawList.map(normalizeProduct).filter(Boolean),
      };
    } catch (error) {
      const err = error as AxiosError;
      throw err.response?.data || "Failed to load flagged products";
    }
  },

  getProductBySlug: async (slug: string): Promise<any> => {
    try {
      const { data } = await marketPlace.get(`/products/${slug}`);
      return normalizeProduct(data.data);
    } catch (error) {
      const err = error as AxiosError;
      throw err.response?.data || "Failed to load product details";
    }
  },
};
