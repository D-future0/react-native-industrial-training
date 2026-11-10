import { View, Text, Pressable, StyleSheet } from "react-native"
import { AvailabilityProps } from "../types"

export default function AvailabilityToggle({ isWide, isDark, isAvailable, setIsAvailable }: AvailabilityProps) {
    return (
            <View style={[
                styles.availabilityCard,
                isWide && styles.availabilityCardWide,
                isDark && styles.cardDark,
            ]}>
                <View style={styles.availabilityInfo}>
                    <Text style={[styles.availabilityTitle, isDark && styles.textDark]}>
                        Work Availability
                    </Text>

                    <Text style={[styles.availabilityDescription, isDark && styles.mutedTextDark]}>
                        {isAvailable
                            ? "Currently open to opportunities."
                            : "Currently unavailable."}
                    </Text>
                </View>

                <Pressable
                    onPress={() => setIsAvailable(!isAvailable)}
                    style={styles.toggleButton}
                    accessibilityRole="switch"
                    accessibilityLabel="Work availability"
                    accessibilityState={{ checked: isAvailable }}
                >
                    <Text style={styles.toggleText}>
                        {isAvailable ? "ON" : "OFF"}
                    </Text>
                </Pressable>
            </View>
    );
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
    availabilityCard: {
        backgroundColor: "#FFFFFF",
        padding: 18,
        borderRadius: 16,
        marginTop: 28,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    availabilityCardWide: {
        marginTop: 0,
    },

    availabilityInfo: {
        flex: 1,
        minWidth: 0,
        marginRight: 12,
    },

    availabilityTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#172554",
    },

    availabilityDescription: {
        fontSize: 12,
        color: "#64748B",
        marginTop: 6,
    },
    availabilitySubtitle: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "400",
        fontStyle: "italic",
    },

    toggleButton: {
        backgroundColor: "#1D4ED8",
        paddingHorizontal: 17,
        paddingVertical: 10,
        borderRadius: 9,
        flexShrink: 0,
    },

    toggleText: {
        color: "#FFFFFF",
        fontWeight: "800",
    },
})