import { useCategoryStore } from "@/store/useCategoryStore";
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
import ProductCard, { Product } from "../components/ProductCard";

// --- Types & Interfaces ---
type MaterialIconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

const getCategoryIcon = (title?: string): MaterialIconName => {
  if (!title) return "package-variant-closed";
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("phone")) return "cellphone";
  if (lowerTitle.includes("shoe")) return "shoe-sneaker";
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

const PRODUCTS: Product[] = [
  {
    id: "macbook-air-m2",
    name: "Apple MacBook Air 15-inch Laptop with M2 chip - Midnight",
    price: "1,199.00",
    oldPrice: "1,299.00",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba15-midnight-select-202306?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1684351195445",
    rating: 5,
    reviews: 342,
    store: "Apple Store",
  },
  {
    id: "samsung-s23",
    name: "Samsung Galaxy S23 Ultra, 256GB, Phantom Black - Factory Unlocked",
    price: "950.00",
    oldPrice: "1,199.99",
    image:
      "https://images.samsung.com/is/image/samsung/p6pim/au/2302/gallery/au-galaxy-s23-s918-sm-s918bzkhxsp-534863280?$650_519_PNG$",
    rating: 4,
    reviews: 567,
    store: "Samsung Official",
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones - Black",
    price: "329.99",
    oldPrice: "399.99",
    image: "https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg",
    rating: 5,
    reviews: 2801,
    store: "Audio Emporium",
  },
  {
    id: "ipad-air",
    name: "Apple iPad Air 5th Generation, 64GB, Wi-Fi, Blue",
    price: "549.00",
    oldPrice: "599.00",
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1645065739912",
    rating: 4,
    reviews: 112,
    store: "iStore",
  },
  {
    id: "ps5-slim",
    name: "PlayStation 5 Console (Slim) - Disc Version",
    price: "449.00",
    oldPrice: "499.00",
    image:
      "https://gmedia.playstation.com/is/image/SIEPDC/ps5-slim-group-image-block-01-en-28sep23?$1600px$",
    rating: 5,
    reviews: 4321,
    store: "GameZone",
  },
  {
    id: "echo-dot-5",
    name: "Echo Dot (5th Gen, 2022 release) | Smart speaker with Bigger sound",
    price: "39.99",
    oldPrice: "49.99",
    image: "https://m.media-amazon.com/images/I/61MbVvwXWrL._AC_SL1000_.jpg",
    rating: 4,
    reviews: 8920,
    store: "Amazon Devices",
  },
  {
    id: "dyson-v15",
    name: "Dyson V15 Detect Absolute Vacuum - Yellow/Nickel",
    price: "649.99",
    oldPrice: "749.99",
    image: "https://m.media-amazon.com/images/I/61N-gS0oSeL._AC_SL1500_.jpg",
    rating: 4,
    reviews: 453,
    store: "Dyson Store",
  },
  {
    id: "kindle-paperwhite",
    name: "Kindle Paperwhite (8 GB) - 6.8",
    price: "129.99",
    oldPrice: "149.99",
    image: "https://m.media-amazon.com/images/I/61X6DxRyd9L._AC_SL1000_.jpg",
    rating: 5,
    reviews: 15023,
    store: "Bookworm Electronics",
  },
  {
    id: "gopro-hero12",
    name: "GoPro HERO12 Black - Waterproof Action Camera with 5.3K Video",
    price: "349.00",
    oldPrice: "399.99",
    image:
      "https://gopro.com/content/dam/products/hero12-black/hero12-black-digital-image-hero.jpg",
    rating: 4,
    reviews: 678,
    store: "Action Cam World",
  },
  {
    id: "logitech-mx-master",
    name: "Logitech MX Master 3S - Wireless Performance Mouse, Graphite",
    price: "89.99",
    oldPrice: "99.99",
    image: "https://m.media-amazon.com/images/I/61ni3t1XjQL._AC_SL1500_.jpg",
    rating: 4,
    reviews: 3241,
    store: "Logitech Direct",
  },
];

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

  const { categories, loading, error, fetchAllCategories } = useCategoryStore();

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const CARD_WIDTH = width * 0.85;
  const GAP = 10;
  const spacer = (width - CARD_WIDTH) / 2;

  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = activeIndex + 1;
      if (nextIndex >= BANNER_DATA.length) nextIndex = 0;
      bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleViewSection = (sectionName: string) => {
    router.push({
      pathname: "/section/[name]",
      params: { name: sectionName.toLowerCase().replace(/\s+/g, "-") },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header & Search */}
        <View className="bg-[#0a1128] w-full p-3 items-end">
          <Text className="text-xs text-white">
            <Text className="text-[#a3cc39]">Hotline: </Text> +234 902 000 0070
          </Text>
        </View>

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
              Shop by Category
            </Text>
            <TouchableOpacity onPress={() => router.navigate("/categories")}>
              <Text className="text-gray-500 text-sm">View more</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View className="py-10">
              <ActivityIndicator color="#a3cc39" size="large" />
            </View>
          ) : error ? (
            <View className="px-4 py-4">
              <Text className="text-red-500 text-center">
                Failed to load categories
              </Text>
              <TouchableOpacity onPress={() => fetchAllCategories()}>
                <Text className="text-[#a3cc39] text-center mt-2 font-bold">
                  Try Again
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={categories.filter((cat: any) => cat.parentId === null)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/categories",
                      params: { initialCategoryId: item.id },
                    })
                  }
                  className="bg-gray-100 py-5 w-[85px] rounded-2xl items-center"
                >
                  <MaterialCommunityIcons
                    name={getCategoryIcon(item.title)}
                    size={30}
                    color="#0a1128"
                  />
                  <Text
                    numberOfLines={1}
                    className="text-[10px] font-medium text-gray-700 mt-2 text-center px-1 capitalize"
                  >
                    {item.title || "N/A"}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>

        {/* Product Sections */}
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
            <TouchableOpacity onPress={() => handleViewSection(activeTab)}>
              <AntDesign name="arrow-right" size={16} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="flex-row flex-wrap justify-between px-4">
            {[...PRODUCTS, ...PRODUCTS].map((item, index) => (
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
