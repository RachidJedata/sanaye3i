import { useTheme } from '@/context/ThemeContext';
import { MyDarkTheme, MyLightTheme } from '@/theme/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronRight, MapPin, Phone } from 'lucide-react-native';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Artisan, RootStackParamList } from '../types/types';
import { GetProfessionIcon } from '@/services/service';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

interface ArtisanCardProps {
    artisan: Artisan;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
    const navigation = useNavigation<NavigationType>();

    const { isDarkMode } = useTheme();
    const theme = isDarkMode ? MyDarkTheme : MyLightTheme;

    const handleCall = () => {
        const phoneNumber = `tel:${artisan.telephone}`;
        Linking.canOpenURL(phoneNumber)
            .then((supported) => {
                if (supported) Linking.openURL(phoneNumber);
            })
            .catch((err) => console.error(err));
    };

    const goToProfile = () => {
        navigation.navigate('ArtisanDetail', { id: artisan.id });
    };

    const Icon = GetProfessionIcon(artisan.metier);

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

                        <View
                            style={[
                                styles.jobBadge,
                                {
                                    backgroundColor: theme.colors.jobBadgeBackground,
                                    borderRadius: 50
                                },
                            ]}
                        >
                            <Text style={[styles.jobText, { color: theme.colors.jobBadgeText }]}>
                                {artisan.metier} <Icon size={16} />
                            </Text>


                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <MapPin color={theme.colors.iconSecondary} size={14} style={{ marginRight: 4 }} />
                        <Text style={[styles.locationText, { color: theme.colors.textSecondary }]} numberOfLines={1}>
                            {artisan.ville} • {artisan.quartier}
                        </Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity
                            style={[styles.callButton, { backgroundColor: theme.colors.callButtonBg }]}
                            onPress={handleCall}
                        >
                            <Phone color={theme.colors.callButtonIcon} size={16} style={{ marginRight: 4 }} />
                            <Text style={[styles.callText, { color: theme.colors.callButtonText }]}>
                                Appeler
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.profileLink}>
                            <Text style={[styles.profileText, { color: theme.colors.link }]}>Voir profil</Text>
                            <ChevronRight color={theme.colors.link} size={16} />
                        </View>
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
    actions: { flexDirection: 'row', marginTop: 12, alignItems: 'center' },
    callButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12 },
    callText: { fontSize: 14, fontWeight: '500' },
    profileLink: { flexDirection: 'row', alignItems: 'center', marginLeft: 16 },
    profileText: { fontSize: 14, fontWeight: '500', marginRight: 4 },
});
