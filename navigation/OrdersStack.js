import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "../screens/OrdersScreen";
import OrderDetailScreen from "../screens/OrderDetailScreen";
import { COLORS, FONTS } from "../theme";

const Stack = createNativeStackNavigator();

export default function OrdersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.gold,
        headerTitleStyle: { fontFamily: FONTS.bodySemiBold },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="OrdersList" component={OrdersScreen} options={{ title: "My Orders" }} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} options={{ title: "Order Details" }} />
    </Stack.Navigator>
  );
}