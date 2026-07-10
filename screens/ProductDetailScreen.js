import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import { useCart } from "../context/CartContext";
import { COLORS, FONTS } from "../theme";

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.image || "https://via.placeholder.com/400x400.png?text=Gift" }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.price}>Rs. {product.price}</Text>
        <Text style={styles.description}>
          {product.description || "A calming, thoughtfully packaged gift designed to bring a moment of peace to whoever receives it."}
        </Text>

        <CustomButton title="Add to Cart" onPress={() => addToCart(product)} />
        <CustomButton title="Go to Cart" variant="outline" onPress={() => navigation.navigate("Cart")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: "100%",
    height: 320,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: FONTS.heading,
    color: COLORS.textPrimary,
  },
  category: {
    fontSize: 12,
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  price: {
    fontSize: 19,
    fontFamily: FONTS.bodySemiBold,
    color: COLORS.gold,
    marginTop: 10,
  },
  description: {
    fontSize: 13,
    fontFamily: FONTS.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 14,
    marginBottom: 20,
  },
});
