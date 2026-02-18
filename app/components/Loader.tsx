import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface LogoLoaderProps {
  message?: string;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

const LogoLoader: React.FC<LogoLoaderProps> = ({
  message = "Processing Order...",
}) => {
  const opacity = useRef(new Animated.Value(0.4)).current;
  const scale = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.05,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.95,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [opacity, scale]);

  return (
    <View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: "white",
          zIndex: 99999,
          width: screenWidth,
          height: screenHeight,
          elevation: 0,
          shadowOpacity: 0,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Animated.View
        style={{
          opacity,
          // Nudging the content up by 40 pixels for optical balance
          transform: [{ scale }, { translateY: -40 }],
        }}
        className="items-center"
      >
        <Image
          source={require("../../assets/images/brandLogo.png")}
          style={{ width: 180, height: 180 }}
          resizeMode="contain"
        />

        <Text className="mt-10 text-[#a3cc39] font-bold tracking-[6px] uppercase text-sm text-center">
          {message}
        </Text>

        <View className="mt-4 px-8 py-1 border border-gray-100 rounded-full">
          <Text className="text-gray-400 text-[9px] font-bold tracking-[2px] uppercase">
            Secure Encryption Active
          </Text>
        </View>
      </Animated.View>

      <View style={{ position: "absolute", bottom: 60 }}>
        <Text className="text-gray-300 text-[10px] font-medium tracking-[3px] text-center">
          PLEASE DO NOT CLOSE THE APP
        </Text>
      </View>
    </View>
  );
};

export default LogoLoader;
