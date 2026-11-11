import ProfileScreen from "./screens/ProfileScreen";
import { ThemeProvider } from "./lib/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProfileScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}