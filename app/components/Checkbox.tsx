import Checkbox from "expo-checkbox";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TermsCheckboxProps {
  isChecked: boolean;
  onValueChange: (value: boolean) => void;
}

const TermsCheckbox = ({ isChecked, onValueChange }: TermsCheckboxProps) => {
  return (
    <View className="flex-row items-start w-full mb-6">
      <Checkbox
        value={isChecked}
        onValueChange={onValueChange}
        // color: Background when checked, border when unchecked
        color={isChecked ? "#a3cc39" : "#d1d5db"}
        style={{
          width: 20,
          height: 20,
          borderRadius: 5,
          marginTop: 2,
        }}
      />

      <View className="ml-3 items-center justify-center mt-1 flex-1 flex-row flex-wrap ">
        <Text className="text-sm text-gray-500">I accept the </Text>
        <TouchableOpacity>
          <Text className="text-sm text-[#a3cc39] font-bold">
            Terms and Conditions
          </Text>
        </TouchableOpacity>
        <Text className="text-sm text-gray-500"> and </Text>
        <TouchableOpacity>
          <Text className="text-sm text-[#a3cc39] font-bold">
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsCheckbox;
