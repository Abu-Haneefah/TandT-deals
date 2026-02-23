import { productService } from "@/services/productService";
import { useProductStore } from "@/store/useProductStore";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductDetails = () => {
  const { products: slug } = useLocalSearchParams();
  const router = useRouter();

  const { productsBySubCategory, fetchProductsBySubCategory } =
    useProductStore();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        if (slug) {
          const data = await productService.getProductBySlug(slug as string);
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setMainImage(data.images[0]);
          }

          if (data.category?.slug || data.category) {
            const catSlug = data.category?.slug || data.category;
            fetchProductsBySubCategory({ subCategory: catSlug });
          }
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#a3cc39" />
      </View>
    );

  if (error || !product)
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <Text className="text-gray-500 mb-4">Product not found</Text>
        <TouchableOpacity
          className="bg-[#a3cc39] px-6 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );

  // Main Product Price Logic
  const displayPrice =
    product.salePrice > 0 ? product.salePrice : product.price;
  const hasDiscount =
    product.salePrice > 0 && product.salePrice < product.price;

  // Filter related products (exclude current)
  const categoryKey = product.category?.slug || product.category;
  const relatedProducts = (productsBySubCategory[categoryKey] || [])
    .filter((p: any) => p.slug !== slug)
    .slice(0, 10);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex gap-2 flex-row items-center"
        >
          <AntDesign name="arrow-left" size={24} color="black" />
          <Text className="text-[10px] text-gray-400">Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row bg-[#F8F8F8] p-4">
          <View className="gap-2 mr-4">
            {product.images?.map((img: string, i: number) => (
              <TouchableOpacity
                key={i}
                onPress={() => setMainImage(img)}
                className={`p-1 rounded bg-white border ${mainImage === img ? "border-[#a3cc39]" : "border-gray-200"}`}
              >
                <Image
                  source={{ uri: img }}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-1 relative">
            <View className="absolute top-0 right-0 z-10 bg-[#a3cc39] px-2 py-1 rounded">
              <Text className="text-white text-[10px] font-bold uppercase">
                {product.condition || "New"}
              </Text>
            </View>
            <Image
              source={{ uri: mainImage }}
              className="w-full h-72"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="p-4">
          <Text className="text-xl font-bold text-gray-800">
            {product.title}
          </Text>
          <Text className="text-gray-500 text-xs mt-2 leading-5">
            {product.description}
          </Text>

          <View className="flex-row items-center mt-4 gap-2">
            <Text className="text-xl font-bold">
              ₦{displayPrice?.toLocaleString()}
            </Text>
            {hasDiscount && (
              <Text className="text-gray-400 line-through text-sm">
                ₦{product.price?.toLocaleString()}
              </Text>
            )}
          </View>

          <View className="flex-row items-center mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <AntDesign
                key={s}
                name="star"
                size={14}
                color={s <= (product.totalrating || 5) ? "#a3cc39" : "#D1D5DB"}
              />
            ))}
            <Text className="text-gray-500 text-xs ml-2">
              {product.ratings?.length || 0} Reviews
            </Text>
          </View>

          {product.colors && product.colors.length > 0 && (
            <>
              <Text className="font-bold mt-6 mb-3">Color</Text>
              <View className="flex-row gap-3">
                {product.colors.map((color: string, index: number) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(index)}
                    style={{ backgroundColor: color }}
                    className={`w-10 h-10 rounded-full ${selectedColor === index ? "border-4 border-gray-200" : ""}`}
                  />
                ))}
              </View>
            </>
          )}

          <View className="flex-row items-center mt-8 gap-3">
            <TouchableOpacity className="border border-gray-200 p-3 rounded-lg">
              <Ionicons name="swap-horizontal" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-200 p-3 rounded-lg">
              <Ionicons name="heart-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-[#a3cc39] py-4 rounded-lg flex-row justify-center items-center">
              <Text className="text-white font-bold mr-2">Add to cart</Text>
              <AntDesign name="shopping-cart" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 text-xs mt-6">
            <Text className="font-bold text-gray-600">Tags: </Text>
            {Array.isArray(product.tags) ? product.tags.join(", ") : "General"}
          </Text>
        </View>

        <View className="flex-row border-b border-gray-100 px-4 mt-4">
          <TouchableOpacity className="border-b-2 border-black pb-2 mr-6">
            <Text className="font-bold">Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="pb-2">
            <Text className="text-gray-400">Reviews</Text>
          </TouchableOpacity>
        </View>

        <View className="p-4">
          <Text className="font-bold text-lg mb-4">Product Specifications</Text>
          <View className="gap-y-2">
            <Text className="text-gray-500 text-xs">
              <Text className="font-bold text-gray-700">Brand: </Text>
              {product.brand || "Generic"}
            </Text>
            <Text className="text-gray-500 text-xs">
              <Text className="font-bold text-gray-700">Category: </Text>
              {product.category?.title || "Electronics"}
            </Text>
            <Text className="text-gray-500 text-xs">
              <Text className="font-bold text-gray-700">
                Stock Availability:{" "}
              </Text>
              {product.quantity > 0 ? "In Stock" : "Out of Stock"}
            </Text>
          </View>
        </View>

        <View className="bg-[#0A1128] mx-4 p-4 rounded-t-xl flex-row items-center mt-4">
          <MaterialIcons name="local-shipping" size={20} color="#a3cc39" />
          <Text className="text-white font-bold ml-2">Delivery Options</Text>
        </View>
        <View className="mx-4 bg-white border-x border-b border-gray-100 p-4 rounded-b-xl mb-6">
          <View className="flex-row justify-between mb-4 bg-gray-50 p-3 rounded-lg">
            <View>
              <Text className="font-bold text-gray-800 text-xs">
                Standard Delivery
              </Text>
              <Text className="text-gray-400 text-[10px]">
                3-5 business days
              </Text>
            </View>
            <Text className="font-bold">₦1,500</Text>
          </View>
          <View className="gap-y-1">
            <Text className="text-[10px] text-gray-400">
              • Tracking information provided
            </Text>
            <Text className="text-[10px] text-gray-400">
              • Signature required for delivery
            </Text>
          </View>
        </View>

        <View className="mx-4 bg-white border border-gray-100 p-4 rounded-xl mb-10">
          <Text className="font-bold text-gray-800 mb-4">
            Seller Information
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-lg">
              {product.vendor?.businessName ||
                product.vendor?.fullname ||
                "Verified Seller"}
            </Text>
            <AntDesign name="check-circle" size={18} color="#a3cc39" />
          </View>
          <View className="flex-row justify-between mt-4">
            <View>
              <Text className="text-gray-400 text-[10px]">Vendor Contact:</Text>
              <Text className="font-bold text-xs">
                {product.vendor?.phone || "N/A"}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[10px]">Email:</Text>
              <Text className="font-bold text-xs">
                {product.vendor?.email || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Updated "You might also like" Section */}
        {relatedProducts.length > 0 && (
          <View className="mb-10">
            <Text className="font-bold text-lg px-4 mb-4">
              You might also like
            </Text>
            <FlatList
              data={relatedProducts}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id || item._id}
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => {
                // Apply the same price fallback logic here
                const itemPrice =
                  item.salePrice > 0 ? item.salePrice : item.price;

                return (
                  <TouchableOpacity
                    onPress={() => router.push(`/${item.slug}`)}
                    className="mr-4 w-40 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm"
                  >
                    <Image
                      source={{ uri: item.images?.[0] }}
                      className="w-full h-32 bg-gray-50"
                      resizeMode="contain"
                    />
                    <View className="p-2">
                      <Text
                        className="text-[11px] font-medium text-gray-800"
                        numberOfLines={1}
                      >
                        {item.title}
                      </Text>
                      <Text className="text-sm font-bold text-[#0A1128] mt-1">
                        {/* Only show price if it's actually greater than 0 */}
                        {itemPrice > 0
                          ? `₦${itemPrice.toLocaleString()}`
                          : "Contact for Price"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
