import { FlatList, Text, StyleSheet } from "react-native";
import projects from "../data/projects";
import ProjectCard from "./ProjectCard";
import { useTheme } from "../lib/ThemeContext";

export default function ProjectList() {
  const { isDark } = useTheme();
  return (
    <FlatList
      style={styles.section}
      data={projects}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => <ProjectCard project={item} />}
      ListHeaderComponent={<Text style={[styles.title, isDark && styles.textDark]}>My Projects</Text>}
    />
  );
}

const styles = StyleSheet.create({
      section: {
    marginTop: 30,
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
});