import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/orderService";
import CustomButton from "../components/CustomButton";
import { COLORS, FONTS, RADIUS } from "../theme";

export default function CheckoutScreen({ navigation }) {
  const { items, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  // NOTE: This is a MOCK payment step. To use a real gateway (e.g. PayHere):
  // 1. Replace this function body with a WebView that loads the PayHere hosted
  //    checkout URL, built from a hash generated on a backend/Cloud Function
  //    (never put the merchant secret in the app itself).
  // 2. On the payment success redirect/notify_url, call updateOrderStatus(orderId, "paid").
  const handlePayment = async () => {
    if (items.length === 0) return;
    setProcessing(true);
    try {
      const orderId = await createOrder(user.uid, items, totalAmount);

      setTimeout(() => {
        setProcessing(false);
        clearCart();
         Alert.alert("Payment Successful", "Your gift order has been placed!", [
          { text: "View Orders", onPress: () => navigation.navigate("OrdersTab") },
        ]);
      }, 1500);
    } catch (e) {
      setProcessing(false);
      Alert.alert("Order Failed", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Summary</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
            <Text style={styles.itemPrice}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>Rs. {totalAmount.toFixed(2)}</Text>
      </View>

      <Text style={styles.note}>
        Payment method: Mock Gateway (swap for PayHere WebView when ready)
      </Text>

      <CustomButton title="Pay Now" onPress={handlePayment} loading={processing} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    fontSize: 19,
    fontFamily: FONTS.heading,
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    borderRadius: RADIUS.card,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 13,
    fontFamily: FONTS.body,
    color: COLORS.textPrimary,
  },
  itemPrice: {
    fontSize: 13,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.gold,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 17,
    fontFamily: FONTS.heading,
    color: COLORS.textPrimary,
  },
  totalValue: {
    fontSize: 17,
    fontFamily: FONTS.heading,
    color: COLORS.gold,
  },
  note: {
    fontSize: 11,
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
    marginBottom: 16,
    textAlign: "center",
  },
});
