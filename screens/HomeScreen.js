import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { subscribeToProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import ImageCarousel from "../components/ImageCarousel";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../context/CartContext";
import { useThemeColors } from "../context/ThemeContext";
import { FONTS } from "../theme";

const BANNER_IMAGES = [
  "https://i.pinimg.com/736x/f9/87/5b/f9875be4db6a26fe5e61e2f51e297afe.jpg",
  "https://i.pinimg.com/736x/d6/d0/eb/d6d0eb61e587f7226ef4f14564086f5b.jpg",
  "https://i.pinimg.com/1200x/7d/ec/62/7dec624c3c9e99d3c0c16bc72be46ef5.jpg",
  "https://i.pinimg.com/736x/6f/3a/cd/6f3acdaa8cfbc2f087c0c7903a93f41f.jpg",
  "https://i.pinimg.com/736x/e3/36/13/e3361359d9de6bcf6a86ea1c237f60b0.jpg",
];

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { colors } = useThemeColors();

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <LoadingSpinner />;

   return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, styles.brandFont, { color: colors.gold }]}>AuraGifts</Text>
      <Text style={[styles.subheader, { color: colors.textSecondary }]}>Curated ASMR-inspired gifts, thoughtfully packaged</Text>

      {products.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>No products yet. Add some in Firestore's "products" collection.</Text>
        </View>
      ) : (        
      <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          numColumns={2}
         ListHeaderComponent={<ImageCarousel images={BANNER_IMAGES} />}
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
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    paddingHorizontal: 4,
  },
  brandFont: {
    fontFamily: FONTS.brand,
  },
  subheader: {
    fontSize: 12,
    fontFamily: FONTS.body,
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
  },
});
