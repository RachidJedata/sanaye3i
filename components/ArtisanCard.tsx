import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ChevronRight, MapPin, Phone } from 'lucide-react-native';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Artisan, RootStackParamList } from '../constants/types';

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

interface ArtisanCardProps {
    artisan: Artisan;
}

const ArtisanCard: React.FC<ArtisanCardProps> = ({ artisan }) => {
    const navigation = useNavigation<NavigationType>();

    const handleCall = () => {
        const phoneNumber = `tel:${artisan.telephone}`;
        Linking.canOpenURL(phoneNumber)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(phoneNumber);
                }
            })
            .catch((err) => console.error(err));
    };

    const goToProfile = () => {
        navigation.navigate('ArtisanDetail', { id: artisan.id });
    };

    return (
        <TouchableOpacity onPress={goToProfile} style={styles.card}>
            <View style={styles.header}>
                <View style={styles.info}>
                    <View style={styles.titleRow}>
                        <Text style={styles.name} numberOfLines={1}>{artisan.nom}</Text>

                        <View style={styles.jobBadge}>
                            <Text style={styles.jobText}>{artisan.metier}</Text>
                        </View>
                    </View>

                    <View style={styles.locationRow}>
                        <MapPin color="#6B7280" size={14} style={{ marginRight: 4 }} />
                        <Text style={styles.locationText} numberOfLines={1}>
                            {artisan.ville} • {artisan.quartier}
                        </Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.callButton} onPress={handleCall}>
                            <Phone color="#047857" size={16} style={{ marginRight: 4 }} />
                            <Text style={styles.callText}>Appeler</Text>
                        </TouchableOpacity>

                        <View style={styles.profileLink}>
                            <Text style={styles.profileText}>Voir profil</Text>
                            <ChevronRight color="#2563EB" size={16} />
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
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        marginVertical: 8,
        // shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // elevation for Android
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
    },
    info: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
    },
    jobBadge: {
        backgroundColor: '#DBEAFE', // blue-50-ish
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    jobText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1E3A8A', // blue-700-ish
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#6B7280', // gray-500-ish
    },
    actions: {
        flexDirection: 'row',
        marginTop: 12,
        alignItems: 'center',
    },
    callButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DCFCE7', // green-50-ish
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
    },
    callText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#064E3B', // green-700-ish
    },
    profileLink: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    profileText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#2563EB', // blue-600-ish
        marginRight: 4,
    },
});
