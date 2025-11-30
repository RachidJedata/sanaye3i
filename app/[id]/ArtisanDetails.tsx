import { useTheme } from '@/context/ThemeContext';
import { getArtisan, getProfessionIcon } from '@/services/service';
import { Artisan } from '@/types/types';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; // Assuming expo-vector-icons is installed
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Image,
    ImageBackground,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function ArtisanDetail() {
    const { id } = useLocalSearchParams();
    const { theme } = useTheme();
    const [artisan, setArtisan] = useState<Artisan | undefined>(undefined);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;

    useEffect(() => {
        setArtisan(getArtisan(Number(id)));
        // Animate on load
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, [id]);

    if (!artisan) {
        return (
            <ImageBackground
                source={require('../../assets/images/5268821.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={[styles.screen, { backgroundColor: 'transparent' }]}>
                    <Animated.Text
                        style={[
                            { color: theme.colors.text, opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        Artisan Not Found
                    </Animated.Text>
                </View>
            </ImageBackground>
        );
    }

    const handleCall = () => {
        Linking.openURL(`tel:${artisan.telephone}`);
    };

    const ProfessionIcon = getProfessionIcon(artisan.metier);
    const bgImage = require('../../assets/images/5268821.jpg');

    return (
        <ImageBackground
            source={bgImage}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <ScrollView
                style={[styles.screen, { backgroundColor: 'transparent' }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Header without Gradient - Background image now provides the visual */}
                <View style={styles.heroContainer}>
                    <Animated.View
                        style={[
                            styles.header,
                            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                        ]}
                    >
                        {/* Avatar Placeholder - In a real app, use artisan.image if available */}
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: 'https://via.placeholder.com/100' }} // Replace with artisan image
                                style={styles.avatar}
                            />
                            <View style={styles.onlineIndicator} />
                        </View>
                        <Text style={[styles.name, { color: '#000' }]}>{artisan.nom}</Text>
                        <View style={styles.jobRow}>
                            <ProfessionIcon size={20} color="#000" />
                            <Text style={[styles.job, { color: '#000', marginLeft: 8 }]}>
                                {artisan.metier}
                            </Text>
                        </View>
                        {artisan.available247 && (
                            <Animated.View
                                style={[
                                    styles.badge,
                                    {
                                        backgroundColor: 'rgba(0,0,0,0.9)',
                                        transform: [{ scale: fadeAnim }],
                                    },
                                ]}
                            >
                                <Ionicons name="time-outline" size={14} color="#fff" />
                                <Text style={[styles.badgeText, { color: '#fff', marginLeft: 4 }]}>
                                    24/7 Available
                                </Text>
                            </Animated.View>
                        )}
                    </Animated.View>
                </View>

                {/* Info Cards with Icons and Animations */}
                <Animated.View
                    style={[
                        styles.infoContainer,
                        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <InfoRow
                        label="Ville"
                        value={artisan.ville}
                        icon={<MaterialIcons name="location-city" size={20} color={theme.colors.iconSecondary} />}
                    />
                    <InfoRow
                        label="Quartier"
                        value={artisan.quartier}
                        icon={<Ionicons name="home-outline" size={20} color={theme.colors.iconSecondary} />}
                    />
                    <InfoRow
                        label="Téléphone"
                        value={artisan.telephone}
                        onPress={handleCall}
                        isLink
                        icon={<Ionicons name="call-outline" size={20} color={theme.colors.link} />}
                    />

                    {artisan.prix && (
                        <InfoRow
                            label="Prix"
                            value={`${artisan.prix} DH`} // Assuming currency
                            icon={<Ionicons name="pricetag-outline" size={20} color={theme.colors.iconSecondary} />}
                        />
                    )}

                    <InfoRow
                        label="Description"
                        value={artisan.description}
                        multiline
                        icon={<MaterialIcons name="description" size={20} color={theme.colors.iconSecondary} />}
                    />

                </Animated.View>

                {/* Call to Action with Pulsing Animation */}
                <Animated.View
                    style={[
                        styles.actions,
                        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: theme.colors.buttonPrimary }]}
                        onPress={handleCall}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[theme.colors.buttonPrimary, theme.colors.iconSecondary || '#ff7e5f']}
                            // colors={[theme.colors.buttonPrimary, theme.colors.buttonSecondary || '#ff7e5f']}
                            style={styles.buttonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Ionicons name="call" size={20} color={theme.colors.buttonText} />
                            <Text style={[styles.buttonText, { color: theme.colors.buttonText, marginLeft: 8 }]}>
                                Appeler Maintenant
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </ImageBackground>
    );
}

function InfoRow({
    label,
    value,
    onPress,
    isLink = false,
    multiline = false,
    icon,
}: {
    label: string;
    value: string;
    onPress?: () => void;
    isLink?: boolean;
    multiline?: boolean;
    icon?: React.ReactNode;
}) {
    const { theme } = useTheme();
    const Container = isLink ? TouchableOpacity : View;

    return (
        <Container
            style={[
                styles.infoRow,
                {
                    backgroundColor: theme.colors.cardBackground,
                    shadowColor: '#000',
                    // shadowColor: theme.colors.shadow || '#000',
                },
                isLink && { borderColor: theme.colors.link, borderWidth: 1 },
            ]}
            onPress={onPress}
            activeOpacity={isLink ? 0.7 : 1}
        >
            <View style={styles.infoRowContent}>
                {icon}
                <View style={styles.infoTextContainer}>
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
                </View>
                {isLink && <Ionicons name="chevron-forward" size={20} color={theme.colors.link} />}
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    backgroundImage: { flex: 1, width: '100%', height: '100%' },
    screen: {
        flex: 1,
    },
    heroContainer: {
        paddingTop: 60,
        paddingBottom: 40,
        alignItems: 'center',
        // Removed borderRadius and overflow since no gradient
    },
    header: {
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#000',
    },
    onlineIndicator: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#A3D78A',
    },
    name: {
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 8,
    },
    jobRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    job: {
        fontSize: 20,
        fontWeight: '600',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    badgeText: {
        fontSize: 14,
        fontWeight: '700',
    },
    infoContainer: {
        padding: 16,
        marginTop: -20, // Overlap with hero
    },
    infoRow: {
        borderRadius: 16,
        marginBottom: 16,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
    },
    infoRowContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    infoTextContainer: {
        flex: 1,
        marginLeft: 12,
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
    },
    infoValueMultiline: {
        lineHeight: 24,
    },
    actions: {
        padding: 16,
        marginBottom: 50,
        alignItems: 'center',
    },
    button: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 32,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '700',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
    },
});
