
import { View, Text, StyleSheet } from 'react-native';
import { SkillCardProps } from '../types';

export default function SkillCard({ skill, isDark }: SkillCardProps) {
    return (
                      <View key={skill} style={[styles.skillItem, isDark && styles.skillItemDark]}>
                        <Text style={[styles.skillText, isDark && styles.skillTextDark]}>
                          {skill}
                        </Text>
                      </View>
    );}

    const styles = StyleSheet.create({
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
    });