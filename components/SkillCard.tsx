
import { View, Text, StyleSheet } from 'react-native';
import type { SkillCardProps } from '../types';
import { useTheme } from '../lib/ThemeContext';

export default function SkillCard({ skill }: SkillCardProps) {
    const { colors } = useTheme();
    return (
                      <View key={skill} style={[styles.skillItem, { backgroundColor: colors.accentSurface }]}>
                        <Text style={[styles.skillText, { color: colors.accentText }]}>
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
  skillText: {
    fontSize: 12,
    fontWeight: "600",
  },
    });