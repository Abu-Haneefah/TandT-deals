import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { ComponentProps, useEffect, useRef, useState } from "react";
import {
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
import ProductCard, { Product } from "../components/ProductCard";

// --- Types & Interfaces ---
type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface Category {
  id: string;
  name: string;
  icon: MaterialIconName;
}

// --- Mock Data ---
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

const CATEGORIES: Category[] = [
  { id: "4", name: "Phones", icon: "cellphone" },
  { id: "5", name: "Fashion", icon: "tshirt-crew" },
  { id: "6", name: "Cameras", icon: "camera" },
  { id: "7", name: "Accessories", icon: "headphones" },
  { id: "8", name: "Computers", icon: "monitor" },
  { id: "9", name: "Gaming", icon: "controller-classic" },
];

const PRODUCTS: Product[] = [
  {
    id: "iphone-12",
    name: "Apple iPhone 12 Pro, 128GB, Silver - Fully Unlocked",
    price: "400,000",
    oldPrice: "450,000",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-finish-unselect-gallery-1-202207?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1662129028441",
    rating: 4,
    reviews: 20,
    store: "Xclicopedia Store",
  },
  {
    id: "watch-7",
    name: "Smart Watch Series 7 - Midnight Aluminum Case",
    price: "299.00",
    oldPrice: "399.00",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500",
    rating: 5,
    reviews: 124,
    store: "Gadget Hub",
  },
];

// --- Fixed Component: ProductSection ---
const ProductSection = ({
  title,
  data,
  onViewMore,
}: {
  title: string;
  data: Product[];
  onViewMore: () => void;
}) => (
  <View className="mt-8">
    <View className="flex-row justify-between items-center px-4 mb-4">
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
      {/* FIXED: Added the onPress prop here */}
      <TouchableOpacity className="flex-row items-center" onPress={onViewMore}>
        <Text className="text-gray-500 text-sm mr-1">View more</Text>
        <AntDesign name="arrow-right" size={16} color="gray" />
      </TouchableOpacity>
    </View>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      renderItem={({ item }) => <ProductCard product={item} />}
      keyExtractor={(item, index) => item.id + index}
    />
  </View>
);

const Home = () => {
  const { width } = useWindowDimensions();
  const bannerRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("New Arrival");
  const router = useRouter();

  const CARD_WIDTH = width * 0.85;
  const GAP = 10;
  const spacer = (width - CARD_WIDTH) / 2;

  const handleViewSection = (sectionName: string) => {
    router.push({
      pathname: "/section/[name]",
      params: { name: sectionName.toLowerCase().replace(/\s+/g, "-") },
    });
  };

  const handleViewCategory = () => {
    router.navigate("/categories");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= BANNER_DATA.length) nextIndex = 0;
      bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hotline Header */}
        <View className="bg-[#0a1128] w-full p-3 items-end">
          <Text className="text-xs text-white">
            <Text className="text-[#a3cc39]">Hotline: </Text> +234 902 000 0070
          </Text>
        </View>

        {/* Search Bar */}
        <View className="bg-[#0a1128] flex-row items-center p-4">
          <TextInput
            placeholder="Search products and services"
            placeholderTextColor="#9ca3af"
            className="bg-white p-3 rounded-l-lg flex-1 h-12"
          />
          <TouchableOpacity className="bg-[#a3cc39] h-12 w-12 items-center justify-center rounded-r-lg">
            <FontAwesome5 name="search" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        <View className="mt-4">
          <FlatList
            ref={bannerRef}
            data={BANNER_DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacer }}
            snapToInterval={CARD_WIDTH + GAP}
            decelerationRate="fast"
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                style={{
                  width: CARD_WIDTH,
                  height: 180,
                  borderRadius: 16,
                  marginRight: GAP,
                }}
                resizeMode="cover"
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Categories Section */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Browse by Category
            </Text>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={handleViewCategory}
            >
              <Text className="text-gray-500 text-sm mr-1">View more</Text>
              <AntDesign name="arrow-right" size={16} color="gray" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity className="bg-gray-100 py-5 w-[85px] rounded-2xl items-center">
                <MaterialCommunityIcons
                  name={item.icon}
                  size={30}
                  color="#0a1128"
                />
                <Text className="text-[10px] font-medium text-gray-700 mt-2 text-center">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Flash Sales Section */}
        <ProductSection
          title="Flash Sales"
          data={[...PRODUCTS, ...PRODUCTS]}
          onViewMore={() => handleViewSection("Flash Sales")}
        />

        {/* Tabs Section */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <View className="flex-row gap-6">
              {["New Arrival", "Bestseller"].map((tab) => (
                <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                  <Text
                    className={`text-lg font-bold ${activeTab === tab ? "text-gray-900" : "text-gray-400"}`}
                  >
                    {tab}
                  </Text>
                  {activeTab === tab && (
                    <View className="h-[2px] bg-[#a3cc39] w-full mt-1" />
                  )}
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => handleViewSection(activeTab)}
            >
              <Text className="text-gray-500 text-sm mr-1">View more</Text>
              <AntDesign name="arrow-right" size={16} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between px-4">
            {[...PRODUCTS, ...PRODUCTS, ...PRODUCTS].map((item, index) => (
              <View
                key={index}
                style={{ width: (width - 44) / 2, marginBottom: 16 }}
              >
                <ProductCard product={item} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
