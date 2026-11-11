import { Text, View, StyleSheet } from "react-native";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";
import { useTheme } from "../lib/ThemeContext";

export default function ProjectList() {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.title, { color: colors.text }]}>My Projects</Text>
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
      section: {
    marginTop: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "left",
  },
});