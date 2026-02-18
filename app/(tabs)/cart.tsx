import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
import Button from "../components/Button";

// --- Types ---
interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
  quantity: number;
  color: string;
  brand: string;
}

const Cart = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setCartItems([
          {
            id: "c1",
            name: "Apple iPhone 12 Pro, 128GB, Silver - Fully Unlocked",
            price: 400128,
            oldPrice: 450000,
            discount: "-11%",
            image:
              "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=200",
            quantity: 1,
            color: "Matte Black",
            brand: "iPhone",
          },
          {
            id: "c2",
            name: "Samsung Galaxy S21, 256GB, Phantom Gray - Fully Unlocked",
            price: 350750,
            oldPrice: 400000,
            discount: "-12%",
            image:
              "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=200",
            quantity: 1,
            color: "Phantom Violet",
            brand: "Samsung",
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    };
    fetchCart();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = 4128;
  const total = subtotal + shipping;

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

  if (loading)
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#a3cc39" />
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }} // Extra space at bottom
      >
        <Text className="text-gray-500 mt-4 mb-2 text-lg font-medium">
          Cart
        </Text>

        {/* Summary Header Section */}
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">
            Subtotal ({cartItems.length} items)
          </Text>
          <Text className="font-bold text-gray-800">
            ₦{subtotal.toLocaleString()}
          </Text>
        </View>

        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600">Shipping</Text>
          <Text className="font-bold text-gray-800">
            ₦{shipping.toLocaleString()}
          </Text>
        </View>

        <View className="flex-row justify-between border-b border-gray-100 pb-4">
          <Text className="text-gray-600">Tax</Text>
          <Text className="font-bold text-gray-300">7%VAT</Text>
        </View>

        <View className="flex-row justify-between py-4">
          <Text className="text-xl font-bold">Total</Text>
          <Text className="text-xl font-bold text-main">
            ₦{total.toLocaleString()}
          </Text>
        </View>

        <Text className="text-gray-500 mb-4 font-medium">
          Items ({cartItems.length})
        </Text>

        {/* Cart Item List */}
        {cartItems.map((item) => (
          <View
            key={item.id}
            className="flex-row mb-6 border-b border-gray-50 pb-6"
          >
            <Image
              source={{ uri: item.image }}
              className="w-24 h-24 rounded-lg bg-gray-50"
              resizeMode="contain"
            />
            <View className="flex-1 ml-4">
              <Text
                className="font-medium text-gray-800 text-sm"
                numberOfLines={2}
              >
                {item.name}
              </Text>
              <Text className="font-bold text-lg mt-1 text-gray-900">
                ₦{item.price.toLocaleString()}
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                Color: {item.color} | Brand: {item.brand}
              </Text>

              <View className="flex-row items-center justify-between mt-3">
                <View className="flex-row items-center bg-[#f5f5f5] rounded-lg">
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, -1)}
                    className="p-2 bg-main rounded-l-lg"
                  >
                    <Feather name="minus" size={16} color="black" />
                  </TouchableOpacity>
                  <Text className="px-4 font-bold text-base">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, 1)}
                    className="p-2 bg-main rounded-r-lg"
                  >
                    <Feather name="plus" size={16} color="black" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  className="p-2"
                >
                  <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={22}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Proceed Button  */}
        <View className="mt-4">
          <Button
            title="Proceed to Checkout"
            onPress={() => router.push("/checkout")}
            icon={<AntDesign name="arrow-right" size={18} color="black" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
