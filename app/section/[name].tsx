import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard, { Product } from "../components/ProductCard";

const ALL_PRODUCTS: Product[] = [
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
    name: "Kindle Paperwhite (8 GB) - 6.8 Display, with built-in adjustable light",
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
  // ... more items
];

const SectionPage = () => {
  const { name } = useLocalSearchParams();
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Create a large list for the grid
  const displayData = [
    ...ALL_PRODUCTS,
    ...ALL_PRODUCTS,
    ...ALL_PRODUCTS,
    ...ALL_PRODUCTS,
  ];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-xl font-bold capitalize text-gray-800">
          {typeof name === "string" ? name.replace("-", " ") : "Products"}
        </Text>
      </View>

      {/* Grid List */}
      <FlatList
        data={displayData}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        renderItem={({ item }) => (
          <View style={{ width: (width - 48) / 2 }}>
            <ProductCard product={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default SectionPage;
