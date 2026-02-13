import { Stack } from "expo-router";
import React from "react";
import "./global.css";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* This ensures the (tabs) group is the main entry point */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
