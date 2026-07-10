import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, RADIUS } from "../theme";

export default function ProductCard({ product, onPress, onAddToCart }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image
        source={{ uri: product.image || "https://via.placeholder.com/300x300.png?text=Gift" }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rs. {product.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.card,
    margin: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: COLORS.surface,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.textPrimary,
  },
  category: {
    fontSize: 11,
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.gold,
  },
  addButton: {
    backgroundColor: COLORS.gold,
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontFamily: FONTS.bodySemiBold,
    lineHeight: 18,
  },
});
