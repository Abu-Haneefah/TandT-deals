import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./Button";

const SucessPage = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.navigate("/SignIn");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/*  Back Button  */}
      <View className="px-4 pt-4">
        <TouchableOpacity
          onPress={handleBackPress}
          className="flex-row items-center gap-2"
        >
          <AntDesign name="arrow-left" size={20} color={"black"} />
          <Text className="text-base font-medium">Back</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Main Content Container: flex-1 and justify-center centers everything inside it */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Success Icon */}
        <View className="rounded-full bg-[#a3cc39] p-4 mb-6 shadow-lg shadow-[#a3cc39]/40">
          <AntDesign name="check" size={50} color={"white"} />
        </View>

        {/* Text Content */}
        <View className="items-center w-full mb-8">
          <Text className="text-2xl font-bold text-gray-900 text-center">
            Account Created Successfully!
          </Text>
          <Text className="text-xs text-gray-400 text-center mt-3 leading-5">
            Your account has been created and is ready to use. Please login with
            your credentials to access your new account.
          </Text>
        </View>

        {/* Action Button */}
        <Button title="Sign in" onPress={() => router.navigate("/SignIn")} />
      </View>
    </SafeAreaView>
  );
};

export default SucessPage;
