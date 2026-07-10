// theme.js — design tokens for both Day (dreamy pastel) and Sleep Mode themes
export const LIGHT_COLORS = {
  background: "#F4F0FC",
  surface: "#FFFFFF",
  surfaceAlt: "#FBF7FF",
  border: "#E3D9F7",
  gold: "#957AD0",
  goldMuted: "#BF9DDF",
  textPrimary: "#3A3350",
  textSecondary: "#6B6280",
  textMuted: "#9C93B0",
  danger: "#E0645A",
  success: "#5FAE85",
  pending: "#FFA5D8",
  skyBlue: "#7EB8DC",
  teal: "#92DDEA",
  pink: "#FFA5D8",
  lavender: "#BF9DDF",
  purple: "#957AD0",
};

// "Sleep Mode" — deep purple / midnight blue dark theme
export const DARK_COLORS = {
  background: "#181229",
  surface: "#221A38",
  surfaceAlt: "#2B2145",
  border: "#3D3160",
  gold: "#B9A6F0",
  goldMuted: "#8C74C9",
  textPrimary: "#EDE8FA",
  textSecondary: "#B5ACD1",
  textMuted: "#7C7299",
  danger: "#E88A83",
  success: "#7FCBA4",
  pending: "#F0A8D8",
  skyBlue: "#5E7FB0",
  teal: "#5FA9B8",
  pink: "#D982B8",
  lavender: "#8C74C9",
  purple: "#B9A6F0",
};

export const GRADIENT_SKY = ["#7EB8DC", "#92DDEA", "#FFA5D8", "#BF9DDF", "#957AD0"];
export const GRADIENT_SLEEP = ["#181229", "#221A38", "#2B2145"];

export const FONTS = {
  heading: "PlayfairDisplay_700Bold",
  headingRegular: "PlayfairDisplay_400Regular",
  body: "Poppins_400Regular",
  bodyMedium: "Poppins_500Medium",
  bodySemiBold: "Poppins_600SemiBold",
  brand: "Bungee_400Regular",
};

export const RADIUS = {
  card: 16,
  button: 14,
  pill: 28,
};

// Backward-compatible default export (Day theme) — old screens using
// `import { COLORS } from "../theme"` keep working while we migrate them
// to `useThemeColors()` one by one.
export const COLORS = LIGHT_COLORS;