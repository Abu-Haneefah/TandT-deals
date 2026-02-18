import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddressListPage = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("1");

  const [addresses] = useState([
    {
      id: "1",
      name: "Andrew Garfield",
      details: "No 71, Alaka highway opp 21 Barracks Alimosho, Ibadan",
      phone: "+234 801 859 9874",
    },
    {
      id: "2",
      name: "Andrew Garfield",
      details: "No 71, Alaka highway opp 21 Barracks Alimosho, Ibadan",
      phone: "+234 801 859 9874",
    },
    {
      id: "3",
      name: "Andrew Garfield",
      details: "No 71, Alaka highway opp 21 Barracks Alimosho, Ibadan",
      phone: "+234 801 859 9874",
    },
    {
      id: "4",
      name: "Andrew Garfield",
      details: "No 71, Alaka highway opp 21 Barracks Alimosho, Ibadan",
      phone: "+234 801 859 9874",
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Back Button and Add New */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-2">
            <Feather name="chevron-left" size={28} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-medium text-gray-700">
            Delivery Address
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push("/addAddress")}>
          <Text className="text-gray-400 text-xs font-semibold">Add New</Text>
        </TouchableOpacity>
      </View>

      {/* The top-most line starting the list */}
      <View className="h-[1px] bg-gray-100 w-full" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {addresses.map((item) => {
          const isSelected = selectedId === item.id;
          return (
            <View key={item.id}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedId(item.id)}
                className="flex-row items-start px-4 py-8"
              >
                {/* Custom Radio Button */}
                <View className="mr-4 mt-1">
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                      isSelected ? "border-[#a3cc39]" : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <View className="w-3 h-3 rounded-full bg-[#a3cc39]" />
                    )}
                  </View>
                </View>

                {/* Address Details */}
                <View className="flex-1">
                  <Text className="text-lg text-gray-800 font-medium mb-1">
                    {item.name}
                  </Text>
                  <Text className="text-gray-500 leading-5 text-sm w-[90%]">
                    {item.details}
                  </Text>
                  <Text className="text-gray-500 mt-1 text-sm">
                    {item.phone}
                  </Text>
                </View>

                {/* Edit Icon */}
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/addAddress",
                      params: { edit: "true", id: item.id },
                    })
                  }
                  className="pt-1"
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    size={24}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              {/* The line between each address */}
              <View className="h-[1px] bg-gray-100 w-full" />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressListPage;
