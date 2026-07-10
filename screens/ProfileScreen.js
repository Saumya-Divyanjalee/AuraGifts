import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CustomButton from "../components/CustomButton";
import { COLORS, FONTS } from "../theme";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();
  const { totalItems, totalAmount } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{(user?.displayName || "U")[0].toUpperCase()}</Text>
      </View>
      <Text style={styles.name}>{user?.displayName || "User"}</Text>
      <Text style={styles.email}>{user?.email}</Text>

       <View style={styles.cartCard}>
        <Text style={styles.cartLabel}>My Cart</Text>
        <Text style={styles.cartValue}>{totalItems} item{totalItems !== 1 ? "s" : ""} · Rs. {totalAmount.toFixed(2)}</Text>
        <CustomButton
          title="View Cart & Order"
          onPress={() => navigation.navigate("HomeTab", { screen: "Cart" })}
        />
      </View>

       <View style={styles.buttonWrap}>
        <CustomButton title="Logout" variant="outline" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: COLORS.background,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.gold,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: COLORS.gold,
    fontSize: 30,
    fontFamily: FONTS.heading,
  },
  name: {
    fontSize: 19,
    fontFamily: FONTS.heading,
    color: COLORS.textPrimary,
  },
  email: {
    fontSize: 13,
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
    marginTop: 4,
    marginBottom: 30,
  },
 buttonWrap: {
    width: "80%",
  },
  cartCard: {
    width: "80%",
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  cartLabel: {
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  cartValue: {
    fontFamily: FONTS.body,
    color: COLORS.gold,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 10,
  },
});
