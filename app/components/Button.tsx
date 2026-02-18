import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  title: string;
  disabled?: boolean;
  icon?: ReactNode; // Accept any icon component
}

const Button = ({ onPress, title, disabled, icon }: ButtonProps) => {
  return (
    <View className="items-center w-full">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        disabled={disabled}
        className={`${
          disabled ? "bg-gray-300" : "bg-main"
        } w-full rounded-md py-4 mt-4 flex-row justify-center items-center`}
      >
        <Text className="text-center text-black font-semibold mr-2">
          {title}
        </Text>
        {icon && <View>{icon}</View>}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
