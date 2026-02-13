import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

// --- 1. Type Definitions ---
interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
  quantity: number;
  isExpress: boolean;
}

const Cart = () => {
  // --- 2. State Management ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Simulate Data Fetching
  useEffect(() => {
    const fetchCart = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setCartItems([
          {
            id: "c1",
            name: "Spark 40 Smart Phone With 128GB ROM & 4GB RAM",
            price: 169699,
            oldPrice: 250000,
            discount: "-32%",
            image:
              "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=200",
            quantity: 1,
            isExpress: true,
          },
          {
            id: "c2",
            name: "4 Litre Whistling Kettle - Stainless Steel High Quality",
            price: 12999,
            oldPrice: 15000,
            discount: "-13%",
            image:
              "https://images.unsplash.com/photo-1594142340245-21d3f94218d6?q=80&w=200",
            quantity: 1,
            isExpress: false,
          },
          {
            id: "c3",
            name: "Men's Bifold Leather Wallet - Vintage Style Brown",
            price: 2980,
            oldPrice: 4470,
            discount: "-33%",
            image:
              "https://images.unsplash.com/photo-1627123430984-7151109d21c1?q=80&w=200",
            quantity: 2,
            isExpress: true,
          },
        ]);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // --- 3. Calculations ---
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- 4. Render Loading State ---
  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="text-gray-500 mt-4 font-medium">
          Loading your cart...
        </Text>
      </View>
    );
  }

  // --- 5. Render Error State ---
  if (error) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-10">
        <Ionicons name="alert-circle-outline" size={80} color="red" />
        <Text className="text-xl font-bold text-gray-800 mt-4 text-center">
          Failed to load cart
        </Text>
        <TouchableOpacity
          onPress={() => {
            setLoading(true);
            setError(false);
          }}
          className="bg-orange-500 mt-6 px-8 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F1F1F1]">
      {/* Header Summary */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <Text className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-1">
          Cart Summary
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold text-gray-800">Subtotal</Text>
          <Text className="text-xl font-extrabold text-gray-900">
            ₦{subtotal.toLocaleString()}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View className="bg-[#EAEAEA] px-4 py-2">
          <Text className="text-gray-500 font-medium">
            Cart ({cartItems.length})
          </Text>
        </View>

        {cartItems.map((item) => (
          <View
            key={item.id}
            className="bg-white mb-2 p-4 border-b border-gray-100"
          >
            <View className="flex-row">
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded"
                resizeMode="contain"
              />
              <View className="flex-1 ml-4">
                <Text
                  className="text-sm text-gray-800 leading-5"
                  numberOfLines={2}
                >
                  {item.name}
                </Text>
                <View className="flex-row items-center mt-1">
                  <Text className="text-lg font-bold">
                    ₦{item.price.toLocaleString()}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-gray-400 text-xs line-through">
                    ₦{item.oldPrice.toLocaleString()}
                  </Text>
                  <View className="bg-orange-50 px-1 rounded ml-2">
                    <Text className="text-main text-[10px] font-bold">
                      {item.discount}
                    </Text>
                  </View>
                </View>
                <Text className="text-green-600 text-[10px] font-bold mt-1">
                  In Stock
                </Text>

                {item.isExpress && (
                  <View className="flex-row items-center mt-1">
                    <Text className="text-[#0a1128] font-black italic text-[10px]">
                      TANDT
                    </Text>
                    <Text className="text-orange-500 font-bold italic text-[10px] ml-1">
                      EXPRESS
                    </Text>
                  </View>
                )}
              </View>
            </View>

            <View className="flex-row justify-between items-center mt-4">
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                className="flex-row items-center"
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  color="red"
                />
                <Text className="ml-1 text-main font-bold text-sm uppercase">
                  Remove
                </Text>
              </TouchableOpacity>

              <View className="flex-row items-center bg-white rounded-lg">
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, -1)}
                  className="bg-orange-100 p-1.5 rounded-lg"
                >
                  <Feather name="minus" size={18} color="#f97316" />
                </TouchableOpacity>
                <Text className="mx-4 font-bold text-lg">{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, 1)}
                  className="bg-main p-1.5 rounded-lg"
                >
                  <Feather name="plus" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity className="bg-white mx-4 mt-2 p-4 rounded-lg flex-row justify-between items-center border border-gray-200">
          <Text className="text-gray-800 font-medium">
            Complete your purchase
          </Text>
          <Feather name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed Bottom Checkout Bar */}
      <View className="absolute bottom-0 w-full bg-white p-4 border-t border-gray-200 flex-row items-center shadow-lg">
        <TouchableOpacity className="border border-orange-500 p-3 rounded-lg mr-4">
          <Ionicons name="call-outline" size={24} color="#f97316" />
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-orange-500 py-4 rounded-lg items-center shadow-sm">
          <Text className="text-white font-extrabold text-base">
            CHECKOUT (₦{subtotal.toLocaleString()})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;
