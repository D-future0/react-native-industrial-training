import { View, Text, StyleSheet } from 'react-native';

type ProfessionalExperienceProps = {
  isDark: boolean;
  company: string;
  years: string;
    role: string;
};

export default function ProfessionalExperience({ isDark, company, years, role }: ProfessionalExperienceProps) {
    return (
        <View style={styles.skillsContainer}>
                <View style={styles.availabilityInfo}>
                  <Text style={[styles.availabilityTitle, isDark && styles.textDark]}>
                    {company} <Text style={[styles.availabilitySubtitle, isDark && styles.mutedTextDark]}>({years})</Text>
                  </Text>

                  <Text style={[styles.availabilityDescription, isDark && styles.mutedTextDark]}>
                    {role}
                  </Text>
                </View>
              </View>
    )
}

const styles = StyleSheet.create({
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
    availabilityInfo: {
    flex: 1,
  },
  availabilityTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    },
    availabilitySubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
    availabilityDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
    textDark: {
    color: "#E0E7FF",
  },
    mutedTextDark: {
    color: "#9CA3AF",
  },
})