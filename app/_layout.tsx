import React, { useMemo } from "react";
import { View } from "react-native";
import { ThemeProvider, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native"; // detects system theme
import { Colors, Fonts } from "@/constants/theme"; // your theme file path

import { useFonts } from "expo-font";



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
      <ThemeProvider value={CustomTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </ThemeProvider>
    </View>
  );
}
