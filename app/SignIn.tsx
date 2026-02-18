import { useUserStore } from "@/store/userStore";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/Button";

const SignIn = () => {
  const { login } = useUserStore();
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleBackPress = () => {
    router.navigate("/(tabs)/account");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Back Button */}
      <View className="px-4 pt-4">
        <TouchableOpacity
          onPress={handleBackPress}
          className="flex-row items-center gap-2"
        >
          <AntDesign name="arrow-left" size={20} color={"black"} />
          <Text className="text-base font-medium">Back</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-8 pt-10">
        {/* Header Text */}
        <View className="items-center mb-10">
          <Text className="text-3xl font-bold text-gray-900">Welcome Back</Text>
          <Text className="text-sm text-gray-400 mt-2 text-center">
            Sign in to pick up where you left off.
          </Text>
        </View>

        {/* Email/Phone Field */}
        <View className="mb-5">
          <Text className="text-sm text-gray-400 mb-2 ml-1">
            Email / Phone number
          </Text>
          <TextInput
            placeholder="Enter your email or phone"
            placeholderTextColor="#9ca3af"
            className="border h-14 w-full rounded-xl border-gray-300 px-4 text-base focus:border-[#a3cc39]"
          />
        </View>

        {/* Password Field */}
        <View className="mb-2 mt-6">
          <Text className="text-sm text-gray-400 mb-2 ml-1">Password</Text>
          <View className="relative w-full ">
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              className="border h-14 w-full rounded-xl border-gray-300 px-4 text-base focus:border-[#a3cc39]"
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-10  top-10 bottom-10"
            >
              <AntDesign
                name={isPasswordVisible ? "eye" : "eye-invisible"}
                size={22}
                color={"#9ca3af"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity className="items-end mb-8">
          <Text className="text-[#a3cc39] font-semibold text-sm">
            Forgot Password?
          </Text>
        </TouchableOpacity>

        {/* Action Button */}
        <View className="items-center">
          <Button
            title="Sign in"
            onPress={() =>
              login({
                fullName: "User",
                email: "user@example.com",
                phone: "",
                country: "",
              })
            }
          />
        </View>

        {/* Footer Link */}
        <View className="flex-row justify-center mt-8">
          <Text className="text-gray-500">Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/SignUp")}>
            <Text className="text-[#a3cc39] font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
