import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { COLORS, FONTS, RADIUS } from "../theme";

export default function CustomButton({ title, onPress, loading, disabled, variant = "primary" }) {
  const isOutline = variant === "outline";
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isOutline ? styles.outlineButton : styles.primaryButton,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? COLORS.gold : COLORS.background} />
      ) : (
        <Text style={[styles.text, isOutline && styles.outlineText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: RADIUS.button,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  primaryButton: {
    backgroundColor: COLORS.gold,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "#FFFFFF",
    fontFamily: FONTS.bodySemiBold,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  outlineText: {
    color: COLORS.gold,
  },
});
