import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ProductCard = ({ product }: { product: any }) => {
  const router = useRouter();

  // The Service ensures these fields exist via normalization
  const displayPrice = product.salePrice || product.price || 0;
  const originalPrice = product.price || 0;
  const imageUri = product.images?.[0] || "https://via.placeholder.com/150";

  const handlePress = () => {
    // Navigate using the slug to match your [products].tsx dynamic route
    router.push({
      pathname: "/[products]",
      params: { products: product.slug },
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      // Added mb-1 to prevent shadow clipping at the bottom of the list
      className="bg-white border border-gray-100 rounded-2xl p-3 w-44 shadow-sm mb-1"
    >
      {/* Image Container */}
      <View className="items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
        <Image
          source={{ uri: imageUri }}
          className="w-full h-32"
          resizeMode="contain" // Switched to contain to ensure full product is visible
          onError={(e) =>
            console.log(
              `Image Load Error for ${product.title}:`,
              e.nativeEvent.error,
            )
          }
        />
      </View>

      {/* Product Info */}
      <View className="mt-3">
        <Text
          numberOfLines={2}
          className="text-[12px] font-semibold text-gray-800 h-8 leading-4"
        >
          {product.title}
        </Text>

        <View className="flex-row items-center mt-2 gap-2">
          <Text className="text-[14px] font-bold text-[#0a1128]">
            ₦{displayPrice.toLocaleString()}
          </Text>
          {originalPrice > displayPrice && (
            <Text className="text-[10px] text-gray-400 line-through">
              ₦{originalPrice.toLocaleString()}
            </Text>
          )}
        </View>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity
        className="bg-[#a3cc39] flex-row items-center justify-center py-2.5 rounded-lg mt-3"
        onPress={(e) => {
          e.stopPropagation(); // Prevents navigating to details when clicking button
          console.log("Added to cart:", product.title);
          // Add your cart store logic here later
        }}
      >
        <Feather name="shopping-cart" size={14} color="white" />
        <Text className="text-white text-[11px] font-bold ml-2">
          Add to Cart
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ProductCard;
