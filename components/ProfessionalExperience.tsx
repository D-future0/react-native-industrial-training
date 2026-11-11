import { View, Text, StyleSheet } from 'react-native';
import type { ProfessionalExperienceProps } from '../types';
import { useTheme } from '../lib/ThemeContext';


export default function ProfessionalExperience({ company, years, role }: ProfessionalExperienceProps) {
    const { colors } = useTheme();
    return (
        <View style={styles.skillsContainer}>
                <View style={styles.availabilityInfo}>
                  <Text style={[styles.availabilityTitle, { color: colors.text }]}>
                    {company} <Text style={[styles.availabilitySubtitle, { color: colors.mutedText }]}>({years})</Text>
                  </Text>

                  <Text style={[styles.availabilityDescription, { color: colors.mutedText }]}>
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
})