import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 1. Define the Interface to fix the TypeScript "never" error
interface WishlistItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  discount?: string; // Optional because some items might not have it
  image: string | null; // Can be a URL string or null
  inStock: boolean;
}

const MOCK_WISHLIST: WishlistItem[] = [
  {
    id: "1",
    name: "4 Litre Whistling Kettle",
    price: 12999,
    oldPrice: 15000,
    discount: "-13%",
    image:
      "https://images.unsplash.com/photo-1594142340245-21d3f94218d6?q=80&w=200",
    inStock: true,
  },
  {
    id: "2",
    name: "Men's Black Patterned Wallet - Compact, Modern & Stylish",
    price: 0,
    oldPrice: 0,
    image: null,
    inStock: false,
  },
  {
    id: "3",
    name: "Men's Black Matte Bifold Wallet - Geometric Panel with Metal Trim",
    price: 1788,
    oldPrice: 5215,
    discount: "-66%",
    image:
      "https://images.unsplash.com/photo-1627123430984-7151109d21c1?q=80&w=200",
    inStock: true,
  },
];

const Wishlist = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 2. Explicitly type the state so it's not "never[]"
  const [items, setItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setItems(MOCK_WISHLIST);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#a3cc39" />
        <Text className="text-gray-500 mt-4 font-medium">
          Fetching your wishlist...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-10">
        <Ionicons name="cloud-offline-outline" size={80} color="#ef4444" />
        <Text className="text-xl font-bold text-gray-800 mt-4">Oops!</Text>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            setError(false);
          }}
          className="bg-[#a3cc39] mt-6 px-8 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <View className="bg-white mt-4 px-4 py-4 border-b border-gray-100 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-gray-900">
          Wishlist ({items.length})
        </Text>
      </View>

      {/* 3. Vertical Scrollable Area */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {items.map((item) => (
          <View
            key={item.id}
            className="bg-white mb-2 p-4 border-b border-gray-50"
          >
            <View className="flex-row">
              <View className="w-24 h-24 bg-gray-50 rounded-lg items-center justify-center overflow-hidden">
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="cart-outline" size={40} color="#d1d5db" />
                )}
              </View>

              <View className="flex-1 ml-4">
                <Text
                  className="text-gray-800 text-sm font-medium mb-1 leading-5"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>

                {item.price > 0 && (
                  <View className="flex-row items-center mb-1">
                    <Text className="text-lg font-bold text-gray-900">
                      ₦{item.price.toLocaleString()}
                    </Text>
                    {item.discount && (
                      <View className="bg-orange-50 px-1.5 py-0.5 rounded ml-2">
                        <Text className="text-main text-[10px] font-bold">
                          {item.discount}
                        </Text>
                      </View>
                    )}
                  </View>
                )}

                {item.oldPrice > 0 && (
                  <Text className="text-gray-400 text-xs line-through">
                    ₦{item.oldPrice.toLocaleString()}
                  </Text>
                )}
              </View>
            </View>

            <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-gray-50">
              <TouchableOpacity className="flex-row items-center">
                <Feather name="trash-2" size={16} color="red" />
                <Text className="ml-2 text-main font-bold text-sm uppercase">
                  Remove
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={!item.inStock}
                className={`px-6 py-2.5 rounded-lg flex-row items-center ${
                  item.inStock ? "bg-[#a3cc39]" : "bg-gray-300"
                }`}
              >
                <Text className="text-white font-bold text-sm">
                  {item.inStock ? "Add To Cart" : "Out Of Stock"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {items.length === 0 && (
          <View className="items-center justify-center py-20">
            <Feather name="heart" size={60} color="#d1d5db" />
            <Text className="text-lg font-bold text-gray-800 mt-4">
              Your wishlist is empty
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Wishlist;
