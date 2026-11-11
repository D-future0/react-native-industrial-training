import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useColorScheme } from "react-native";
import * as SplashScreen from "expo-splash-screen";

void SplashScreen.preventAutoHideAsync().catch((error) => {
  console.error("Error keeping splash screen visible:", error);
});

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  primary: string;
};

type ThemeContextValue = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => Promise<void>;
};

const lightColors: ThemeColors = {
  background: "#F5F7FA",
  surface: "#FFFFFF",
  text: "#172554",
  mutedText: "#64748B",
  primary: "#1D4ED8",
};

const darkColors: ThemeColors = {
  background: "#0F172A",
  surface: "#1E293B",
  text: "#F8FAFC",
  mutedText: "#CBD5E1",
  primary: "#60A5FA",
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemTheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemTheme === "dark");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("@app_theme");
        if (savedTheme !== null) {
          setIsDark(savedTheme === "dark");
        }
      } catch (error) {
        console.error("Error loading theme:", error);
      } finally {
        setIsReady(true);
      }
    };

    void loadTheme();
  }, []);

  useEffect(() => {
    if (isReady) {
      void SplashScreen.hideAsync().catch((error) => {
        console.error("Error hiding splash screen:", error);
      });
    }
  }, [isReady]);

  const toggleTheme = async () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);

    try {
      await AsyncStorage.setItem("@app_theme", nextIsDark ? "dark" : "light");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={{ isDark, colors: isDark ? darkColors : lightColors, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
}
