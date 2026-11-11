import { View, Text, Pressable, Linking, StyleSheet } from "react-native";
import type { Project } from "../types";
import { useTheme } from "../lib/ThemeContext";


export default function ProjectCard({ project }: { project: Project }) {
  const { colors } = useTheme();
  return (
        <View
          key={project.title}
          style={[styles.card, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.title, { color: colors.text }]}>
            {project.title}
          </Text>
          <Text style={[styles.description, { color: colors.mutedText }]}>
            {project.description}
          </Text>
          <Text style={[styles.description, { color: colors.mutedText }]}>
            <Text style={{ fontWeight: "bold" }}>Technologies:</Text> {project.technology}
          </Text>
          <Pressable
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => Linking.openURL(project.link)}
            accessibilityRole="link"
          >
            <Text style={[styles.buttonText, { color: colors.inverseText }]}>View Project</Text>
          </Pressable>
        </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "left",
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: "left",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});