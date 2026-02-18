import { AntDesign, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export interface Product {
  id: string;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  rating: number;
  reviews: number;
  store: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push({
      pathname: "/[products]",
      params: { products: product.id },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.9}
      className="bg-white border border-gray-100 rounded-2xl p-3 w-48 mr-4 shadow-sm"
    >
      {/* Wishlist Heart */}
      <TouchableOpacity
        onPress={(e) => e.stopPropagation()} // Prevents navigation when clicking heart
        className="absolute right-3 top-3 z-10"
      >
        <AntDesign name="heart" size={18} color="#9ca3af" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image
        source={{ uri: product.image }}
        className="w-full h-32"
        resizeMode="contain"
      />

      {/* Product Info */}
      <View className="mt-3">
        <Text
          numberOfLines={2}
          className="text-[12px] font-medium text-gray-800 leading-4"
        >
          {product.name}
        </Text>

        {/* Price Row */}
        <View className="flex-row items-center mt-2 gap-2">
          <Text className="text-sm font-bold text-gray-900">
            ₦{product.price}
          </Text>
          {product.oldPrice && (
            <Text className="text-[10px] text-gray-400 line-through">
              ₦{product.oldPrice}
            </Text>
          )}
        </View>

        {/* Rating & Store */}
        <View className="flex-row items-center mt-1 gap-1">
          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((s) => (
              <AntDesign
                key={s}
                name="star"
                size={10}
                color={s <= product.rating ? "#a3cc39" : "#e5e7eb"}
              />
            ))}
          </View>
          <Text className="text-[10px] text-gray-400">({product.reviews})</Text>
        </View>

        <Text className="text-[9px] text-gray-400 mt-1">
          Sold by: {product.store}
        </Text>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        onPress={(e) => e.stopPropagation()} // Prevents navigation when adding to cart
        className="bg-[#a3cc39] flex-row items-center justify-center py-2 rounded-lg mt-3 gap-2"
      >
        <Text className="text-white text-[11px] font-bold">Add to cart</Text>
        <Feather name="shopping-cart" size={14} color="white" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;
