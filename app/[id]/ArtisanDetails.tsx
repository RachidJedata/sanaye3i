import { useTheme } from '@/context/ThemeContext';
import { Artisan, City, Profession } from '@/types/types';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ArtisanDetail() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();

    const artisan: Artisan = {
        id: Number(id),
        nom: "Mechanic",
        metier: Profession.Mechanic,
        ville: City.Agadir,
        quartier: "Quartier",
        telephone: "0601010101",
        description:
            "Experienced mechanic specializing in car repairs and diagnostics. Skilled in engine repair, brake systems, and preventive maintenance. Available around the clock for emergency services.",
        available247: true,
    };

    const handleCall = () => {
        Linking.openURL(`tel:${artisan.telephone}`);
    };

    return (
        <ScrollView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.name, { color: theme.colors.text }]}>{artisan.nom}</Text>
                <Text style={[styles.job, { color: theme.colors.jobBadgeText }]}>{artisan.metier}</Text>
                {artisan.available247 && (
                    <View style={styles.badge}>
                        <Text style={[styles.badgeText, { color: theme.colors.jobBadgeText }]}>24/7 Available</Text>
                    </View>
                )}
            </View>

            <View style={styles.infoContainer}>
                <InfoRow label="Ville" value={artisan.ville} />
                <InfoRow label="Quartier" value={artisan.quartier} />
                <InfoRow
                    label="Téléphone"
                    value={artisan.telephone}
                    onPress={handleCall}
                    isLink
                />
                <InfoRow
                    label="Description"
                    value={artisan.description}
                    multiline
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.button} onPress={handleCall}>
                    <Text style={[styles.buttonText, { color: theme.colors.text }]}>Call</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

function InfoRow({
    label,
    value,
    onPress,
    isLink = false,
    multiline = false,
}: {
    label: string;
    value: string;
    onPress?: () => void;
    isLink?: boolean;
    multiline?: boolean;
}) {
    const Container: any = isLink ? TouchableOpacity : View;
    const { theme } = useTheme();

    return (
        <Container
            style={[styles.infoRow, { backgroundColor: theme.colors.background }, isLink && styles.infoRowLink]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={styles.infoLabel}>{label}</Text>
            <Text
                style={[
                    styles.infoValue,
                    multiline && styles.infoValueMultiline,
                ]}
            >
                {value}
            </Text>
        </Container>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16, // base spacing on 8pt grid
    },
    header: {
        marginBottom: 32,
        alignItems: "center",
    },
    name: {
        fontSize: 28,
        fontWeight: "700",
    },
    job: {
        fontSize: 18,
        marginTop: 4,
    },
    badge: {
        marginTop: 12,
        backgroundColor: "#34D399",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "600",
    },
    infoContainer: {
        // spacing between cards
    },
    infoRow: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        // shadow / elevation
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRowLink: {
        borderColor: "#2563EB",
        borderWidth: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    infoValueMultiline: {
        lineHeight: 22,
    },
    actions: {
        marginTop: 24,
        alignItems: "center",
    },
    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
    },
});
