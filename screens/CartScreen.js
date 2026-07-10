import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import CustomButton from "../components/CustomButton";
import { COLORS, FONTS } from "../theme";

export default function CartScreen({ navigation }) {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <CustomButton title="Browse Gifts" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
            onRemove={() => removeFromCart(item.productId)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 12 }}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: Rs. {totalAmount.toFixed(2)}</Text>
        <CustomButton title="Proceed to Checkout" onPress={() => navigation.navigate("Checkout")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
    marginBottom: 16,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  totalText: {
    fontSize: 17,
    fontFamily: FONTS.heading,
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
});
