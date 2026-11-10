
import { createContext, useState,  useEffect } from "react";
import SkillCard from "./components/SkillCard";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileCard from "./components/ProfileCard";
import AvailabilityToggle from "./components/AvailabilityToggle";
import skills from "./data/skills";
import ProjectCard from "./components/ProjectCard";
import projects from "./data/projects";
import ProfessionalExperience from "./components/ProfessionalExperience";
import professionalExperienceData from "./data/professionalExperience";


export default function App() {
  const [isAvailable, setIsAvailable] = useState(true);
  const { width } = useWindowDimensions();
  const isCompact = width < 360;
  const isWide = width >= 820;
  const horizontalPadding = isCompact ? 12 : width >= 1024 ? 32 : width >= 600 ? 20 : 16;

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

  // Prevent rendering children until the theme is loaded from storage. This stops the app from flashing the wrong theme for a split second on launch
  if (!isReady) {
    return null;
  }

  return (

      <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        <ScrollView
          contentContainerStyle={[
            styles.container,
            !isWide && styles.containerNarrow,
            { paddingHorizontal: horizontalPadding },
          ]}
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

          <View style={[styles.mainLayout, isWide && styles.mainLayoutWide]}>
            <View style={[styles.mainColumn, isWide && styles.mainColumnPrimary]}>
              {/* Profile */}
              <ProfileCard isDark={isDark} isCompact={isCompact} />

              {/* Skills */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                  Technical Skills
                </Text>
                <View style={styles.skillsContainer}>
                    {skills.map((skill) => (
                <SkillCard key={skill} skill={skill} isDark={isDark} />
                ))}
                  </View>
              </View>
            </View>

            <View style={[styles.mainColumn, isWide && styles.mainColumnSecondary]}>
              {/* Availability */}
              <AvailabilityToggle isWide={isWide} isDark={isDark} isAvailable={isAvailable} setIsAvailable={setIsAvailable} />

              {/* Professional Experience */}
              <View style={styles.section}>
                  <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                    Professional Experience
                  </Text>
                  {professionalExperienceData.map((exp, index) => (
                    <ProfessionalExperience
                      key={exp.company + index}
                      isDark={isDark}
                      company={exp.company}
                      years={exp.years}
                      role={exp.role}
                    />
                  ))}
              </View>

              {/* Projects */}
              <ProjectCard projects={projects} isDark={isDark} />
            </View>
          </View>

          {/* Footer */}
          <Text style={[styles.footer, isDark && styles.mutedTextDark]}>
            Built with React Native and TypeScript
          </Text>
        </ScrollView>
      </SafeAreaView>

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
    width: "100%",
    maxWidth: 1100,
    alignSelf: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  containerNarrow: {
    maxWidth: 900,
  },

  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    minWidth: 0,
    gap: 12,
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
  mainLayout: {
    gap: 24,
  },
  mainLayoutWide: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  mainColumn: {
    minWidth: 0,
  },
  mainColumnPrimary: {
    flex: 3,
  },
  mainColumnSecondary: {
    flex: 2,
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
    textAlign: "center",
    width: "100%",
  },
  nameCompact: {
    fontSize: 22,
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
    minWidth: 0,
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
    flexShrink: 0,
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
