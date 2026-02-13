import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const router = useRouter();

  const handleBackPress = () => {
    router.back();
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <TouchableOpacity
          onPress={handleBackPress}
          className="flex flex-row justify-start gap-4 p-4 mt-2"
        >
          <AntDesign name="arrow-left" size={20} color={"black"} />
          <Text>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
