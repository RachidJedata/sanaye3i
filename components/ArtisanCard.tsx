import { useTheme } from '@/context/ThemeContext';
import { getProfessionIcon } from '@/services/service';
import { router } from 'expo-router';
import { ChevronRight, Heart, MapPin, Phone, Share2 } from 'lucide-react-native';
import React from 'react';
import { Linking, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Artisan } from '../types/types';



interface ArtisanCardProps {
    artisan: Artisan;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
    const { theme, toggleFavorite, isFavorite } = useTheme();

    const Icon = getProfessionIcon(artisan.metier);

    const handleCall = () => {
        const phoneNumber = `tel:${artisan.telephone}`;
        Linking.canOpenURL(phoneNumber)
            .then(supported => supported && Linking.openURL(phoneNumber))
            .catch(err => console.error(err));
    };

    const goToProfile = () => {

        const artisanId = artisan.id;

        router.push({
            pathname: "/[id]/ArtisanDetails",
            params: { id: artisanId },
        });
    };

    const handleShare = (e: any) => {
        e.stopPropagation();
        const message = `Artisan: ${artisan.nom}\nMétier: ${artisan.metier}\nTél: ${artisan.telephone}`;
        Share.share({ message });
    };

    return (
        <TouchableOpacity
            onPress={goToProfile}
            style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
        >
            <View style={styles.header}>
                <View style={styles.info}>
                    <View style={styles.titleRow}>
                        <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={1}>
                            {artisan.nom}
                        </Text>

                        <View style={[styles.jobBadge, { backgroundColor: theme.colors.jobBadgeBackground }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Icon size={16} />
                                <Text style={[styles.jobText, { color: theme.colors.jobBadgeText }]}>{artisan.metier}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <MapPin color={theme.colors.iconSecondary} size={14} style={{ marginRight: 4 }} />
                        <Text style={[styles.locationText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                            {artisan.ville} • {artisan.quartier}
                        </Text>
                    </View>

                    <View style={styles.actions}>
                        {/* Call button */}
                        <TouchableOpacity
                            style={[styles.callButton]}
                            onPress={handleCall}
                        >
                            <Phone color={theme.colors.callButtonIcon} size={16} style={{ marginRight: 4 }} />
                        </TouchableOpacity>

                        {/* Favorite button */}
                        <TouchableOpacity
                            onPress={(e) => { e.stopPropagation(); toggleFavorite(artisan.id); }}
                            style={styles.favoriteButton}
                        >
                        
                            <Text style={{ fontSize: 18, color: isFavorite(artisan.id) ? 'red' : '#999' }}>
                                ❤️
                            </Text>
                        
                        </TouchableOpacity>

                            
                    

                        {/* Share button */}
                        <TouchableOpacity
                            style={[styles.shareButton]}
                            onPress={handleShare}
                        >
                            <Share2 color={theme.colors.callButtonIcon} size={16} style={{ marginRight: 4 }} />
                        </TouchableOpacity>


                        {/* Voir profil link */}
                        <TouchableOpacity
                            style={styles.profileLink}
                            onPress={(e) => { e.stopPropagation(); goToProfile(); }}
                        >
                            <Text style={[styles.profileText, { color: theme.colors.link }]}>Voir profil</Text>
                            <ChevronRight color={theme.colors.link} size={16} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ArtisanCard;

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    header: { flexDirection: 'row' },
    info: { flex: 1 },
    titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    name: { fontSize: 18, fontWeight: 'bold', flex: 1, marginRight: 8 },
    jobBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
    jobText: { fontSize: 12, fontWeight: '600' },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
    locationText: { fontSize: 14 },
    actions: { flexDirection: 'row', marginTop: 12, alignItems: 'center', flexWrap: 'wrap', gap: 8 },
    callButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    favoriteButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    shareButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    callText: { fontSize: 14, fontWeight: '500' },
    profileLink: { flexDirection: 'row', alignItems: 'center', marginLeft: 16 },
    profileText: { fontSize: 14, fontWeight: '500', marginRight: 4 },
});
