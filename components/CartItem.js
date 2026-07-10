import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, FONTS, RADIUS } from "../theme";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.row}>
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/100x100.png?text=Gift" }}
        style={styles.image}
      />
      <View style={styles.middle}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>Rs. {item.price} x {item.quantity}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyButton} onPress={onDecrease}>
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
          <TouchableOpacity style={styles.qtyButton} onPress={onIncrease}>
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.remove}>Remove</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.card,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
  },
  middle: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.textPrimary,
  },
  price: {
    fontSize: 12,
    fontFamily: FONTS.body,
    color: COLORS.gold,
    marginTop: 2,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyButtonText: {
    fontSize: 15,
    color: COLORS.gold,
    fontFamily: FONTS.bodySemiBold,
  },
  qtyValue: {
    marginHorizontal: 10,
    fontSize: 13,
    fontFamily: FONTS.bodyMedium,
    color: COLORS.textPrimary,
  },
  remove: {
    color: COLORS.danger,
    fontSize: 11,
    fontFamily: FONTS.bodyMedium,
  },
});
