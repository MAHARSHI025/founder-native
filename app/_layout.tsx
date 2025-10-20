import React, { useEffect, useCallback, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// 👇 Keep the splash visible until we manually hide it
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const colorScheme = "light";

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts or any async tasks here
        await Font.loadAsync({
          "MozillaHeadline-Regular": require("../assets/fonts/MozillaHeadline-Regular.ttf"),
        });

        // You can simulate loading with a delay (optional)
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        // 👇 Tell the app that loading is complete
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  // 👇 Callback when layout is ready (ensures splash hides smoothly)
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; // Keep splash visible (don’t render UI)
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider value={colorScheme === "light" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </View>
  );
}
