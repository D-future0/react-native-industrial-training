
import { View, Text, StyleSheet } from 'react-native';
type SkillCardProps = {
  skills: string[];
  isDark: boolean;
};

export default function SkillCard({ skills, isDark }: SkillCardProps) {
    return (
        
                  <View style={styles.skillsContainer}>
                    {skills.map((skill) => (
                      <View key={skill} style={[styles.skillItem, isDark && styles.skillItemDark]}>
                        <Text style={[styles.skillText, isDark && styles.skillTextDark]}>
                          {skill}
                        </Text>
                      </View>
                    ))}
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