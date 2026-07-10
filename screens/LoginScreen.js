import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import CustomButton from "../components/CustomButton";
import { COLORS, FONTS, RADIUS } from "../theme";

export default function LoginScreen({ navigation }) {
  const { login, loading, error, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      await login(email, password);
    } catch (e) {
      // error already set in context
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Login to continue your calming gift journey</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

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
          placeholder="Password"
          placeholderTextColor={COLORS.textMuted}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
          <Text style={styles.eyeText}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      <CustomButton title="Login" onPress={handleLogin} loading={loading} />

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.heading,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONTS.body,
    color: COLORS.textSecondary,
    marginBottom: 24,
  },
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
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 14,
    fontFamily: FONTS.body,
    color: COLORS.textPrimary,
  },
  eyeButton: {
    paddingHorizontal: 14,
  },
  eyeText: {
    color: COLORS.gold,
    fontFamily: FONTS.bodyMedium,
    fontSize: 12,
  },
  error: {
    color: COLORS.danger,
    fontFamily: FONTS.body,
    marginBottom: 10,
  },
  link: {
    textAlign: "center",
    color: COLORS.gold,
    fontFamily: FONTS.bodyMedium,
    marginTop: 16,
  },
});
