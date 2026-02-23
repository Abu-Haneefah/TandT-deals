import { useProductStore } from "@/store/useProductStore";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";

const SectionPage = () => {
  const { name } = useLocalSearchParams(); // e.g., "isFlashSale"
  const router = useRouter();
  const { width } = useWindowDimensions();

  const { productsByFlag, isLoading, fetchFlaggedProducts } = useProductStore();

  const formatTitle = (flag: string) => {
    if (!flag) return "Products";

    // Remove "is" if it exists at the start
    let cleaned = flag.startsWith("is") ? flag.slice(2) : flag;

    // Add spaces between camelCase words (e.g., FlashSale -> Flash Sale)
    let formatted = cleaned.replace(/([A-Z])/g, " $1").trim();

    // Specific mapping for common sections to ensure accuracy
    const mapping: { [key: string]: string } = {
      "Best Seller": "Best Sellers",
      "Flash Sale": "Flash Sales",
      "New Arrival": "New Arrivals",
      Featured: "Featured Products",
    };

    return mapping[formatted] || formatted;
  };

  useEffect(() => {
    if (name) {
      // Fetch data based on the flag
      fetchFlaggedProducts({ flag: name as string, limit: 40 });
    }
  }, [name]);

  const displayData = productsByFlag[name as string] || [];

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text className="text-xl font-bold text-gray-800">
            {formatTitle(name as string)}
          </Text>
          <Text className="text-gray-400 text-[11px]">
            {isLoading ? "Loading..." : `${displayData.length} products found`}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      {isLoading && displayData.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#a3cc39" />
        </View>
      ) : (
        <FlatList
          data={displayData}
          numColumns={2}
          keyExtractor={(item, index) =>
            (item._id || item.id || index).toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 16,
          }}
          ListEmptyComponent={
            <View className="items-center mt-20 px-10">
              <AntDesign name="info-circle" size={40} color="#D1D5DB" />
              <Text className="text-gray-400 mt-4 text-center">
                We couldn't find any products in the{" "}
                {formatTitle(name as string)} section right now.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            // Price fallback logic (handling the 0 price issue)
            const validatedItem = {
              ...item,
              // Ensure the card uses this price logic
              price: item.price || 0,
              salePrice: item.salePrice || 0,
            };

            return (
              <View style={{ width: (width - 48) / 2 }}>
                <ProductCard product={validatedItem} />
              </View>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default SectionPage;
