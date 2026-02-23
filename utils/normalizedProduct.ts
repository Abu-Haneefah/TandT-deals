// utils/normalizeProduct.ts
export const normalizeProduct = (p: any) => {
  // If the product details are nested inside 'productId' (common in flagged/cart responses)
  const base = p.productId || p;

  // Find the price: check salePrice, then price, then vendor arrays
  const price =
    base.salePrice ||
    base.sale_price ||
    base.price ||
    base.vendorProducts?.[0]?.sale_price ||
    base.vendorProducts?.[0]?.price ||
    0;

  return {
    ...base,
    id: base._id || base.id || p.id,
    title: base.title || base.name || "Unknown Product",
    price: base.price || price,
    salePrice: price,
    images: Array.isArray(base.images) ? base.images : [],
    slug: base.slug || "",
  };
};
