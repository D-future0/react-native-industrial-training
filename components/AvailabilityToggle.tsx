import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import type { AvailabilityProps } from "../types"
import { useTheme } from "../lib/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AvailabilityToggle({
    isWide,
    onAvailabilityChange,
}: AvailabilityProps) {
    const [isAvailable, setIsAvailable] = useState(true);
    const [availabilityLoaded, setAvailabilityLoaded] = useState(false);
    const { colors } = useTheme();

    useEffect(() => {
        let isMounted = true;

        const loadAvailability = async () => {
            let loadedAvailability = true;
            try {
                const savedAvailability = await AsyncStorage.getItem("@work_availability");
                if (savedAvailability === "true" || savedAvailability === "false") {
                    loadedAvailability = savedAvailability === "true";
                } else if (savedAvailability !== null) {
                    console.error("Invalid saved work availability:", savedAvailability);
                }
            } catch (error) {
                console.error("Error loading availability:", error);
            }

            if (isMounted) {
                setIsAvailable(loadedAvailability);
                onAvailabilityChange(loadedAvailability);
                setAvailabilityLoaded(true);
            }
        };

        void loadAvailability();
        return () => {
            isMounted = false;
        };
    }, [onAvailabilityChange]);

    const toggleAvailability = async () => {
        const nextAvailability = !isAvailable;
        setIsAvailable(nextAvailability);
        onAvailabilityChange(nextAvailability);

        try {
            await AsyncStorage.setItem("@work_availability", String(nextAvailability));
        } catch (error) {
            console.error("Error saving availability:", error);
        }
    };

    return (
            <View style={[
                styles.availabilityCard,
                isWide && styles.availabilityCardWide,
                { backgroundColor: colors.surface },
            ]}>
                <View style={styles.availabilityInfo}>
                    <Text style={[styles.availabilityTitle, { color: colors.text }]}>
                        Work Availability
                    </Text>

                    <Text style={[styles.availabilityDescription, { color: colors.mutedText }]}>
                        {isAvailable
                            ? "Currently open to opportunities."
                            : "Currently unavailable."}
                    </Text>
                </View>

                <Pressable
                    onPress={toggleAvailability}
                    style={[styles.toggleButton, { backgroundColor: colors.primary }]}
                    accessibilityRole="switch"
                    accessibilityLabel="Work availability"
                    accessibilityState={{ checked: isAvailable }}
                    disabled={!availabilityLoaded}
                >
                    <Text style={[styles.toggleText, { color: colors.inverseText }]}>
                        {isAvailable ? "ON" : "OFF"}
                    </Text>
                </Pressable>
            </View>
    );
}

const styles = StyleSheet.create({
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