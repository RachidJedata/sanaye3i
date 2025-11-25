import { useTheme } from '@/context/ThemeContext';
import { getArtisan, getProfessionIcon } from '@/services/service';
import { Artisan, RootStackParamList } from '@/types/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

export default function ArtisanDetail() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();

    const [artisan, setArtisan] = useState<Artisan | undefined>(undefined);

    useEffect(() => {
        setArtisan(getArtisan(Number(id)));
    }, [id]);

    if (!artisan) {
        return (
            <View style={[styles.screen, { backgroundColor: theme.colors.background }]}>
                <Text style={{ color: theme.colors.text }}>Artisan Not Found</Text>
            </View>
        );
    }

    const handleCall = () => {
        Linking.openURL(`tel:${artisan.telephone}`);
    };

    const ProfessionIcon = getProfessionIcon(artisan.metier);

    return (
        <ScrollView style={[styles.screen, { backgroundColor: theme.colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.name, { color: theme.colors.text }]}>{artisan.nom}</Text>

                <View style={styles.jobRow}>
                    <ProfessionIcon size={16} color={theme.colors.iconSecondary} />
                    <Text style={[styles.job, { color: theme.colors.jobBadgeText, marginLeft: 6 }]}>
                        {artisan.metier}
                    </Text>
                </View>

                {artisan.available247 && (
                    <View
                        style={[
                            styles.badge,
                            { backgroundColor: theme.colors.badgeAvailableBackground },
                        ]}
                    >
                        <Text style={[styles.badgeText, { color: theme.colors.badgeAvailableText }]}>
                            24/7 Available
                        </Text>
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

            {/* <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: theme.colors.buttonPrimary }]}
                    onPress={handleCall}
                >
                    <Text style={[styles.buttonText, { color: theme.colors.buttonText }]}>
                        Call
                    </Text>
                </TouchableOpacity>
            </View> */}
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
    const { theme } = useTheme();
    const Container = isLink ? TouchableOpacity : View;

    return (
        <Container
            style={[
                styles.infoRow,
                { backgroundColor: theme.colors.cardBackground },
                isLink && { borderColor: theme.colors.link, borderWidth: 1 },
            ]}
            onPress={onPress}
            activeOpacity={isLink ? 0.7 : 1}
        >
            <Text style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                {label}
            </Text>
            <Text
                style={[
                    styles.infoValue,
                    multiline && styles.infoValueMultiline,
                    { color: theme.colors.text },
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
        padding: 16,
    },
    header: {
        marginBottom: 32,
        alignItems: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: '700',
    },
    jobRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    job: {
        fontSize: 18,
    },
    badge: {
        marginTop: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        overflow: 'hidden',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
    infoContainer: {
        // optional spacing
    },
    infoRow: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoLabel: {
        fontSize: 14,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    infoValueMultiline: {
        lineHeight: 22,
    },
    actions: {
        marginTop: 24,
        alignItems: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
