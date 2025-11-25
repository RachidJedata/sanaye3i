import { artisans, cities, professions } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';
import { Picker } from '@react-native-picker/picker';
import { Heart, MapPin, Search, X } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ArtisanCard from '../components/ArtisanCard';
import CategoryPill from '../components/CategoryPill';
import { City, Profession } from '../types/types';

const Home: React.FC = () => {

    const { theme, isFavorite, isReady } = useTheme();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState<City | ''>('');
    const [selectedCategory, setSelectedCategory] = useState<Profession | null>(null);
    const [isFavoritesFilterActive, setIsFavoritesFilterActive] = useState(false);

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
    }, [searchQuery, selectedCity, selectedCategory, isFavoritesFilterActive]);

    const toggleCategory = (cat: Profession) => {
        setSelectedCategory(selectedCategory === cat ? null : cat);
    };


    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

            {/* Search Header */}
            <View style={styles.header}>
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
                    />
                </View>

                <View style={styles.filterRow}>
                    <View style={styles.pickerWrapper}>
                        <MapPin color={theme.colors.placeholder} size={20} style={styles.mapPinIcon} />

                        <Picker
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => setSelectedCity(itemValue as City)}
                            style={[
                                styles.picker,
                                {
                                    color: theme.colors.text,
                                    backgroundColor: theme.colors.cardBackground,

                                    borderColor: 'transparent',
                                    borderWidth: 0,
                                    borderStyle: undefined,
                                }
                            ]}
                            dropdownIconColor={theme.colors.text}
                        >
                            <Picker.Item label="Toutes les villes" value="" />
                            {cities.map((city) => (
                                <Picker.Item key={city} label={city} value={city} />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.favoritesButton,
                            {
                                backgroundColor: isFavoritesFilterActive
                                    ? theme.colors.link // Use primary color when active
                                    : theme.colors.cardBackground,
                                borderColor: theme.colors.border
                            }
                        ]}
                        onPress={() => setIsFavoritesFilterActive(prev => !prev)}
                    >
                        <Heart
                            color={isFavoritesFilterActive ? '#FFFFFF' : theme.colors.placeholder}
                            fill={isFavoritesFilterActive ? theme.colors.link : 'none'}
                            size={22}
                        />
                    </TouchableOpacity>

                    {selectedCategory && (
                        <TouchableOpacity
                            style={[
                                styles.clearCategoryButton,
                                {
                                    backgroundColor: theme.colors.pillSelected,
                                    borderColor: theme.colors.border,
                                },
                            ]}
                            onPress={() => setSelectedCategory(null)}
                        >
                            <Text style={{ color: theme.colors.pillText }}>{selectedCategory}</Text>
                            <X color={theme.colors.pillText} size={14} style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Categories */}
            <View>
                <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Catégories</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                    {professions.map((prof) => (
                        <CategoryPill
                            key={prof}
                            category={prof}
                            isSelected={selectedCategory === prof}
                            onPress={() => toggleCategory(prof)}
                        />
                    ))}
                </ScrollView>
            </View>

            {/* Results */}
            <View style={styles.resultsSection}>
                <Text style={[styles.resultsTitle, { color: theme.colors.text }]}>
                    Résultats ({filteredArtisans.length})
                </Text>

                {filteredArtisans.length > 0 ? (
                    (isReady ? <FlatList
                        data={filteredArtisans}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ArtisanCard artisan={item} />}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    /> : <Text style={{ color: theme.colors.text, marginTop: 20 }}>Loading...</Text>)

                ) : (
                    <View style={styles.noResults}>
                        <View
                            style={[
                                styles.noResultsIconBg,
                                { backgroundColor: theme.colors.noResultsIconBg }
                            ]}
                        >
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
                            }}
                        >
                            <Text style={[styles.clearFiltersText, { color: theme.colors.link }]}>
                                Effacer les filtres
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { marginBottom: 16 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: { flex: 1, marginLeft: 8, height: 40 },
    filterRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, justifyContent: 'space-between', },
    pickerWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    mapPinIcon: { marginRight: 8 },
    picker: { flex: 1, height: 53 },
    clearCategoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft: 8,
    },

    favoritesButton: {
        padding: 10,
        borderRadius: 24,
        borderWidth: 1,
        marginLeft: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    clearCategoryText: { fontSize: 14 },

    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    categoriesScroll: { flexDirection: 'row' },

    resultsSection: { flex: 1 },
    resultsTitle: { fontSize: 18, fontWeight: 'bold' },

    noResults: { alignItems: 'center', marginTop: 40 },
    noResultsIconBg: {
        borderRadius: 40,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    noResultsText: { fontSize: 16, marginBottom: 8 },
    clearFiltersText: { fontSize: 14 },
});
