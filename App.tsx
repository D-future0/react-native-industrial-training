
import { createContext, useState, useContext, useEffect } from "react";
import SkillCard from "./SkillCard";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  useColorScheme,
  Linking
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const skills = [
  "React Native",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
];

export const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => Promise<void>;
} | null>(null);

export default function App() {
  const [isAvailable, setIsAvailable] = useState(true);

  const handleContact = () => {
    console.log("Contact button pressed");
  };
  const systemTheme = useColorScheme(); 
  
  const [isDark, setIsDark] = useState(systemTheme === 'dark');
  const [isReady, setIsReady] = useState(false);

  // Load the saved theme from storage when the app mounts
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('@app_theme');
        if (savedTheme !== null) {
          // If a saved preference exists, use it
          setIsDark(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      } finally {
        setIsReady(true);
      }
    };

    loadTheme();
  }, []);

  // Toggle the theme in state AND save it to storage
  const toggleTheme = async () => {
    const newThemeState = !isDark;
    setIsDark(newThemeState); 
    
    try {
      await AsyncStorage.setItem('@app_theme', newThemeState ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  // Optional: Prevent rendering children until the theme is loaded from storage. This stops the app from flashing the wrong theme for a split second on launch
  if (!isReady) {
    return null; 
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.logo, isDark && styles.textDark]}>DEVPROFILE</Text>

          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                !isAvailable && styles.unavailableDot,
              ]}
            />

            <Text style={styles.statusText}>
              {isAvailable ? "Available" : "Unavailable"}
            </Text>
          </View>
        </View>

        <View style={[styles.themeCard, isDark && styles.cardDark]}>
          <View style={styles.availabilityInfo}>
            <Text style={[styles.availabilityTitle, isDark && styles.textDark]}>
              Appearance
            </Text>
            <Text style={[styles.availabilityDescription, isDark && styles.mutedTextDark]}>
              {isDark ? "Dark mode is on" : "Light mode is on"}
            </Text>
          </View>
          <Pressable
            onPress={toggleTheme}
            style={styles.toggleButton}
            accessibilityRole="switch"
            accessibilityLabel="Dark mode"
            accessibilityState={{ checked: isDark }}
          >
            <Text style={styles.toggleText}>{isDark ? "ON" : "OFF"}</Text>
          </Pressable>
        </View>

        {/* Profile */}
        <View style={[styles.profileCard, isDark && styles.cardDark]}>
          <View style={styles.avatar}>
            <Image source={require("./assets/collins-image.png")} style={styles.avatarImage} />
          </View>

          <Text style={[styles.name, isDark && styles.textDark]}>Ifechukwu Collins Okafor</Text>

          <Text style={styles.role}>
            Software Engineer
          </Text>

          <Text style={[styles.description, isDark && styles.mutedTextDark]}>
            I build modern digital products and
            scalable software solutions using
            contemporary web and mobile technologies.
          </Text>

          <Pressable
            style={styles.contactButton}
            onPress={()=> Linking.openURL('mailto:ifechukwu@gmail.com')}
            accessibilityRole="button"
          >
            <Text style={styles.contactButtonText}>
              Contact Developer
            </Text>
          </Pressable>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
            Technical Skills
          </Text>

          <SkillCard skills={skills} isDark={isDark} />
        </View>

        {/* Availability */}
        <View style={[styles.availabilityCard, isDark && styles.cardDark]}>
          <View style={styles.availabilityInfo}>
            <Text style={[styles.availabilityTitle, isDark && styles.textDark]}>
              Work Availability
            </Text>

            <Text style={[styles.availabilityDescription, isDark && styles.mutedTextDark]}>
              {isAvailable
                ? "Currently open to opportunities."
                : "Currently unavailable."}
            </Text>
          </View>

          <Pressable
            onPress={() => setIsAvailable((previous) => !previous)}
            style={styles.toggleButton}
            accessibilityRole="switch"
            accessibilityState={{ checked: isAvailable }}
          >
            <Text style={styles.toggleText}>
              {isAvailable ? "ON" : "OFF"}
            </Text>
          </Pressable>
        </View>

        {/* Professional Experience */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
            Professional Experience
          </Text>
          <View style={styles.skillsContainer}>
            <View style={styles.availabilityInfo}>
              <Text style={[styles.availabilityTitle, isDark && styles.textDark]}>
                Nexsecure Cyber Ltd. <Text style={[styles.availabilitySubtitle, isDark && styles.mutedTextDark]}>(2025 - Present)</Text>
              </Text>

              <Text style={[styles.availabilityDescription, isDark && styles.mutedTextDark]}>
                Software Engineer
              </Text>
            </View>
          </View>
          <View style={styles.skillsContainer}>
            <View style={styles.availabilityInfo}>
              <Text style={[styles.availabilityTitle, isDark && styles.textDark]}>
                Macklemore Solution Llc. <Text style={[styles.availabilitySubtitle, isDark && styles.mutedTextDark]}>(2025)</Text>
              </Text>

              <Text style={[styles.availabilityDescription, isDark && styles.mutedTextDark]}>
                Web Developer
              </Text>
            </View>
          </View>
          <View style={styles.skillsContainer}>
            <View style={styles.availabilityInfo}>
              <Text style={[styles.availabilityTitle, isDark && styles.textDark]}>
                Sky Studio <Text style={[styles.availabilitySubtitle, isDark && styles.mutedTextDark]}>(2024)</Text>
              </Text>

              <Text style={[styles.availabilityDescription, isDark && styles.mutedTextDark]}>
                Frontend Developer
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={[styles.footer, isDark && styles.mutedTextDark]}>
          Built with React Native and TypeScript
        </Text>
      </ScrollView>
    </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  safeAreaDark: {
    backgroundColor: "#0F172A",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  themeCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardDark: {
    backgroundColor: "#1E293B",
  },
  textDark: {
    color: "#F8FAFC",
  },
  mutedTextDark: {
    color: "#CBD5E1",
  },

  logo: {
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: "#172554",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#16A34A",
    marginRight: 7,
  },

  unavailableDot: {
    backgroundColor: "#DC2626",
  },

  statusText: {
    color: "#166534",
    fontSize: 12,
    fontWeight: "600",
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1D4ED8",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  name: {
    fontSize: 25,
    fontWeight: "800",
    color: "#172554",
  },

  role: {
    fontSize: 15,
    color: "#2563EB",
    marginTop: 5,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    lineHeight: 23,
    color: "#64748B",
    textAlign: "center",
    marginTop: 18,
  },

  contactButton: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 22,
    width: "100%",
    alignItems: "center",
  },

  contactButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#172554",
    marginBottom: 15,
  },

  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  skillItem: {
    backgroundColor: "#E0E7FF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  skillItemDark: {
    backgroundColor: "#312E81",
  },

  skillText: {
    color: "#3730A3",
    fontSize: 12,
    fontWeight: "600",
  },
  skillTextDark: {
    color: "#E0E7FF",
  },

  availabilityCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  availabilityInfo: {
    flex: 1,
    marginRight: 12,
  },

  availabilityTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#172554",
  },

  availabilityDescription: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 6,
  },
  availabilitySubtitle: {
    fontSize: 12,
    color: "#64748B",
    fontWeight: "400",
    fontStyle: "italic",
  },

  toggleButton: {
    backgroundColor: "#1D4ED8",
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 9,
  },

  toggleText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  footer: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 30,
  },
});
