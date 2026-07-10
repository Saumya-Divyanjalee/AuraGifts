import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts as usePlayfair,
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { useFonts as useBungee, Bungee_400Regular } from "@expo-google-fonts/bungee";import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppNavigator from "./navigation/AppNavigator";
import { COLORS } from "./theme";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [playfairLoaded] = usePlayfair({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });
   const [poppinsLoaded] = usePoppins({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });
  const [bungeeLoaded] = useBungee({ Bungee_400Regular });

  const fontsLoaded = playfairLoaded && poppinsLoaded && bungeeLoaded;
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

   return (
    <SafeAreaProvider>
      <ThemeProvider>
        <View style={{ flex: 1, backgroundColor: COLORS.background }} onLayout={onLayoutRootView}>
          <AuthProvider>
            <CartProvider>
              <StatusBar style="light" />
              <AppNavigator />
            </CartProvider>
          </AuthProvider>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
