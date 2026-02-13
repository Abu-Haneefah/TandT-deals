import { AntDesign, Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

// Improved TabIcon to handle Vector Icons correctly
const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: React.ReactNode;
  title: string;
}) => (
  <View className="flex flex-col items-center justify-center mt-4">
    <View>{icon}</View>
    <Text
      className={`${
        focused ? "text-main font-bold" : "text-gray-500"
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
          paddingBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <AntDesign
                  name="home"
                  size={24}
                  color={focused ? "#B0D235" : "#000000"}
                />
              }
              focused={focused}
              title="Home"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <AntDesign
                  name="bars"
                  size={24}
                  color={focused ? "#B0D235" : "#000000"}
                />
              }
              focused={focused}
              title="Categories"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <AntDesign
                  name="shopping-cart"
                  size={24}
                  color={focused ? "#B0D235" : "#000000"}
                />
              }
              focused={focused}
              title="Cart"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Feather
                  name="heart"
                  size={24}
                  color={focused ? "#B0D235" : "#000000"}
                />
              }
              focused={focused}
              title="Wishlist"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              icon={
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#B0D235" : "#000000"}
                />
              }
              focused={focused}
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
