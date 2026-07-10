import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";
import { useThemeColors } from "../context/ThemeContext";
import CartItem from "../components/CartItem";
import CustomButton from "../components/CustomButton";
import { FONTS } from "../theme";

export default function CartScreen({ navigation }) {
  const { items, updateQuantity, removeFromCart, totalAmount } = useCart();
  const { colors } = useThemeColors();

  if (items.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.emptyIcon}>🎁💤</Text>
        <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Your cart is taking a nap</Text>
        <Text style={[styles.emptyText, { color: colors.textMuted }]}>No gifts here yet — go find something calming to add.</Text>
        <CustomButton title="Browse Gifts" onPress={() => navigation.navigate("Home")} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
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

      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <Text style={[styles.totalText, { color: colors.textPrimary }]}>Total: Rs. {totalAmount.toFixed(2)}</Text>
        <CustomButton title="Proceed to Checkout" onPress={() => navigation.navigate("Checkout")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 17,
    fontFamily: FONTS.heading,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13,
    fontFamily: FONTS.body,
    marginBottom: 20,
    textAlign: "center",
  },
  footer: {
    borderTopWidth: 1,
    paddingTop: 12,
  },
  totalText: {
    fontSize: 17,
    fontFamily: FONTS.heading,
    marginBottom: 8,
    textAlign: "center",
  },
});
