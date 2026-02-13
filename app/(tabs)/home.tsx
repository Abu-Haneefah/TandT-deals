import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
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
import ProductCard from "../components/ProductCard";

// --- Types & Interfaces ---
type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

interface Category {
  id: string;
  name: string;
  icon: MaterialIconName;
}

interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  store: string;
}

// --- Mock Data ---
const BANNER_DATA = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=800&auto=format&fit=crop",
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
    id: "10",
    name: "Apple iPhone 12 Pro, 128GB, Silver - Fully Unlocked",
    price: "99.50",
    oldPrice: "1128.00",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-finish-unselect-gallery-1-202207?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1662129028441",
    rating: 4,
    reviews: 20,
    store: "Xclicopedia Store",
  },
  {
    id: "11",
    name: "Smart Watch Series 7 - Midnight Aluminum Case",
    price: "299.00",
    oldPrice: "399.00",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500&auto=format&fit=crop",
    rating: 5,
    reviews: 124,
    store: "Gadget Hub",
  },
];

const ProductSection = ({
  title,
  data,
}: {
  title: string;
  data: Product[];
}) => (
  <View className="mt-8">
    <View className="flex-row justify-between items-center px-4 mb-4">
      <Text className="text-lg font-bold text-gray-800">{title}</Text>
      <TouchableOpacity className="flex-row items-center">
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
      keyExtractor={(item) => item.id}
    />
  </View>
);

const Home = () => {
  const { width } = useWindowDimensions();
  const bannerRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Tab State for New Arrival / Bestseller
  const [activeTab, setActiveTab] = useState("New Arrival");

  const CARD_WIDTH = width * 0.85;
  const GAP = 10;
  const spacer = (width - CARD_WIDTH) / 2;

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= BANNER_DATA.length) {
        nextIndex = 0;
      }

      bannerRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

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
        <View className="bg-[#0a1128] w-full p-3 flex items-end">
          <Text className="text-xs text-white">
            <Text className="text-[#a3cc39]">Hotline: </Text> +234 902 000 0070
          </Text>
        </View>

        {/* Search Bar */}
        <View className="bg-[#0a1128] flex flex-row items-center p-4">
          <TextInput
            placeholder="Search products and services"
            placeholderTextColor="#9ca3af"
            className="bg-white p-3 rounded-l-lg flex-1 h-12"
          />
          <TouchableOpacity className="bg-[#a3cc39] h-12 w-12 items-center justify-center rounded-r-lg">
            <FontAwesome5 name="search" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Hero Banner with Auto-Rotate */}
        <View className="mt-4">
          <FlatList
            ref={bannerRef}
            data={BANNER_DATA}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacer }}
            snapToInterval={CARD_WIDTH + GAP}
            decelerationRate="fast"
            getItemLayout={(_, index) => ({
              length: CARD_WIDTH + GAP,
              offset: (CARD_WIDTH + GAP) * index,
              index,
            })}
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
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(
                e.nativeEvent.contentOffset.x / (CARD_WIDTH + GAP),
              );
              setActiveIndex(newIndex);
            }}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Categories Section */}
        <View className="mt-8">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-lg font-bold text-gray-800">
              Browse by Category
            </Text>
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-gray-500 text-sm mr-1">View more</Text>
              <AntDesign name="arrow-right" size={14} color="gray" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={CATEGORIES}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ width: 85 }}
                className="bg-gray-100 py-5 rounded-2xl items-center"
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={30}
                  color="#0a1128"
                />
                <Text className="text-[10px] font-medium text-gray-700 mt-2 text-center px-1">
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Flash Sales */}
        <ProductSection title="Flash Sales" data={[...PRODUCTS, ...PRODUCTS]} />

        {/* Ad Banner */}
        <View className="mx-4 mt-10 rounded-3xl overflow-hidden h-52 bg-black justify-center items-center">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
            }}
            className="absolute inset-0 w-full h-full opacity-50"
            resizeMode="cover"
          />
          <View className="items-center px-6">
            <Text className="text-white text-sm">Get the best of</Text>
            <Text className="text-white text-3xl font-bold text-center">
              Refurbished Gadgets
            </Text>
            <TouchableOpacity className="border border-white mt-5 px-8 py-2 rounded-full">
              <Text className="text-white text-xs font-bold">learn more</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Products */}
        <ProductSection
          title="Featured Products"
          data={[...PRODUCTS, ...PRODUCTS]}
        />

        {/* Top products */}
        <ProductSection
          title="Top Products"
          data={[...PRODUCTS, ...PRODUCTS]}
        />

        {/* NEW ARRIVAL & BESTSELLER TABS SECTION */}
        <View className="mt-8">
          <View className="flex-row px-4 mb-4 gap-6">
            <TouchableOpacity onPress={() => setActiveTab("New Arrival")}>
              <Text
                className={`text-lg font-bold ${activeTab === "New Arrival" ? "text-gray-900" : "text-gray-400"}`}
              >
                New Arrival
              </Text>
              {activeTab === "New Arrival" && (
                <View className="h-[2px] bg-black w-full mt-1" />
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setActiveTab("Bestseller")}>
              <Text
                className={`text-lg font-bold ${activeTab === "Bestseller" ? "text-gray-900" : "text-gray-400"}`}
              >
                Bestseller
              </Text>
              {activeTab === "Bestseller" && (
                <View className="h-[2px] bg-black w-full mt-1" />
              )}
            </TouchableOpacity>
          </View>

          {/* This renders products based on the selected tab */}
          <FlatList
            data={[...PRODUCTS, ...PRODUCTS, ...PRODUCTS]} // In real app, filter data here
            numColumns={2}
            scrollEnabled={false} // Disable inner scrolling as it's inside a ScrollView
            contentContainerStyle={{ paddingHorizontal: 16 }}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            renderItem={({ item }) => (
              <View style={{ width: (width - 44) / 2 }}>
                <ProductCard product={item} />
              </View>
            )}
            keyExtractor={(item, index) => item.id + index}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
