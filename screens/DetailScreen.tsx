import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MapPin, Phone, Heart, Share2, Wrench } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { artisans } from '@/constants/data'; // Assurez-vous d'importer la liste des artisans

// --- TYPAGE (Adaptez selon votre navigation) ---
// Supposons que votre navigation est définie comme suit :
type RootStackParamList = {
    FicheArtisan: { artisanId: number };
};
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'FicheArtisan'>;

const DetailScreen: React.FC = () => {
    const { theme, isFavorite, toggleFavorite } = useTheme();
    const route = useRoute<DetailScreenRouteProp>();
    
    // Récupération de l'ID passé en paramètre
    const { artisanId } = route.params;

    // Trouver l'artisan correspondant
    const artisan = artisans.find(a => a.id === artisanId);

    if (!artisan) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
                <Text style={{ color: theme.colors.text }}>Artisan non trouvé.</Text>
            </View>
        );
    }
    
    // --- FONCTIONS DE GESTION ---
    
    // Fonction pour lancer l'appel téléphonique 
    const handleCall = () => {
        const phoneNumber = artisan.telephone.replace(/\s/g, ''); // Enlever les espaces
        // Utilisation de Linking pour ouvrir l'application d'appel
        Linking.openURL(`tel:${phoneNumber}`); 
    };

    // Fonction pour partager le contact (bonus) [cite: 42]
    const handleShare = () => {
        const message = `Contact Artisan: ${artisan.nom} (${artisan.metier}) - Tél: ${artisan.telephone}. Retrouvé sur Sanaye3i.`;
        // Utilisation de Linking pour le partage universel
        Linking.openURL(`sms:&body=${encodeURIComponent(message)}`);
        // Pour un partage plus riche (WhatsApp, etc.), utilisez l'API Share de React Native
        // ex: Share.share({ message: message });
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            
            {/* 1. Header et Photo (Placeholder) */}
            <View style={[styles.headerContainer, { backgroundColor: theme.colors.cardBackground }]}>
                <Image
                    // Remplacez ceci par un chemin réel vers la photo de profil de l'artisan
                    source={{ uri: 'https://via.placeholder.com/150/003D73/FFFFFF?text=P' }} 
                    style={styles.profileImage}
                />
                
                {/* Nom et Métier */}
                <Text style={[styles.name, { color: theme.colors.text }]}>
                    {artisan.nom} [cite: 21]
                </Text>
                <View style={styles.metierContainer}>
                    <Wrench color={theme.colors.link} size={18} />
                    <Text style={[styles.metier, { color: theme.colors.link }]}>
                        {artisan.metier} [cite: 22]
                    </Text>
                </View>

                {/* Boutons d'Action (Appeler & Favoris) */}
                <View style={styles.actionsRow}>
                    <TouchableOpacity 
                        style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                        onPress={handleCall}
                    >
                        <Phone color="#FFFFFF" size={24} />
                        <Text style={styles.actionButtonText}>Appeler [cite: 16]</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[
                            styles.favoriteButton, 
                            { 
                                borderColor: theme.colors.placeholder,
                                backgroundColor: isFavorite(artisan.id) ? theme.colors.link : theme.colors.cardBackground 
                            }
                        ]}
                        onPress={() => toggleFavorite(artisan.id)}
                    >
                        <Heart 
                            color={isFavorite(artisan.id) ? '#FFFFFF' : theme.colors.placeholder} 
                            fill={isFavorite(artisan.id) ? '#FFFFFF' : 'none'}
                            size={24} 
                        />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.favoriteButton, { borderColor: theme.colors.placeholder }]}
                        onPress={handleShare}
                    >
                        <Share2 color={theme.colors.placeholder} size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* 2. Détails (Localisation et Description) */}
            <View style={styles.detailsContainer}>
                
                {/* Bloc Localisation */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
                    Localisation
                </Text>
                <View style={[styles.infoBlock, { backgroundColor: theme.colors.cardBackground }]}>
                    <MapPin color={theme.colors.placeholder} size={20} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.infoText, { color: theme.colors.text }]}>
                            {artisan.ville} [cite: 24]
                        </Text>
                        {artisan.quartier && (
                            <Text style={[styles.infoSubtitle, { color: theme.colors.placeholder }]}>
                                Secteur d'intervention : {artisan.quartier} [cite: 24]
                            </Text>
                        )}
                    </View>
                </View>
                
                {/* Bloc Description */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 20 }]}>
                    Services et Description [cite: 25]
                </Text>
                <View style={[styles.descriptionBlock, { backgroundColor: theme.colors.cardBackground }]}>
                    <Text style={{ color: theme.colors.text, lineHeight: 22 }}>
                        {artisan.description} [cite: 25]
                    </Text>
                </View>
                
                {/* Note sur la base de données */}
                 <View style={styles.noteContainer}>
                    <Text style={[styles.noteText, { color: theme.colors.placeholder }]}>
                        *Les informations ci-dessus proviennent d'une base de données locale (projet académique). [cite: 28, 29]
                    </Text>
                </View>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Header
    headerContainer: {
        alignItems: 'center',
        padding: 20,
        paddingTop: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#EAEAEA',
    },
    name: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    metierContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    metier: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 5,
    },
    // Actions
    actionsRow: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
        width: '100%',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
        flex: 1,
        marginRight: 10,
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    favoriteButton: {
        width: 48,
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    // Details
    detailsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoSubtitle: {
        fontSize: 14,
    },
    descriptionBlock: {
        padding: 15,
        borderRadius: 12,
        minHeight: 100,
    },
    noteContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    noteText: {
        fontSize: 12,
        fontStyle: 'italic',
    }
});

export default DetailScreen;