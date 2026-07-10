import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";import { useAuth } from "../context/AuthContext";
import { subscribeToUserOrders } from "../services/orderService";
import LoadingSpinner from "../components/LoadingSpinner";
import { COLORS, FONTS, RADIUS } from "../theme";

const STATUS_COLORS = {
  pending: "#D4AF7A",
  paid: "#7FA6D4",
  shipped: "#B79AE0",
  delivered: "#5FAE85",
};

export default function OrdersScreen({ navigation }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToUserOrders(user.uid, (data) => {
      setOrders(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [user]);

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No orders yet. Your gift orders will show up here.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("OrderDetail", { order: item })} activeOpacity={0.8}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>Order #{item.id.slice(0, 6).toUpperCase()}</Text>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[item.status] || COLORS.textMuted }]}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            {item.items.map((i, idx) => (
              <Text key={idx} style={styles.itemLine}>
                {i.name} x{i.quantity}
              </Text>
            ))}
             <Text style={styles.total}>Total: Rs. {item.totalAmount.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
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
    textAlign: "center",
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
  },
  card: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    color: COLORS.background,
    fontSize: 11,
    fontFamily: FONTS.bodySemiBold,
    textTransform: "capitalize",
  },
  itemLine: {
    fontSize: 12,
    fontFamily: FONTS.body,
    color: COLORS.textSecondary,
  },
  total: {
    marginTop: 8,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.gold,
  },
});
