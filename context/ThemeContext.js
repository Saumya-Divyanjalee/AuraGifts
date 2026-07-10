import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIGHT_COLORS, DARK_COLORS } from "../theme";

const ThemeContext = createContext();

export const useThemeColors = () => useContext(ThemeContext);

const STORAGE_KEY = "auragifts_theme_mode";

export const ThemeProvider = ({ children }) => {
  const [isSleepMode, setIsSleepMode] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((value) => {
      if (value === "sleep") setIsSleepMode(true);
      setReady(true);
    });
  }, []);

  const toggleSleepMode = async () => {
    const next = !isSleepMode;
    setIsSleepMode(next);
    await AsyncStorage.setItem(STORAGE_KEY, next ? "sleep" : "day");
  };

  const colors = isSleepMode ? DARK_COLORS : LIGHT_COLORS;

  if (!ready) return null;

  return (
    <ThemeContext.Provider value={{ colors, isSleepMode, toggleSleepMode }}>
      {children}
    </ThemeContext.Provider>
  );
};