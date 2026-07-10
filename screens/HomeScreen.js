import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { subscribeToProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ImageCarousel from "../components/ImageCarousel";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";
import { COLORS, FONTS } from "../theme";

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Calm & Co.</Text>
      <Text style={styles.subheader}>Curated ASMR-inspired gifts, thoughtfully packaged</Text>

      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No products yet. Add some in Firestore's "products" collection.</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
          ListHeaderComponent={
            <ImageCarousel
              images={products
                .slice(0, 5)
                .map((p) => p.image)
                .filter(Boolean)}
            />
          }
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() => navigation.navigate("ProductDetail", { product: item })}
              onAddToCart={() => addToCart(item)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  header: {
    fontSize: 26,
    fontFamily: FONTS.heading,
    color: COLORS.gold,
    paddingHorizontal: 4,
  },
  subheader: {
    fontSize: 12,
    fontFamily: FONTS.body,
    color: COLORS.textSecondary,
    paddingHorizontal: 4,
    marginBottom: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  emptyText: {
    textAlign: "center",
    fontFamily: FONTS.body,
    color: COLORS.textMuted,
  },
});
