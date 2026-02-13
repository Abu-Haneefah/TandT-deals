import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl text-main font-bold mb-4">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text className="text-red-500">Hello Screen</Text>
    </View>
  );
}
