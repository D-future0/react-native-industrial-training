
import { useState } from "react";
import SkillCard from "../components/SkillCard";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import ProfileCard from "../components/ProfileCard";
import AvailabilityToggle from "../components/AvailabilityToggle";
import skills from "../data/skills";
import ProjectList from "../components/ProjectList";
import ProfessionalExperience from "../components/ProfessionalExperience";
import professionalExperienceData from "../data/professionalExperience";
import { useTheme } from "../lib/ThemeContext";



export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();
  const [isAvailable, setIsAvailable] = useState(true);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const availableWidth = width - insets.left - insets.right;
  const isCompact = availableWidth < 360;
  const isWide = availableWidth >= 700;
  const horizontalPadding = isCompact ? 12 : availableWidth >= 1024 ? 32 : 16;


  return (

      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={[styles.safeArea, isDark && styles.safeAreaDark]}
      >
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
              <ProfileCard isCompact={isCompact} />

              {/* Skills */}
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                  Technical Skills
                </Text>
                <View style={styles.skillsContainer}>
                    {skills.map((skill) => (
                <SkillCard key={skill} skill={skill} />
                ))}
                  </View>
              </View>
            </View>

            <View style={[styles.mainColumn, isWide && styles.mainColumnSecondary]}>
              {/* Availability */}
              <AvailabilityToggle isWide={isWide} isAvailable={isAvailable} setIsAvailable={setIsAvailable} />

              {/* Professional Experience */}
              <View style={styles.section}>
                  <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
                    Professional Experience
                  </Text>
                  {professionalExperienceData.map((exp, index) => (
                    <ProfessionalExperience
                      key={exp.company + index}
                      company={exp.company}
                      years={exp.years}
                      role={exp.role}
                    />
                  ))}
              </View>

              {/* Projects */}
              <ProjectList />
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
    flexGrow: 1,
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
  section: {
    marginTop: 30,
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
    gap: 16,
  },
  mainColumn: {
    minWidth: 0,
  },
  mainColumnPrimary: {
    flex: 1,
  },
  mainColumnSecondary: {
    flex: 1,
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
