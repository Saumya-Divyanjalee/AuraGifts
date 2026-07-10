import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import ManageProductsScreen from "../screens/ManageProductsScreen";
import AddEditProductScreen from "../screens/AddEditProductScreen";
import { COLORS, FONTS } from "../theme";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.gold,
        headerTitleStyle: { fontFamily: FONTS.bodySemiBold },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: "Gift Details" }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: "My Cart" }} />
     <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Checkout" }} />
      <Stack.Screen name="ManageProducts" component={ManageProductsScreen} options={{ title: "Manage Products" }} />
      <Stack.Screen name="AddEditProduct" component={AddEditProductScreen} options={{ title: "Add / Edit Product" }} />
    </Stack.Navigator>  );
}
