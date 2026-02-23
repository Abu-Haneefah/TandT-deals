import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductStore";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LocalCategory {
  id: string;
  title: string;
  parentId: string | null;
  icon: string;
  slug: string;
}

const Categories = () => {
  const router = useRouter();
  const { initialCategoryId } = useLocalSearchParams();
  const { width } = useWindowDimensions();
  const sidebarWidth = width * 0.28;

  const {
    categories,
    loading: catLoading,
    fetchAllCategories,
  } = useCategoryStore() as unknown as {
    categories: LocalCategory[];
    loading: boolean;
    fetchAllCategories: () => void;
  };

  const {
    productsBySubCategory,
    fetchProductsBySubCategory,
    isLoading: prodLoading,
  } = useProductStore();

  const [selectedMainId, setSelectedMainId] = useState<string | null>(null);
  const [selectedSubSlug, setSelectedSubSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const mainCats = categories.filter((c) => !c.parentId);
    if (mainCats.length > 0) {
      if (initialCategoryId) {
        setSelectedMainId(initialCategoryId as string);
      } else if (!selectedMainId) {
        setSelectedMainId(mainCats[0].id);
      }
    }
  }, [categories, initialCategoryId]);

  useEffect(() => {
    if (!selectedMainId) return;

    const subs = categories.filter((cat) => cat.parentId === selectedMainId);
    if (subs.length > 0) {
      const firstSub = subs[0];
      setSelectedSubSlug(firstSub.slug);
      fetchProductsBySubCategory({ subCategory: firstSub.slug });
    } else {
      setSelectedSubSlug(null);
    }
  }, [selectedMainId]);

  const mainCategories = categories.filter((cat) => !cat.parentId);
  const subCategories = categories.filter(
    (cat) => cat.parentId === selectedMainId,
  );

  const getProducts = (): any[] => {
    const data = productsBySubCategory[selectedSubSlug || ""];
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "object" && "products" in data) {
      return (data as any).products;
    }
    return [];
  };

  const currentProducts = getProducts();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity className="mr-4" onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#0a1128" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#0a1128]">
          Store Categories
        </Text>
      </View>

      <View className="flex-1 flex-row">
        {/* Left Sidebar */}
        <View
          style={{ width: sidebarWidth }}
          className="bg-gray-50 border-r border-gray-100"
        >
          {catLoading ? (
            <ActivityIndicator className="mt-10" color="#a3cc39" />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {mainCategories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setSelectedMainId(cat.id)}
                  className={`py-5 px-3 border-l-4 ${
                    selectedMainId === cat.id
                      ? "bg-white border-[#a3cc39]"
                      : "border-transparent"
                  }`}
                >
                  <Text
                    className={`text-[11px] font-bold capitalize ${selectedMainId === cat.id ? "text-[#a3cc39]" : "text-gray-500"}`}
                  >
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>

        {/* Right Content */}
        <View className="flex-1 bg-white">
          <View className="h-12 border-b border-gray-50">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-2"
            >
              {subCategories.map((sub) => (
                <TouchableOpacity
                  key={sub.id}
                  onPress={() => {
                    setSelectedSubSlug(sub.slug);
                    fetchProductsBySubCategory({ subCategory: sub.slug });
                  }}
                  className={`justify-center px-4 mr-2 ${selectedSubSlug === sub.slug ? "border-b-2 border-[#a3cc39]" : ""}`}
                >
                  <Text
                    className={`text-[11px] font-bold ${selectedSubSlug === sub.slug ? "text-[#a3cc39]" : "text-gray-400"}`}
                  >
                    {sub.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <ScrollView
            className="flex-1 p-3"
            showsVerticalScrollIndicator={false}
          >
            {prodLoading ? (
              <ActivityIndicator className="mt-20" color="#a3cc39" />
            ) : (
              <View className="flex-row flex-wrap justify-between">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product: any) => {
                    // EXACT SAME PRICE LOGIC AS PRODUCTCARD
                    const displayPrice =
                      product.salePrice || product.price || 0;

                    return (
                      <TouchableOpacity
                        key={product.id || product._id}
                        onPress={() =>
                          router.push({
                            pathname: "/[products]",
                            params: { products: product.slug },
                          })
                        }
                        className="w-[48%] bg-white mb-4 rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                      >
                        <Image
                          source={{
                            uri:
                              product.images?.[0] ||
                              "https://via.placeholder.com/150",
                          }}
                          className="w-full h-32 bg-gray-50"
                          resizeMode="contain"
                        />
                        <View className="p-2">
                          <Text
                            className="text-[11px] font-medium text-gray-800"
                            numberOfLines={1}
                          >
                            {product.title}
                          </Text>
                          <Text className="text-sm font-bold text-[#0a1128] mt-1">
                            ₦{displayPrice.toLocaleString()}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <View className="w-full items-center mt-20">
                    <Text className="text-gray-400 text-xs">
                      No products found.
                    </Text>
                  </View>
                )}
              </View>
            )}
            <View className="h-10" />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Categories;
