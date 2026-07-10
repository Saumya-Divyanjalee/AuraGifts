import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from "react-native";
import { addProduct, updateProduct } from "../services/productService";
import CustomButton from "../components/CustomButton";
import { COLORS, FONTS, RADIUS } from "../theme";

export default function AddEditProductScreen({ route, navigation }) {
  const existing = route.params?.product || null;
  const isEdit = !!existing;

  const [name, setName] = useState(existing?.name || "");
  const [category, setCategory] = useState(existing?.category || "");
  const [price, setPrice] = useState(existing ? String(existing.price) : "");
  const [image, setImage] = useState(existing?.image || "");
  const [description, setDescription] = useState(existing?.description || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert("Missing info", "Name and price are required.");
      return;
    }
    setSaving(true);
    try {
      const data = { name, category, price: Number(price), image, description };
      if (isEdit) {
        await updateProduct(existing.id, data);
      } else {
        await addProduct(data);
      }
      navigation.goBack();
    } catch (e) {
      Alert.alert("Error", "Could not save product.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholderTextColor={COLORS.textMuted} />

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholderTextColor={COLORS.textMuted} />

      <Text style={styles.label}>Price (Rs.)</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholderTextColor={COLORS.textMuted} />

      <Text style={styles.label}>Image URL</Text>
      <TextInput style={styles.input} value={image} onChangeText={setImage} placeholderTextColor={COLORS.textMuted} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor={COLORS.textMuted}
      />

      <CustomButton title={isEdit ? "Update Product" : "Add Product"} onPress={handleSave} loading={saving} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 16 },
  label: { fontFamily: FONTS.bodyMedium, color: COLORS.textSecondary, marginBottom: 6, fontSize: 13 },
  input: {
    backgroundColor: COLORS.surfaceAlt, borderWidth: 1, borderColor: COLORS.border,
    borderRadius: RADIUS.button, padding: 12, marginBottom: 16,
    fontFamily: FONTS.body, color: COLORS.textPrimary, fontSize: 14,
  },
});