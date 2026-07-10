import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import MainTabs from "./MainTabs";
import LoadingSpinner from "../components/LoadingSpinner";
import { COLORS } from "../theme";

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.textPrimary,
    border: COLORS.border,
    primary: COLORS.gold,
  },
};

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <NavigationContainer theme={navTheme}>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
