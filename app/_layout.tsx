import { Colors, Fonts } from "@/constants/theme"; // your theme file path
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { useColorScheme, View } from "react-native";

import { useFonts } from "expo-font";
import { AuthProvider } from "@/context/userContext";
import { SafeAreaProvider } from "react-native-safe-area-context";



export default function RootLayout() {
  const colorScheme = useColorScheme() ?? "light";

  const [fontsLoaded] = useFonts({
    "MozillaHeadline-Regular": require("../assets/fonts/MozillaHeadline-Regular.ttf"),
    "MozillaHeadline-Bold": require("../assets/fonts/MozillaHeadline-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null; // or a splash/loading screen
  }

  const CustomTheme = useMemo(
    () => ({
      dark: colorScheme === "dark",
      colors: {
        ...(colorScheme === "dark"
          ? NavigationDarkTheme.colors
          : NavigationDefaultTheme.colors),
        ...Colors[colorScheme],
      },
      fonts: {
        regular: {
          fontFamily: Fonts.sans,
          fontWeight: "normal" as const,
        },
        medium: {
          fontFamily: Fonts.serif,
          fontWeight: "500" as const,
        },
        bold: {
          fontFamily: Fonts.rounded,
          fontWeight: "bold" as const,
        },
        heavy: {
          fontFamily: Fonts.mono,
          fontWeight: "900" as const,
        },
      },
    }),
    [colorScheme]
  );

  return (
    <View style={{ flex: 1 }}>
      <AuthProvider>

        <ThemeProvider value={CustomTheme}>
          <SafeAreaProvider>

            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
          </SafeAreaProvider>
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        </ThemeProvider>
      </AuthProvider>
    </View>
  );
}
