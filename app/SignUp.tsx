import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/Button";
import TermsCheckbox from "./components/Checkbox";

const SignUp = () => {
  const router = useRouter();

  const handleSucess = () => {
    router.navigate("/components/SucessPage");
  };

  const handleBackPress = () => {
    router.back();
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="ml-2">
        <TouchableOpacity
          onPress={handleBackPress}
          className="flex flex-row justify-between p-3 mt-2"
        >
          <View className="flex flex-row gap-4">
            <AntDesign name="arrow-left" size={20} color={"black"} />
            <Text>Back</Text>
          </View>

          <TouchableOpacity className="">
            <Text className="text-sm text-main">Sign up as seller</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View className="flex flex-col justify-center items-center mt-4">
          <Text className="text-3xl">Create an account</Text>
          <Text className="text-gray-400 text-sm">
            Let&apos;s get you started
          </Text>
        </View>

        <View className="mx-6 my-4">
          {/* Full Name */}
          <View className="flex flex-col gap-1 mb-4">
            <Text className="text-sm text-gray-400">Full Name</Text>
            <TextInput
              className="border w-11/12 rounded-md border-gray-400 placeholder-gray-400 pl-4"
              placeholder="Enter your full name"
            />
          </View>
          {/* Email */}
          <View className="flex flex-col gap-1 mb-4">
            <Text className="text-sm text-gray-400">Email Address</Text>
            <TextInput
              className="border w-11/12 rounded-md border-gray-400 placeholder-gray-400 pl-4"
              placeholder="Enter your Email Address"
            />
          </View>
          {/* Phone Number */}
          <View className="flex flex-col gap-1 mb-4">
            <Text className="text-sm text-gray-400">Phone Number</Text>
            <TextInput
              className="border w-11/12 rounded-md border-gray-400 placeholder-gray-400 pl-4"
              placeholder="Enter your Phone Number"
              keyboardType="numeric"
            />
          </View>
          {/* Password */}
          <View className="flex flex-col gap-1 mb-4 ">
            <Text className="text-sm text-gray-400">Password</Text>
            <TextInput
              className="border w-11/12 rounded-md border-gray-400 placeholder-gray-400 pl-4"
              placeholder="Enter your Password"
              secureTextEntry
            />
            <TouchableOpacity className="absolute right-10  top-10">
              <AntDesign name="eye" size={20} color={"gray"} />
            </TouchableOpacity>
          </View>
          {/* Confirm Password */}
          <View className="flex flex-col gap-1 mb-4 ">
            <Text className="text-sm text-gray-400"> Confirm Password</Text>
            <TextInput
              className="border w-11/12 rounded-md border-gray-400 placeholder-gray-400 pl-4"
              placeholder="Enter your Password"
              secureTextEntry
            />
            <TouchableOpacity className="absolute right-10  top-10">
              <AntDesign name="eye" size={20} color={"gray"} />
            </TouchableOpacity>
          </View>
          {/* Checkbox */}
          <TermsCheckbox isChecked={false} onValueChange={() => {}} />

          {/* Sign Up Button */}
          <View>
            <Button title="Sign Up" onPress={handleSucess} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
