// screens/Home.tsx

import { artisans, cities, professions } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { Heart, MapPin, Search, X, ShoppingBag } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    ImageBackground, // ImageBackground importée
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
// IMPORTATION NÉCESSAIRE
import { router } from 'expo-router';
import ArtisanCard from '../components/ArtisanCard';
import CategoryPill from '../components/CategoryPill';
import { City, Profession } from '../types/types';

// Assurez-vous que le chemin est correct : un seul '../' pour remonter de 'screens' à la racine
// puis on accède à 'assets/images/background_poterie.jpg'
const bgImage = require('../assets/images/5268821.jpg'); 

const Home: React.FC = () => {
    // UTILISER LE HOOK useNavigation
    
    
    const { theme, isFavorite, isReady } = useTheme();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState<City | ''>('');
    const [selectedCategory, setSelectedCategory] = useState<Profession | null>(null);
    const [isFavoritesFilterActive, setIsFavoritesFilterActive] = useState(false);

    // Filtrage des artisans (optimisé avec useMemo)
    const filteredArtisans = useMemo(() => {
        return artisans.filter((artisan) => {
            const matchesSearch =
                artisan.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                artisan.metier.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCity = selectedCity ? artisan.ville === selectedCity : true;
            const matchesCategory = selectedCategory ? artisan.metier === selectedCategory : true;

            const matchesFavorites = isFavoritesFilterActive
                ? isFavorite(artisan.id)
                : true;

            return matchesSearch && matchesCity && matchesCategory && matchesFavorites;
        });
    }, [searchQuery, selectedCity, selectedCategory, isFavoritesFilterActive, isFavorite]);

    const toggleCategory = (cat: Profession) => {
        setSelectedCategory(selectedCategory === cat ? null : cat);
    };

    // Composant pour l'en-tête de la liste (Search, Filtres, Catégories)
    const renderHeader = () => (
        <View>
            <View style={styles.topActionsRow}>
                <Text style={[styles.appTitle, { color: theme.colors.text }]}>
                    Annuaire des Services
                </Text>
                
                <TouchableOpacity
                    style={[styles.boutiqueButton, { backgroundColor: theme.colors.link }]}
                    onPress={() => router.push('/boutique')} 
                >
                    <ShoppingBag color="white" size={20} style={{marginRight: 5}}/>
                    <Text style={styles.boutiqueButtonText}>Boutique</Text>
                </TouchableOpacity>
            </View>

            {/* Search Header */}
            <View style={styles.headerContainer}>
                <View
                    style={[
                        styles.searchContainer,
                        { borderColor: theme.colors.border, backgroundColor: theme.colors.cardBackground }
                    ]}
                >
                    <Search color={theme.colors.placeholder} size={20} />
                    <TextInput
                        style={[styles.searchInput, { color: theme.colors.text }]}
                        placeholder="Rechercher un artisan, un métier..."
                        placeholderTextColor={theme.colors.placeholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        onSubmitEditing={Keyboard.dismiss} 
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')} style={{paddingLeft: 5}}>
                            <X color={theme.colors.placeholder} size={20} />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.filterRow}>
                    <View style={[styles.pickerContainer, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
                        <MapPin color={theme.colors.placeholder} size={18} style={styles.mapPinIcon} />
                        <Picker
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => setSelectedCity(itemValue as City)}
                            style={[styles.picker, { color: theme.colors.text }]}
                            dropdownIconColor={theme.colors.text}
                            mode="dropdown"
                        >
                            <Picker.Item label="Toutes les villes" value="" style={{fontSize: 14}} />
                            {cities.map((city) => (
                                <Picker.Item key={city} label={city} value={city} style={{fontSize: 14}}/>
                            ))}
                        </Picker>
                    </View>

                    {/* Bouton Favoris */}
                    <TouchableOpacity
                        style={[
                            styles.favoritesButton,
                            {
                                backgroundColor: isFavoritesFilterActive
                                    ? theme.colors.link
                                    : theme.colors.cardBackground,
                                borderColor: theme.colors.border
                            }
                        ]}
                        onPress={() => setIsFavoritesFilterActive(prev => !prev)}
                    >
                        <Heart
                            color={isFavoritesFilterActive ? '#FFFFFF' : theme.colors.placeholder}
                            fill={isFavoritesFilterActive ? '#FFFFFF' : 'none'}
                            size={22}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Categories Horizontal Scroll */}
            <View style={styles.categoriesSection}>
                {/* TextShadow pour améliorer la lisibilité sur l'image de fond */}
                <Text style={[styles.sectionTitle, { color: theme.colors.text, textShadowColor: 'rgba(0,0,0,0.3)', textShadowRadius: 3 }]}>
                    Catégories
                </Text>
                <FlatList 
                    horizontal
                    data={professions}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesScrollContent}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <CategoryPill
                            category={item}
                            isSelected={selectedCategory === item}
                            onPress={() => toggleCategory(item)}
                        />
                    )}
                />
            </View>

            {/* Titre des résultats */}
            <View style={styles.resultsHeader}>
                <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>
                    Résultats ({filteredArtisans.length})
                </Text>
                {selectedCategory && (
                    <TouchableOpacity
                        style={[styles.activeFilterPill, { backgroundColor: theme.colors.pillSelected }]}
                        onPress={() => setSelectedCategory(null)}
                    >
                        <Text style={{ color: theme.colors.pillText, fontSize: 12 }}>{selectedCategory}</Text>
                        <X color={theme.colors.pillText} size={12} style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    // Affichage "Aucun résultat"
    const renderEmptyState = () => {
        if (!isReady) return null;
        return (
            <View style={styles.noResults}>
                <View style={[styles.noResultsIconBg, { backgroundColor: theme.colors.noResultsIconBg }]}>
                    <Search color={theme.colors.placeholder} size={40} />
                </View>
                <Text style={[styles.noResultsText, { color: theme.colors.text }]}>
                    Aucun artisan trouvé pour ces critères.
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setSearchQuery('');
                        setSelectedCity('');
                        setSelectedCategory(null);
                        setIsFavoritesFilterActive(false);
                    }}
                >
                    <Text style={[styles.clearFiltersText, { color: theme.colors.link }]}>
                        Effacer les filtres
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        // ImageBackground pour la photo de la poterie
        <ImageBackground 
            source={bgImage} 
            style={styles.backgroundImage} 
            resizeMode="cover"
        >
            {/* Overlay (Voile) pour améliorer la visibilité du texte */}
            <View style={[
                styles.overlay, 
                // Opacité réduite : 70% pour le mode clair, 75% pour le mode sombre
                { backgroundColor: theme.dark ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.70)' } 
            ]}>
                
                {!isReady ? (
                    // État de chargement
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={theme.colors.link} />
                        <Text style={{ color: theme.colors.placeholder, marginTop: 10 }}>Chargement des artisans...</Text>
                    </View>
                ) : (
                    // Liste des résultats
                    <FlatList
                        data={filteredArtisans}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ArtisanCard artisan={item} />}
                        ListHeaderComponent={renderHeader}
                        ListEmptyComponent={renderEmptyState}
                        contentContainerStyle={styles.listContent}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                        onScrollBeginDrag={Keyboard.dismiss} // Ferme le clavier quand on scrolle
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default Home;

const styles = StyleSheet.create({
    backgroundImage: { flex: 1, width: '100%', height: '100%', },
    overlay: { flex: 1, paddingHorizontal: 16, },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    
    // Nouveaux Styles pour le bouton Boutique
    topActionsRow: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10,
        marginTop: 10 // Aligner avec l'ancien marginTop
    },
    appTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    boutiqueButton: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        // Note: Le border est optionnel ici car on utilise link comme background
        // borderWidth: 1,
    },
    boutiqueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    // Fin des Nouveaux Styles

    // Header & Search
    headerContainer: { marginBottom: 16, /* marginTop: 10 a été déplacé dans topActionsRow */ },
    searchContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingHorizontal: 12, height: 48, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, },
    searchInput: { flex: 1, marginLeft: 8, height: '100%' },
    
    // Filters Row
    filterRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, justifyContent: 'space-between' },
    pickerContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, paddingLeft: 10, marginRight: 10, height: 48, overflow: 'hidden', },
    mapPinIcon: { marginRight: 0 },
    picker: { flex: 1 },
    favoritesButton: { width: 48, height: 48, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', },

    // Categories
    categoriesSection: { marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    categoriesScrollContent: { paddingRight: 16 },
    
    // Results Header
    resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    resultsTitle: { fontSize: 18, fontWeight: 'bold' },
    activeFilterPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, },

    // List Layout
    listContent: { paddingBottom: 40 },

    // Empty State
    noResults: { alignItems: 'center', marginTop: 40 },
    noResultsIconBg: { borderRadius: 40, width: 80, height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 16, },
    noResultsText: { fontSize: 16, marginBottom: 8 },
    clearFiltersText: { fontSize: 14, fontWeight: '600' },
});