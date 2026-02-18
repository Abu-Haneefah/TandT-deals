import { useUserStore } from "@/store/userStore";
import { Feather, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { isLoggedIn, user, logout } = useUserStore();

  const router = useRouter();

  const handleSingIn = () => {
    router.navigate("/SignIn");
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center px-6">
        <View className="bg-gray-50 p-10 rounded-full mb-6 border border-gray-100">
          <Feather name="user" size={80} color="#a3cc39" />
        </View>
        <Text className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Unlock Your Experience
        </Text>
        <Text className="text-gray-500 text-center mb-10 leading-5">
          Join us today to track your orders, save your favorites, and manage
          your account seamlessly.
        </Text>
        <Link href={"/SignUp"}>
          <View className="bg-[#a3cc39] w-full py-4 rounded-2xl items-center shadow-lg shadow-[#a3cc39]/40">
            <Text className="text-white font-bold text-lg">Sign Up </Text>
          </View>
        </Link>

        <TouchableOpacity
          className="bg-[#a3cc39] w-full mt-4 py-4 rounded-2xl items-center shadow-lg shadow-[#a3cc39]/40"
          onPress={handleSingIn}
        >
          <Text className="text-white font-bold text-lg"> Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header Section */}
        <View className="px-6 py-8 bg-gray-50 border-b border-gray-100">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-500 text-sm font-medium">
                Welcome back,
              </Text>
              <Text className="text-2xl font-bold text-gray-900">
                {user?.fullName || "Fatai"}
              </Text>
              <Text className="text-gray-400 text-xs mt-1">
                {user?.email || "aabdfatahi@gmail.com"}
              </Text>
            </View>
            <View className="h-14 w-14 rounded-full bg-[#a3cc39] items-center justify-center border-2 border-white shadow-sm">
              <Text className="text-white font-bold text-xl">F</Text>
            </View>
          </View>

          {/* Wallet/Credit Preview */}
          <TouchableOpacity className="mt-6 bg-[#0a1128] p-4 rounded-2xl flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="bg-white/10 p-2 rounded-lg mr-3">
                <Ionicons name="wallet-outline" size={20} color="#a3cc39" />
              </View>
              <Text className="text-white font-medium">
                Store Credit Balance
              </Text>
            </View>
            <Text className="text-[#a3cc39] font-bold text-lg">₦ 0</Text>
          </TouchableOpacity>
        </View>

        {/* Support Quick Actions */}
        <View className="flex-row px-4 mt-6 gap-3">
          <SupportBtn
            icon="chatbubble-ellipses-outline"
            label="Live Chat"
            color="#f97316"
          />
          <SupportBtn icon="logo-whatsapp" label="WhatsApp" color="#22c55e" />
        </View>

        {/* Account Settings Groups */}
        <View className="mt-6 px-4 pb-10">
          <SectionHeader title="My Account" />
          <MenuLink icon="package" label="Orders" count={2} />
          <MenuLink icon="mail" label="Inbox" />
          <MenuLink icon="star" label="Ratings & Reviews" />
          <MenuLink icon="heart" label="Wishlist" />
          <MenuLink icon="users" label="Followed Sellers" />

          <SectionHeader title="My Settings" />
          <MenuLink icon="credit-card" label="Payment Settings" />
          <MenuLink icon="map-pin" label="Address Book" />
          <MenuLink icon="settings" label="Account Management" />
          <MenuLink icon="bell" label="Notification Preferences" />

          {/* Logout Button */}
          <TouchableOpacity
            onPress={logout}
            className="mt-8 mb-8 flex-row items-center justify-center py-4 rounded-2xl border border-red-100 bg-red-50"
          >
            <SimpleLineIcons name="logout" size={16} color="#ef4444" />
            <Text className="ml-2 text-red-500 font-bold">
              Log out from account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Sub-Components ---

const SupportBtn = ({
  icon,
  label,
  color,
}: {
  icon: any;
  label: string;
  color: string;
}) => (
  <TouchableOpacity className="flex-1 flex-row items-center justify-center py-3 rounded-xl border border-gray-100 bg-white shadow-sm">
    <Ionicons name={icon} size={18} color={color} />
    <Text className="ml-2 font-bold text-gray-700 text-xs">{label}</Text>
  </TouchableOpacity>
);

const SectionHeader = ({ title }: { title: string }) => (
  <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-6 mb-3 px-2">
    {title}
  </Text>
);

const MenuLink = ({
  icon,
  label,
  count,
}: {
  icon: any;
  label: string;
  count?: number;
}) => (
  <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-gray-50 px-2">
    <View className="flex-row items-center">
      <View className="bg-gray-50 p-2 rounded-lg mr-4">
        <Feather name={icon} size={18} color="#6b7280" />
      </View>
      <Text className="text-gray-800 font-medium">{label}</Text>
    </View>
    <View className="flex-row items-center">
      {count && (
        <View className="bg-[#a3cc39] px-2 py-0.5 rounded-full mr-2">
          <Text className="text-white text-[10px] font-bold">{count}</Text>
        </View>
      )}
      <Feather name="chevron-right" size={16} color="#d1d5db" />
    </View>
  </TouchableOpacity>
);

export default Profile;
