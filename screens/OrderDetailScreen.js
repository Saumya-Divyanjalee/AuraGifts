import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS, FONTS, RADIUS } from "../theme";

const STATUS_COLORS = {
  pending: "#D4AF7A",
  paid: "#7FA6D4",
  shipped: "#B79AE0",
  delivered: "#5FAE85",
};

export default function OrderDetailScreen({ route }) {
  const { order } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.orderId}>Order #{order.id.slice(0, 6).toUpperCase()}</Text>
        <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[order.status] || COLORS.textMuted }]}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Items</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item, idx) => String(idx)}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name} x{item.quantity}</Text>
            <Text style={styles.itemPrice}>Rs. {(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        )}
      />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>Rs. {order.totalAmount.toFixed(2)}</Text>
      </View>

      <Text style={styles.meta}>Payment method: {order.paymentMethod || "mock"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  orderId: { fontFamily: FONTS.heading, fontSize: 18, color: COLORS.textPrimary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { color: COLORS.background, fontSize: 11, fontFamily: FONTS.bodySemiBold, textTransform: "capitalize" },
  sectionTitle: { fontFamily: FONTS.bodySemiBold, color: COLORS.textSecondary, marginBottom: 8 },
  itemRow: {
    flexDirection: "row", justifyContent: "space-between",
    backgroundColor: COLORS.surfaceAlt, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.card, padding: 12, marginBottom: 8,
  },
  itemName: { fontFamily: FONTS.body, color: COLORS.textPrimary, fontSize: 13 },
  itemPrice: { fontFamily: FONTS.bodySemiBold, color: COLORS.gold, fontSize: 13 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  totalLabel: { fontFamily: FONTS.heading, color: COLORS.textPrimary, fontSize: 16 },
  totalValue: { fontFamily: FONTS.heading, color: COLORS.gold, fontSize: 16 },
  meta: { fontFamily: FONTS.body, color: COLORS.textMuted, fontSize: 11, marginTop: 16, textAlign: "center" },
});