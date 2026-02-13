import { Entypo, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- Mock Data ---
const MAIN_CATEGORIES = [
  { id: "1", name: "Home & Office" },
  { id: "2", name: "Phones & Tablets" },
  { id: "3", name: "Fashion" },
  { id: "4", name: "Health & Beauty" },
  { id: "5", name: "Electronics" },
  { id: "6", name: "Computing" },
  { id: "7", name: "Grocery" },
  { id: "8", name: "Garden & Outdoors" },
  { id: "9", name: "Automobile" },
  { id: "10", name: "Gaming" },
];

const SUB_SECTIONS = [
  {
    title: "Appliances",
    items: [
      {
        id: "a1",
        name: "Large Appliances",
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "a2",
        name: "Small Appliances",
        image:
          "https://images.unsplash.com/photo-1574313180493-90bc02245b6b?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "Home & Kitchen",
    items: [
      {
        id: "h1",
        name: "Cookware",
        image:
          "https://images.unsplash.com/photo-1584990333910-fe907cddfe12?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "h2",
        name: "Small Appliances",
        image:
          "https://images.unsplash.com/photo-1594142340245-21d3f94218d6?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "h3",
        name: "Bakeware",
        image:
          "https://images.unsplash.com/photo-1550950158-d0d960dff51b?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "h4",
        name: "Cutlery & Knife Accessories",
        image:
          "https://images.unsplash.com/photo-1594326079044-644788c69228?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    title: "Home",
    items: [
      {
        id: "hm1",
        name: "Bedding",
        image:
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "hm2",
        name: "Home Decor",
        image:
          "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: "hm3",
        name: "Kitchen & Dining",
        image:
          "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
];

const Categories = () => {
  const [selectedMain, setSelectedMain] = useState("1");
  const { width } = useWindowDimensions();
  const sidebarWidth = width * 0.28;

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100">
        <TouchableOpacity className="mr-4">
          <Feather name="arrow-left" size={24} color="#0a1128" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-[#0a1128]">Categories</Text>
      </View>

      <View className="flex-1 flex-row">
        {/* Left Sidebar - Scrollable */}
        <View
          style={{ width: sidebarWidth }}
          className="bg-white border-r border-gray-50"
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {MAIN_CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedMain(cat.id)}
                className={`py-5 px-3 border-l-4 ${
                  selectedMain === cat.id
                    ? "bg-gray-50 border-[#a3cc39]"
                    : "border-transparent"
                }`}
              >
                <Text
                  className={`text-[11px] ${
                    selectedMain === cat.id
                      ? "text-[#a3cc39] font-bold"
                      : "text-gray-500 font-medium"
                  }`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Right Content Area - Scrollable */}
        <ScrollView className="flex-1 p-3" showsVerticalScrollIndicator={false}>
          {/* Header Link */}
          <TouchableOpacity className="bg-white flex-row items-center justify-between p-4 rounded-xl mb-4 shadow-sm border border-gray-50">
            <Text className="text-gray-800 font-bold">All Products</Text>
            <Entypo name="chevron-thin-right" size={14} color="#9ca3af" />
          </TouchableOpacity>

          {/* Sub Sections */}
          {SUB_SECTIONS.map((section, idx) => (
            <View
              key={idx}
              className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-gray-50"
            >
              <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-gray-50">
                <Text className="text-gray-800 font-bold text-sm tracking-tight">
                  {section.title}
                </Text>
                <TouchableOpacity>
                  <Text className="text-[#a3cc39] text-xs font-bold">
                    See All
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex-row flex-wrap">
                {section.items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="w-1/3 items-center mb-6 px-1"
                  >
                    <View className="bg-gray-50 rounded-xl p-2 mb-2 w-full aspect-square justify-center items-center">
                      <Image
                        source={{ uri: item.image }}
                        className="w-full h-full rounded-lg"
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      className="text-[9px] text-gray-600 text-center font-medium"
                      numberOfLines={2}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* Spacer for bottom */}
          <View className="h-10" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Categories;
