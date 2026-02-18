import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./components/Button";
import LogoLoader from "./components/Loader";

const CheckoutPage = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("pod");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [orderStatus, setOrderStatus] = useState<"idle" | "success" | "failed">(
    "idle",
  );
  const [isLoading, setIsLoading] = useState(false);

  const [address] = useState({
    name: "Andrew Garfield",
    details: "No 71, Alaka highway opp 21 Barracks Alimosho, Ibadan",
    phone: "+234 801 859 9874",
  });

  const handleFinalConfirm = () => {
    setIsLoading(true);
    // Simulate API Call with a 3-second delay
    setTimeout(() => {
      setIsLoading(false);
      const isSuccessful = Math.random() > 0.1; // 90% success rate
      setOrderStatus(isSuccessful ? "success" : "failed");
    }, 3000);
  };

  const cartItems = [
    {
      id: 1,
      name: "Apple iPhone 12 Pro, 128GB, Silver - Fully Unlocked",
      price: "₦400,128",
    },
    { id: 2, name: "Apple iPhone 12 Pro, 128GB...", price: "₦400,128" },
  ];

  // --- RESULT STATES (Success / Failure) ---
  if (orderStatus !== "idle") {
    const isSuccess = orderStatus === "success";
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <View className="items-center mb-8">
          <View
            className={`w-24 h-24 rounded-full items-center justify-center mb-6 ${isSuccess ? "bg-[#f9fcf0]" : "bg-red-50"}`}
          >
            <View
              className={`w-16 h-16 rounded-full items-center justify-center ${isSuccess ? "bg-[#a3cc39]" : "bg-red-500"}`}
            >
              <Feather
                name={isSuccess ? "check" : "x"}
                size={40}
                color="white"
              />
            </View>
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            {isSuccess ? "Order Confirmed" : "Payment Failed"}
          </Text>
          <Text className="text-gray-400 text-center text-sm px-4">
            {isSuccess
              ? "Your order has been placed successfully."
              : "We couldn't process your payment. Please check your balance or try again."}
          </Text>
        </View>

        <View className="w-full">
          <Button
            title={isSuccess ? "Continue Shopping" : "Try Again"}
            onPress={() =>
              isSuccess ? router.push("/home") : setOrderStatus("idle")
            }
          />
          {isSuccess && (
            <TouchableOpacity className="w-full py-4 border border-gray-200 rounded-xl items-center mt-4">
              <Text className="text-gray-500 font-bold">Track Order</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading && <LogoLoader />}

      {/* Header */}
      <View className="flex-row items-center px-4 py-2 border-b border-gray-50">
        <TouchableOpacity
          onPress={() => (isConfirmed ? setIsConfirmed(false) : router.back())}
          className="mr-2"
        >
          <Feather name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-gray-400 text-sm">
          {isConfirmed ? "Back to Address" : "Address"}
        </Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {!isConfirmed ? (
          /* SECTION 1: SELECTION VIEW */
          <View className="px-4 mt-4">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-lg font-bold text-gray-800">
                Delivery Address
              </Text>
              <TouchableOpacity onPress={() => router.push("/addressList")}>
                <Text className="text-[#a3cc39] font-bold">Change</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-start mb-10">
              <Checkbox
                value={true}
                color="#a3cc39"
                className="rounded-full w-6 h-6 mr-3"
              />
              <View className="flex-1">
                <Text className="font-bold text-lg text-gray-800">
                  {address.name}
                </Text>
                <Text className="text-gray-500 text-sm mt-1 leading-5">
                  {address.details}
                </Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {address.phone}
                </Text>
              </View>
              <Feather name="edit-3" size={20} color="#9ca3af" />
            </View>

            <Text className="text-lg font-bold text-gray-800 mb-6">
              Payment Method
            </Text>
            <PaymentOption
              label="Pay on Delivery"
              selected={selectedPayment === "pod"}
              onSelect={() => setSelectedPayment("pod")}
              showInfo={true}
            />
            <PaymentOption
              label="Pay with Escrow"
              selected={selectedPayment === "escrow"}
              onSelect={() => setSelectedPayment("escrow")}
            />
            <PaymentOption
              label="Pay with card, Bank transfer or USSD"
              selected={selectedPayment === "online"}
              onSelect={() => setSelectedPayment("online")}
            />

            <View className="mt-8 mb-10">
              <Button
                title="Confirm Order"
                onPress={() => setIsConfirmed(true)}
              />
            </View>
          </View>
        ) : (
          /* SECTION 2: REVIEW VIEW */
          <View className="px-4 py-4">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Review Order
            </Text>
            {cartItems.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center mb-6 pb-6 border-b border-gray-50"
              >
                <View className="w-16 h-16 bg-gray-50 rounded-lg items-center justify-center mr-4">
                  <Feather name="smartphone" size={30} color="#ccc" />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-gray-600 text-sm font-medium"
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                  <Text className="font-bold text-gray-800">{item.price}</Text>
                </View>
              </View>
            ))}

            <ReviewSection
              title="Delivery Address"
              content={`${address.name}\n${address.details}`}
            />
            <ReviewSection
              title="Payment Method"
              content={
                selectedPayment === "pod" ? "Pay on Delivery" : "Online Payment"
              }
            />
            <ReviewSection
              title="Delivery Timeline"
              content="29 July - 30 July"
              last
            />

            <Button title="Place Order" onPress={handleFinalConfirm} />
            <View className="h-10" />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// --- SUB-COMPONENTS ---

const ReviewSection = ({ title, content, last }: any) => (
  <View className="mb-6">
    <Text className="text-gray-400 font-bold text-xs uppercase mb-2 tracking-wider">
      {title}
    </Text>
    <Text className="text-gray-600 text-sm leading-5">{content}</Text>
    {!last && <View className="h-[1px] bg-gray-50 w-full mt-4" />}
  </View>
);

const PaymentOption = ({ label, selected, onSelect, showInfo }: any) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onSelect} className="mb-5">
    <View className="flex-row items-center">
      <Checkbox
        value={selected}
        onValueChange={onSelect}
        color={selected ? "#a3cc39" : undefined}
        className="rounded-full w-6 h-6 mr-3"
      />
      <Text className="text-gray-600 text-base">{label}</Text>
    </View>
    {selected && showInfo && (
      <View className="ml-9 mt-3 p-4 bg-[#f9fcf0] rounded-xl border border-[#eef7d3]">
        <Text className="text-[#a3cc39] text-[11px] font-bold mb-1">
          Notice:
        </Text>
        <Text className="text-gray-500 text-[10px]">
          POD is not available for orders above ₦100,000.
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

export default CheckoutPage;
