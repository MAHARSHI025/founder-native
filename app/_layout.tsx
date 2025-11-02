import { Colors, Fonts } from "@/constants/theme";
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { useColorScheme, View } from "react-native";
import { useFonts } from "expo-font";
import { AuthProvider } from "@/context/userContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomSplashScreen from "@/components/splash-screen";
import Toast from 'react-native-toast-message'

// ✅ Prevent auto hide at app start
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = "light";

  // ✅ Load fonts before hiding splash
  const [fontsLoaded] = useFonts({
    "MozillaHeadline-Regular": require("../assets/fonts/MozillaHeadline-Regular.ttf"),
    "MozillaHeadline-Bold": require("../assets/fonts/MozillaHeadline-Bold.ttf"),
  });

  const [showCustomSplash, setShowCustomSplash] = useState(true);

  useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  if (showCustomSplash) {
    return <CustomSplashScreen onFinish={() => setShowCustomSplash(false)} />;
  }

  const CustomTheme = useMemo(
    () => ({
      dark: false, // ✅ FORCE LIGHT MODE
      colors: {
        ...NavigationDefaultTheme.colors,
        ...Colors.light, // ✅ use your custom light palette
      },
      fonts: {
        regular: { fontFamily: Fonts.sans, fontWeight: "normal" as const },
        medium: { fontFamily: Fonts.serif, fontWeight: "500" as const },
        bold: { fontFamily: Fonts.rounded, fontWeight: "bold" as const },
        heavy: { fontFamily: Fonts.mono, fontWeight: "900" as const },
      },
    }),
    []
  );


  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider value={CustomTheme}>
          <SafeAreaProvider >
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'simple_push' }} />
              <Stack.Screen name="login" options={{ presentation: "modal", headerShown: false }} />
              <Stack.Screen name="contact" options={{ presentation: "card", headerShown: true, title:'Contacts', headerBackTitle:'Back' }} />
              <Stack.Screen name="chat" options={{ animation:'simple_push', headerShown: false  }} />
            </Stack>
            <Toast />
          </SafeAreaProvider>
          <StatusBar style={colorScheme === "light" ? "dark" : "light"} />
        </ThemeProvider>
      </AuthProvider>
    </View>
  );
}
