import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductStore";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";

type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const getCategoryIcon = (title?: string): MaterialIconName => {
  if (!title) return "package-variant-closed";
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("phone")) return "cellphone";
  if (lowerTitle.includes("shoe")) return "shoe-sneaker";
  if (lowerTitle.includes("cloth")) return "tshirt-crew";
  if (lowerTitle.includes("food")) return "food-apple";
  return "package-variant-closed";
};

const BANNER_DATA = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800",
  },
];

const Home = () => {
  const { width } = useWindowDimensions();
  const bannerRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const {
    categories,
    loading: catLoading,
    fetchAllCategories,
  } = useCategoryStore();

  const {
    productsByFlag,
    isLoading: prodLoading,
    fetchFlaggedProducts,
  } = useProductStore();

  // Optimized flags for API compatibility
  const sections = [
    { title: "Flash Sales", flag: "isFlashSale" },
    { title: "New Arrivals", flag: "isNewArrival" },
    { title: "Best Sellers", flag: "isBestSeller" },
    { title: "Featured Products", flag: "isFeatured" },
  ];

  // Parallel data fetching for better performance
  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([
          fetchAllCategories(),
          ...sections.map((s) =>
            fetchFlaggedProducts({ flag: s.flag, limit: 10 }),
          ),
        ]);
      } catch (error) {
        console.error("Home initialization failed:", error);
      }
    };

    initializeData();
  }, []);

  // Auto-scrolling Banner Logic
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= BANNER_DATA.length) nextIndex = 0;
      bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const renderProductSection = (title: string, flag: string) => {
    const data = productsByFlag[flag] || [];

    const handleShowCategory = () => {
      router.navigate("/categories");
    };

    // Hide section only if loading is finished AND there is no data
    if (!prodLoading && data.length === 0) return null;

    return (
      <View key={flag} className="mt-8">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-lg font-bold text-gray-800">{title}</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/section/[name]",
                params: { name: flag },
              })
            }
          >
            <AntDesign name="arrow-right" size={22} color="#0a1128" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            marginBottom: 30,
          }}
          // Fallback key generation to prevent list crashes
          keyExtractor={(item, index) =>
            (item._id || item.id || `product-${flag}-${index}`).toString()
          }
          renderItem={({ item }) => (
            <View className="mr-3">
              <ProductCard product={item} />
            </View>
          )}
        />
      </View>
    );
  };

  const handleShowCategory = () => {
    router.push("/categories");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Top Info Bar */}
        <View className="bg-[#0a1128] p-3 items-end">
          <Text className="text-xs text-white">Hotline: +234 902 000 0070</Text>
        </View>

        {/* Search Bar */}
        <View className="bg-[#0a1128] flex-row items-center p-4">
          <TextInput
            placeholder="Search products..."
            placeholderTextColor="#9ca3af"
            className="bg-white p-3 rounded-l-lg flex-1 h-12"
          />
          <TouchableOpacity className="bg-[#a3cc39] h-12 w-12 items-center justify-center rounded-r-lg">
            <FontAwesome5 name="search" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Hero Banner Section */}
        <View className="mt-4">
          <FlatList
            ref={bannerRef}
            data={BANNER_DATA}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={{ width: width, paddingHorizontal: 16 }}>
                <Image
                  source={{ uri: item.url }}
                  style={{ width: "100%", height: 180, borderRadius: 16 }}
                  resizeMode="cover"
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Categories Section */}
        <View className="mt-8">
          <View className="flex flex-row justify-between p-2">
            <Text className="text-lg font-bold text-gray-800 px-4 mb-4">
              Shop by Category
            </Text>
            <TouchableOpacity onPress={handleShowCategory}>
              <AntDesign name="arrow-right" size={22} color="#0a1128" />
            </TouchableOpacity>
          </View>

          {catLoading ? (
            <ActivityIndicator color="#a3cc39" />
          ) : (
            <FlatList
              data={categories.filter((cat: any) => !cat.parentId)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  className="bg-gray-100 py-5 w-[85px] rounded-2xl items-center"
                  onPress={() =>
                    router.push({
                      pathname: "/categories",
                      params: { initialCategoryId: item.id || item._id },
                    })
                  }
                >
                  <MaterialCommunityIcons
                    name={getCategoryIcon(item.title)}
                    size={30}
                    color="#0a1128"
                  />
                  <Text
                    numberOfLines={1}
                    className="text-[10px] font-medium text-gray-700 mt-2 capitalize"
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => (item.id || item.id).toString()}
            />
          )}
        </View>

        {/* Dynamic Product Sections */}
        {sections.map((sec) => renderProductSection(sec.title, sec.flag))}

        {/* Loading Footer */}
        {prodLoading && (
          <View className="mt-10 items-center">
            <ActivityIndicator color="#a3cc39" size="large" />
            <Text className="text-gray-400 text-xs mt-2">
              Loading latest deals...
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
