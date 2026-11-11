import {View, Text, Pressable, Linking, StyleSheet, Image} from "react-native"
import type { ProfileCardProps } from "../types"
import { useTheme } from "../lib/ThemeContext";

export default function ProfileCard({ isCompact }: ProfileCardProps){
    const { colors } = useTheme();
    return(
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={styles.avatar}>
            <Image source={require("../assets/collins-image.webp")} style={styles.avatarImage} />
          </View>

          <Text
            style={[
              styles.name,
              isCompact && styles.nameCompact,
              { color: colors.text },
            ]}
          >
            Ifechukwu Collins Okafor
          </Text>

          <Text style={[styles.role, { color: colors.primary }]}>
            Software Engineer
          </Text>

          <Text style={[styles.description, { color: colors.mutedText }]}>
            I build modern digital products and
            scalable software solutions using
            contemporary web and mobile technologies.
          </Text>

          <Pressable
            style={styles.contactButton}
            onPress={()=> Linking.openURL('mailto:ifechukwu@gmail.com')}
            accessibilityRole="button"
          >
            <Text style={styles.contactButtonText}>
              Contact Developer
            </Text>
          </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    
    profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    elevation: 3,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
    avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  name: {
    fontSize: 25,
    fontWeight: "800",
    color: "#172554",
    textAlign: "center",
    width: "100%",
  },
  nameCompact: {
    fontSize: 22,
  },

  role: {
    fontSize: 15,
    color: "#2563EB",
    marginTop: 5,
    fontWeight: "600",
  },

  description: {
    fontSize: 14,
    lineHeight: 23,
    color: "#64748B",
    textAlign: "center",
    marginTop: 18,
  },

  contactButton: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 22,
    width: "100%",
    alignItems: "center",
  },

  contactButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

})