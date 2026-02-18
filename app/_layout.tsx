import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import "./global.css";

SplashScreen.preventAutoHideAsync().catch(() => {});

const { width, height } = Dimensions.get("screen");

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current; // Start smaller for more travel
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    async function prepare() {
      try {
        // Increase the initial wait time to ensure the app is fully loaded behind the scenes
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      Animated.sequence([
        // Phase 1: Smooth, slower fade in (800ms)
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(logoScale, {
            toValue: 1,
            friction: 6, // More "bounciness"
            tension: 40,
            useNativeDriver: true,
          }),
        ]),

        // Phase 2: "The Breath" - Logo grows very slightly while waiting
        // This makes the wait feel intentional and high-end
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),

        // Phase 3: Sophisticated exit
        // We fade the overlay and zoom the logo out simultaneously
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 800, // Slower fade out
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 2.5, // Zooming "into" the screen
            duration: 850,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        setShowAnimation(false);
        SplashScreen.hideAsync();
      });
    }
  }, [appIsReady, logoOpacity, logoScale, overlayOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0e1525" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {showAnimation && (
        <Animated.View
          pointerEvents="none"
          style={[styles.overlay, { opacity: overlayOpacity }]}
        >
          <Animated.Image
            source={require("../assets/images/brandLogo.png")}
            style={[
              styles.logo,
              {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
              },
            ]}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0e1525",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0e1525",
    zIndex: 99999,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
  },
  logo: {
    width: 180,
    height: 180,
  },
});
