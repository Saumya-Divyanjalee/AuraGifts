import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import { COLORS, FONTS, RADIUS, GRADIENT_SKY } from "../theme";

export default function SignupScreen({ navigation }) {
  const { signup, loading, error, setError } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    setError(null);
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      await signup(name, email, password);
    } catch (e) {}
  };

  return (
    <LinearGradient colors={GRADIENT_SKY} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <View style={styles.card}>
          <Text style={styles.title}>Join AuraGifts</Text>
          <Text style={styles.subtitle}>Join us for calming, thoughtful gifts</Text>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor={COLORS.textMuted} value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={COLORS.textMuted}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password (min 6 characters)"
              placeholderTextColor={COLORS.textMuted}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
              <Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>
            </TouchableOpacity>
          </View>

          <CustomButton title="Sign Up" onPress={handleSignup} loading={loading} />

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: "center", padding: 24 },
  card: {
    backgroundColor: "rgba(255,255,255,0.92)",
    borderRadius: 24,
    padding: 24,
  },
  title: { fontSize: 26, fontFamily: FONTS.heading, color: COLORS.purple, marginBottom: 4 },
  subtitle: { fontSize: 13, fontFamily: FONTS.body, color: COLORS.textSecondary, marginBottom: 20 },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.button,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    fontSize: 14,
    fontFamily: FONTS.body,
    color: COLORS.textPrimary,
  },
  passwordWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceAlt,
    borderRadius: RADIUS.button,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  passwordInput: { flex: 1, padding: 14, fontSize: 14, fontFamily: FONTS.body, color: COLORS.textPrimary },
  eyeButton: { paddingHorizontal: 14 },
  eyeText: { color: COLORS.purple, fontFamily: FONTS.bodyMedium, fontSize: 12 },
  error: { color: COLORS.danger, fontFamily: FONTS.body, marginBottom: 10 },
  link: { textAlign: "center", color: COLORS.purple, fontFamily: FONTS.bodyMedium, marginTop: 16 },
});