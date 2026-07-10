import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useThemeColors } from "../context/ThemeContext";
import { updateProfilePhoto } from "../services/authService";
import CustomButton from "../components/CustomButton";
import { FONTS } from "../theme";

export default function ProfileScreen({ navigation }) {
  const { user, isAdmin, photoURL, setPhotoURL, logout } = useAuth();
  const { totalItems, totalAmount } = useCart();
  const { colors, isSleepMode, toggleSleepMode } = useThemeColors();
  const [uploading, setUploading] = useState(false);

  const handlePickPhoto = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission needed", "Photo library access is required to set a profile picture.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.4,
      base64: true,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled && result.assets?.[0]?.base64) {
      const dataUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setUploading(true);
      try {
        await updateProfilePhoto(user.uid, dataUri);
        setPhotoURL(dataUri);
      } catch (e) {
        Alert.alert("Error", "Could not update profile photo.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={handlePickPhoto} disabled={uploading} style={styles.avatarWrap}>
        {photoURL ? (
          <Image source={{ uri: photoURL }} style={[styles.avatarImage, { borderColor: colors.gold }]} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: colors.surfaceAlt, borderColor: colors.gold }]}>
            <Text style={[styles.avatarText, { color: colors.gold }]}>
              {(user?.displayName || "U")[0].toUpperCase()}
            </Text>
          </View>
        )}
        <View style={[styles.cameraBadge, { backgroundColor: colors.gold, borderColor: colors.background }]}>
          <Text style={styles.cameraBadgeText}>{uploading ? "…" : "✎"}</Text>
        </View>
      </TouchableOpacity>

      <Text style={[styles.name, { color: colors.textPrimary }]}>{user?.displayName || "User"}</Text>
      <Text style={[styles.email, { color: colors.textMuted }]}>{user?.email}</Text>
      {isAdmin && (
        <View style={[styles.adminBadge, { backgroundColor: colors.gold }]}>
          <Text style={[styles.adminBadgeText, { color: colors.background }]}>ADMIN</Text>
        </View>
      )}

      <View style={[styles.card, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
        <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>My Cart</Text>
        <Text style={[styles.cardValue, { color: colors.gold }]}>
          {totalItems} item{totalItems !== 1 ? "s" : ""} · Rs. {totalAmount.toFixed(2)}
        </Text>
        <CustomButton title="View Cart & Order" onPress={() => navigation.navigate("HomeTab", { screen: "Cart" })} />
      </View>

      <View style={[styles.card, styles.rowCard, { backgroundColor: colors.surfaceAlt, borderColor: colors.border }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.cardLabel, { color: colors.textPrimary }]}>Sleep Mode</Text>
          <Text style={[styles.rowSubtext, { color: colors.textMuted }]}>Deep purple, easier on the eyes at night</Text>
        </View>
        <Switch
          value={isSleepMode}
          onValueChange={toggleSleepMode}
          trackColor={{ false: colors.border, true: colors.gold }}
          thumbColor={colors.surface}
        />
      </View>

      {isAdmin && (
        <View style={styles.buttonWrap}>
          <CustomButton title="Manage Products" onPress={() => navigation.navigate("HomeTab", { screen: "ManageProducts" })} />
        </View>
      )}

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
    paddingTop: 56,
  },
  avatarWrap: {
    marginBottom: 14,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 1.5,
  },
  avatarText: {
    fontSize: 34,
    fontFamily: FONTS.heading,
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBadgeText: {
    fontSize: 13,
    color: "#fff",
  },
  name: {
    fontSize: 20,
    fontFamily: FONTS.heading,
  },
  email: {
    fontSize: 13,
    fontFamily: FONTS.body,
    marginTop: 4,
  },
  adminBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  adminBadgeText: {
    fontSize: 10,
    fontFamily: FONTS.bodySemiBold,
    letterSpacing: 1,
  },
  card: {
    width: "85%",
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLabel: {
    fontFamily: FONTS.bodySemiBold,
    fontSize: 14,
  },
  cardValue: {
    fontFamily: FONTS.body,
    fontSize: 13,
    marginTop: 4,
    marginBottom: 12,
  },
  rowSubtext: {
    fontFamily: FONTS.body,
    fontSize: 11,
    marginTop: 2,
  },
  buttonWrap: {
    width: "85%",
    marginTop: 16,
  },
});