
import { View, Text, StyleSheet } from 'react-native';
import { SkillCardProps } from '../types';
import { useTheme } from '../lib/ThemeContext';

export default function SkillCard({ skill }: SkillCardProps) {
    const { isDark } = useTheme();
    return (
                      <View key={skill} style={[styles.skillItem, isDark && styles.skillItemDark]}>
                        <Text style={[styles.skillText, isDark && styles.skillTextDark]}>
                          {skill}
                        </Text>
                      </View>
    );}

    const styles = StyleSheet.create({
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