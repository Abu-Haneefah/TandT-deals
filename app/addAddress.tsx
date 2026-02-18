import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/Button";

const AddAddress = () => {
  const router = useRouter();
  const { edit } = useLocalSearchParams();
  const [isDefault, setIsDefault] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header with Back Button */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="mr-2">
          <Feather name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">
          {edit ? "Edit Address" : "Add Address"}
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="mt-4">
          <InputField label="First Name" placeholder="Enter Name..." />
          <InputField label="Last Name" placeholder="Enter last name" />
          <InputField
            label="Delivery Address"
            placeholder="Enter preferred address"
          />

          {/* Manually input State and City */}
          <InputField label="State" placeholder="Enter state" />
          <InputField label="City" placeholder="Enter city" />

          <InputField
            label="Phone Number"
            placeholder="+234"
            keyboardType="phone-pad"
          />

          <InputField
            label="Alternative Phone number"
            placeholder="+234"
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            className="flex-row items-center mb-8"
            onPress={() => setIsDefault(!isDefault)}
            activeOpacity={0.8}
          >
            <Checkbox
              value={isDefault}
              onValueChange={setIsDefault}
              color={isDefault ? "#a3cc39" : undefined}
              className="w-5 h-5 mr-3 border-gray-300 rounded"
            />
            <Text className="text-gray-500 text-sm">
              Set as default address
            </Text>
          </TouchableOpacity>

          <Button title="Save Address" onPress={() => router.back()} />

          <TouchableOpacity
            onPress={() => router.back()}
            className="items-center mt-6 mb-10"
          >
            <Text className="text-gray-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InputField = ({ label, ...props }: any) => (
  <View className="mb-4">
    <Text className="text-gray-500 text-xs mb-1">{label}</Text>
    <TextInput
      className="border border-gray-200 rounded-lg p-3 text-gray-800"
      placeholderTextColor="#ccc"
      {...props}
    />
  </View>
);

export default AddAddress;
