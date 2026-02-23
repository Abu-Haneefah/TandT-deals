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

// Keep the native splash screen visible until we tell it to hide
SplashScreen.preventAutoHideAsync().catch(() => {});

const { width, height } = Dimensions.get("screen");

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showAnimation, setShowAnimation] = useState(true);

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  // Phase 1: Preparation
  useEffect(() => {
    async function prepare() {
      try {
        // Reduced to 1000ms. Over a tunnel, 2000ms + animations
        // feels like the app is broken.
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  // Phase 2: Animation Sequence
  useEffect(() => {
    if (appIsReady) {
      /**
       * CRITICAL FIX: Hide the native splash screen NOW.
       * This reveals the 'overlay' View below so the user sees
       * your animation starting.
       */
      SplashScreen.hideAsync().catch(() => {});

      Animated.sequence([
        // Phase 1: Fade and Spring In
        Animated.parallel([
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.spring(logoScale, {
            toValue: 1,
            friction: 6,
            tension: 40,
            useNativeDriver: true,
          }),
        ]),

        // Phase 2: "The Breath"
        Animated.timing(logoScale, {
          toValue: 1.05,
          duration: 1200,
          useNativeDriver: true,
        }),

        // Phase 3: Sophisticated exit (Zoom and Fade)
        Animated.parallel([
          Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(logoScale, {
            toValue: 2.5,
            duration: 850,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Remove the overlay from the DOM entirely so users can interact with the app
        setShowAnimation(false);
      });
    }
  }, [appIsReady, logoOpacity, logoScale, overlayOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0e1525" />

      {/* The actual app mounts here behind the animation */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>

      {/* Custom Animated Splash Overlay */}
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
