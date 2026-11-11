import { View, Text, Pressable, Linking, StyleSheet } from "react-native";
import { Project } from "../types";
import { useTheme } from "../lib/ThemeContext";


export default function ProjectCard({ project }: { project: Project }) {
  const { isDark } = useTheme();
  return (
        <View
          key={project.title}
          style={[styles.card, isDark && styles.cardDark]}
        >
          <Text style={[styles.title, isDark && styles.textDark]}>
            {project.title}
          </Text>
          <Text style={[styles.description, isDark && styles.descriptionDark]}>
            {project.description}
          </Text>
          <Text style={[styles.description, isDark && styles.descriptionDark]}>
            <Text style={{ fontWeight: "bold" }}>Technologies:</Text> {project.technology}
          </Text>
          <Pressable
            style={styles.button}
            onPress={() => Linking.openURL(project.link)}
            accessibilityRole="link"
          >
            <Text style={styles.buttonText}>View Project</Text>
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
  cardDark: {
    backgroundColor: "#1E293B",
  },
  title: {
    color: "#172554",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "left",
  },
  textDark: {
    color: "#F8FAFC",
  },
  description: {
    color: "#555555",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "left",
  },
  descriptionDark: {
    color: "#CBD5E1",
  },
  button: {
    backgroundColor: "#007BFF",
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