import {View, Text, Pressable, Linking, StyleSheet, Image} from "react-native"
import { ProfileCardProps } from "../types"

export default function ProfileCard({ isDark, isCompact }: ProfileCardProps){
    return(
        <View style={[styles.profileCard, isDark && styles.cardDark]}>
          <View style={styles.avatar}>
            <Image source={require("../assets/collins-image.webp")} style={styles.avatarImage} />
          </View>

          <Text
            style={[
              styles.name,
              isCompact && styles.nameCompact,
              isDark && styles.textDark,
            ]}
          >
            Ifechukwu Collins Okafor
          </Text>

          <Text style={styles.role}>
            Software Engineer
          </Text>

          <Text style={[styles.description, isDark && styles.mutedTextDark]}>
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
    
    cardDark: {
    backgroundColor: "#1E293B",
  },
  textDark: {
    color: "#F8FAFC",
  },
  mutedTextDark: {
    color: "#CBD5E1",
  },
  mainLayout: {
    gap: 24,
  },

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

  section: {
    marginTop: 30,
  },
})