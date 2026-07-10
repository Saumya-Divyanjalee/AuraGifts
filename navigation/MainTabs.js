import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import OrdersStack from "./OrdersStack";
import ProfileScreen from "../screens/ProfileScreen";
import { useThemeColors } from "../context/ThemeContext";
import { FONTS } from "../theme";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const insets = useSafeAreaInsets();
  const { colors } = useThemeColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontFamily: FONTS.bodyMedium,
          fontSize: 11,
        },
      }}
    >      
    <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{
          title: "Orders",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "receipt" : "receipt-outline"} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "person-circle" : "person-circle-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}