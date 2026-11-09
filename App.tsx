
import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const skills = [
  "React Native",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
];

export default function App() {
  const [isAvailable, setIsAvailable] = useState(true);

  const handleContact = () => {
    console.log("Contact button pressed");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>DEVPROFILE</Text>

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

        {/* Profile */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>IO</Text>
          </View>

          <Text style={styles.name}>Ifechukwu Collins Okafor</Text>

          <Text style={styles.role}>
            Software Engineer
          </Text>

          <Text style={styles.description}>
            I build modern digital products and
            scalable software solutions using
            contemporary web and mobile technologies.
          </Text>

          <Pressable
            style={styles.contactButton}
            onPress={handleContact}
            accessibilityRole="button"
          >
            <Text style={styles.contactButtonText}>
              Contact Developer
            </Text>
          </Pressable>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Technical Skills
          </Text>

          <View style={styles.skillsContainer}>
            {skills.map((skill) => (
              <View key={skill} style={styles.skillItem}>
                <Text style={styles.skillText}>
                  {skill}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Availability */}
        <View style={styles.availabilityCard}>
          <View style={styles.availabilityInfo}>
            <Text style={styles.availabilityTitle}>
              Work Availability
            </Text>

            <Text style={styles.availabilityDescription}>
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

        {/* Footer */}
        <Text style={styles.footer}>
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

  skillText: {
    color: "#3730A3",
    fontSize: 12,
    fontWeight: "600",
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
