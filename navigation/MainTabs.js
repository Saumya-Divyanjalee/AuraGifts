import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";
import HomeStack from "./HomeStack";
import OrdersStack from "./OrdersStack";
import ProfileScreen from "../screens/ProfileScreen";
import { COLORS, FONTS } from "../theme";

const Tab = createBottomTabNavigator();

const TabIcon = ({ label, focused }) => (
  <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.4 }}>{label}</Text>
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
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
        options={{ title: "Home", tabBarIcon: ({ focused }) => <TabIcon label="🏠" focused={focused} /> }}
      />
       <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{ title: "Orders", headerShown: false, tabBarIcon: ({ focused }) => <TabIcon label="📦" focused={focused} /> }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Profile", tabBarIcon: ({ focused }) => <TabIcon label="👤" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}
