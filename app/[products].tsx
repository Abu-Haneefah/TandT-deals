import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const ProductDetails = () => {
  // CRITICAL FIX: Since your file is [products].tsx,
  // you must use 'products' as the variable name here.
  const { products } = useLocalSearchParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Simulating the database based on the dynamic route parameter
        setTimeout(() => {
          const productDatabase: any = {
            "iphone-12": {
              name: "Apple iPhone 12 Pro",
              price: "400,000",
              oldPrice: "600,000",
              rating: 4.9,
              reviewCount: 29,
              description:
                "Apple iPhone 12 Pro, 128GB, Silver - Fully Unlocked. Includes Pro camera system and 5G capabilities.",
              tags: ["Electronics", "Phones", "Apple"],
              colors: ["#2e3b4e", "#000000", "#e1e1e1"],
              images: [
                "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=500",
                "https://images.unsplash.com/photo-1510557880182-3d4d3cba3f21?q=80&w=500",
              ],
              seller: {
                name: "TandTdeals",
                response: "<1 hour",
                rating: "5.0",
                totalProducts: "Over 100,000",
              },
            },
            "tray-table": {
              name: "Tray Table",
              price: "400,128",
              oldPrice: "480,128",
              rating: 4.9,
              reviewCount: 11,
              description:
                "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
              tags: ["Household items", "Furniture", "woodwork"],
              colors: ["#1e293b", "#000000", "#f97316", "#ff0000"],
              images: [
                "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=500",
                "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=500",
              ],
              seller: {
                name: "TandTdeals",
                response: "<1 hour",
                rating: "5.0",
                totalProducts: "Over 100,000",
              },
            },
          };

          // Match the URL parameter 'products' against our database keys
          const selectedProduct =
            productDatabase[products as string] ||
            productDatabase["tray-table"];

          setProduct(selectedProduct);
          setMainImage(selectedProduct.images[0]);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError(true);
        setLoading(false);
        console.log(err);
      }
    };

    fetchProduct();
  }, [products]); // Re-run if the URL parameter changes

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#a3cc39" />
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header Navigation */}
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text className="text-[10px] text-gray-400">
          Home {">"} Product {">"} Living Room {">"} {product.name}
        </Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Gallery Section */}
        <View className="flex-row bg-[#F8F8F8] p-4">
          <View className="gap-2 mr-4">
            {product.images.map((img: string, i: number) => (
              <TouchableOpacity
                key={i}
                onPress={() => setMainImage(img)}
                className={`p-1 rounded bg-white border ${mainImage === img ? "border-[#a3cc39]" : "border-gray-200"}`}
              >
                <Image
                  source={{ uri: img }}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-1 relative">
            <View className="absolute top-0 right-0 z-10 bg-[#a3cc39] px-2 py-1 rounded">
              <Text className="text-white text-[10px] font-bold uppercase">
                Used
              </Text>
            </View>
            <Image
              source={{ uri: mainImage }}
              className="w-full h-72"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Product Details Section */}
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-800">
            {product.name}
          </Text>
          <Text className="text-gray-500 text-xs mt-2 leading-5">
            {product.description}
          </Text>

          <View className="flex-row items-center mt-4 gap-2">
            <Text className="text-xl font-bold">₦{product.price}</Text>
            <Text className="text-gray-400 line-through text-sm">
              ₦{product.oldPrice}
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <AntDesign key={s} name="star" size={14} color="#a3cc39" />
            ))}
            <Text className="text-gray-500 text-xs ml-2">
              {product.reviewCount} Reviews
            </Text>
          </View>

          {/* Color Selector */}
          <Text className="font-bold mt-6 mb-3">Color</Text>
          <View className="flex-row gap-3">
            {product.colors.map((color: string, index: number) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedColor(index)}
                style={{ backgroundColor: color }}
                className={`w-10 h-10 rounded-full ${selectedColor === index ? "border-4 border-gray-200" : ""}`}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View className="flex-row items-center mt-8 gap-3">
            <TouchableOpacity className="border border-gray-200 p-3 rounded-lg">
              <Ionicons name="swap-horizontal" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity className="border border-gray-200 p-3 rounded-lg">
              <Ionicons name="heart-outline" size={24} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-[#a3cc39] py-4 rounded-lg flex-row justify-center items-center">
              <Text className="text-white font-bold mr-2">Add to cart</Text>
              <AntDesign name="shopping-cart" size={20} color="white" />
            </TouchableOpacity>
          </View>

          <Text className="text-gray-400 text-xs mt-6">
            <Text className="font-bold text-gray-600">Tags: </Text>
            {product.tags.join(", ")}
          </Text>
        </View>

        {/* Tab Selection Section (Details / Reviews) */}
        <View className="flex-row border-b border-gray-100 px-4 mt-4">
          <TouchableOpacity className="border-b-2 border-black pb-2 mr-6">
            <Text className="font-bold">Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="pb-2">
            <Text className="text-gray-400">Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Product Specifications Section */}
        <View className="p-4">
          <Text className="font-bold text-lg mb-4">Product Specifications</Text>
          <View className="gap-y-2">
            <Text className="text-gray-500 text-xs">
              <Text className="font-bold text-gray-700">Features: </Text>Premium
              build quality...
            </Text>
            <Text className="text-gray-500 text-xs">
              <Text className="font-bold text-gray-700">Material: </Text>Wood
              type, Metal, Fabric, etc.
            </Text>
            <Text className="text-gray-500 text-xs">
              <Text className="font-bold text-gray-700">
                Assembly Required:{" "}
              </Text>
              Yes
            </Text>
            <Text className="text-gray-500 text-xs">
              <Text className="font-bold text-gray-700">Style: </Text>Modern
            </Text>
          </View>
        </View>

        {/* Delivery Options Section */}
        <View className="bg-[#0A1128] mx-4 p-4 rounded-t-xl flex-row items-center mt-4">
          <MaterialIcons name="local-shipping" size={20} color="#a3cc39" />
          <Text className="text-white font-bold ml-2">Delivery Options</Text>
        </View>
        <View className="mx-4 bg-white border-x border-b border-gray-100 p-4 rounded-b-xl mb-6">
          <View className="flex-row justify-between mb-4 bg-gray-50 p-3 rounded-lg">
            <View>
              <Text className="font-bold text-gray-800 text-xs">
                Standard Delivery
              </Text>
              <Text className="text-gray-400 text-[10px]">
                3-5 business days
              </Text>
            </View>
            <Text className="font-bold">₦1,500</Text>
          </View>
          <View className="gap-y-1">
            <Text className="text-[10px] text-gray-400">
              • Tracking information provided
            </Text>
            <Text className="text-[10px] text-gray-400">
              • Signature required for delivery
            </Text>
            <Text className="text-[10px] text-gray-400">
              • Safe and secure packaging
            </Text>
          </View>
        </View>

        {/* Seller Info Section */}
        <View className="mx-4 bg-white border border-gray-100 p-4 rounded-xl mb-6">
          <Text className="font-bold text-gray-800 mb-4">
            Seller Information
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-lg">{product.seller.name}</Text>
            <AntDesign name="check-circle" size={18} color="#a3cc39" />
          </View>
          <View className="flex-row justify-between mt-4">
            <View>
              <Text className="text-gray-400 text-[10px]">Response time:</Text>
              <Text className="font-bold text-xs">
                {product.seller.response}
              </Text>
            </View>
            <View>
              <Text className="text-gray-400 text-[10px]">Total Products:</Text>
              <Text className="font-bold text-xs">
                {product.seller.totalProducts}
              </Text>
            </View>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
