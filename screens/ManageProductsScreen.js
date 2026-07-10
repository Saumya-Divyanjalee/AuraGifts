import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { subscribeToProducts, deleteProduct } from "../services/productService";
import CustomButton from "../components/CustomButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { COLORS, FONTS, RADIUS } from "../theme";

export default function ManageProductsScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleDelete = (product) => {
    Alert.alert("Delete Product", `Remove "${product.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteProduct(product.id);
          } catch (e) {
            Alert.alert("Error", "Could not delete product.");
          }
        },
      },
    ]);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <View style={styles.container}>
      <CustomButton title="+ Add Product" onPress={() => navigation.navigate("AddEditProduct", { product: null })} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.image }} style={styles.thumb} />
            <TouchableOpacity
              style={styles.info}
              onPress={() => navigation.navigate("AddEditProduct", { product: item })}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>Rs. {item.price}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 12 },
  row: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: COLORS.surfaceAlt, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.card, padding: 10, marginBottom: 8,
  },
  thumb: { width: 48, height: 48, borderRadius: 8, backgroundColor: COLORS.surface },
  info: { flex: 1, marginLeft: 10 },
  name: { fontFamily: FONTS.bodySemiBold, color: COLORS.textPrimary, fontSize: 14 },
  price: { fontFamily: FONTS.body, color: COLORS.gold, fontSize: 12, marginTop: 2 },
  delete: { color: COLORS.danger, fontFamily: FONTS.bodyMedium, fontSize: 12 },
});