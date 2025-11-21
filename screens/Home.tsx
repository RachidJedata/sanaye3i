import { artisans, cities, professions } from '@/constants/data';
import { Picker } from '@react-native-picker/picker'; // for dropdown :contentReference[oaicite:3]{index=3}  
import { MapPin, Search, X } from 'lucide-react-native'; // React Native version of Lucide :contentReference[oaicite:4]{index=4}  
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ArtisanCard from '../components/ArtisanCard'; // also RN  
import CategoryPill from '../components/CategoryPill';
import { City, Profession } from '../constants/types';

const Home: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState<City | ''>('');
    const [selectedCategory, setSelectedCategory] = useState<Profession | null>(null);

    const filteredArtisans = useMemo(() => {
        return artisans.filter((artisan) => {
            const matchesSearch =
                artisan.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
                artisan.metier.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCity = selectedCity ? artisan.ville === selectedCity : true;
            const matchesCategory = selectedCategory ? artisan.metier === selectedCategory : true;
            return matchesSearch && matchesCity && matchesCategory;
        });
    }, [searchQuery, selectedCity, selectedCategory]);

    const toggleCategory = (cat: Profession) => {
        if (selectedCategory === cat) {
            setSelectedCategory(null);
        } else {
            setSelectedCategory(cat);
        }
    };

    return (
        <View style={styles.container}>
            {/* Search & Filter Header */}
            <View style={styles.header}>
                <View style={styles.searchContainer}>
                    <Search color="#666" size={20} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher un artisan, un métier..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <View style={styles.filterRow}>
                    <View style={styles.pickerWrapper}>
                        <MapPin color="#666" size={20} style={styles.mapPinIcon} />
                        <Picker
                            selectedValue={selectedCity}
                            onValueChange={(itemValue) => setSelectedCity(itemValue as City)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Toutes les villes" value="" />
                            {cities.map((city) => (
                                <Picker.Item key={city} label={city} value={city} />
                            ))}
                        </Picker>
                    </View>

                    {selectedCategory && (
                        <TouchableOpacity
                            style={styles.clearCategoryButton}
                            onPress={() => setSelectedCategory(null)}
                        >
                            <Text style={styles.clearCategoryText}>{selectedCategory}</Text>
                            <X color="white" size={14} style={{ marginLeft: 4 }} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Categories Grid */}
            <View style={styles.categoriesSection}>
                <Text style={styles.sectionTitle}>Catégories</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
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

            {/* Results List */}
            <View style={styles.resultsSection}>
                <View style={styles.resultsHeader}>
                    <Text style={styles.resultsTitle}>
                        Résultats ({filteredArtisans.length})
                    </Text>
                </View>

                {filteredArtisans.length > 0 ? (
                    <FlatList
                        data={filteredArtisans}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => <ArtisanCard artisan={item} />}
                        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    <View style={styles.noResults}>
                        <View style={styles.noResultsIconBg}>
                            <Search color="#999" size={40} />
                        </View>
                        <Text style={styles.noResultsText}>Aucun artisan trouvé pour ces critères.</Text>
                        <TouchableOpacity
                            onPress={() => {
                                setSearchQuery('');
                                setSelectedCity('');
                                setSelectedCategory(null);
                            }}
                        >
                            <Text style={styles.clearFiltersText}>Effacer les filtres</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: 'white' },
    header: { marginBottom: 16 },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 24,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        height: 40,
    },
    filterRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
    pickerWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    mapPinIcon: { marginRight: 8 },
    picker: { flex: 1, height: 53 },
    clearCategoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3B82F6',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft: 8,
    },
    clearCategoryText: { color: 'white', fontSize: 14 },

    categoriesSection: { marginVertical: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    categoriesScroll: { flexDirection: 'row' },

    resultsSection: { flex: 1 },
    resultsHeader: { marginBottom: 8 },
    resultsTitle: { fontSize: 18, fontWeight: 'bold' },

    noResults: { alignItems: 'center', marginTop: 40 },
    noResultsIconBg: {
        backgroundColor: '#f0f0f0',
        borderRadius: 40,
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    noResultsText: { color: '#666', fontSize: 16, marginBottom: 8 },
    clearFiltersText: { color: '#3B82F6', fontSize: 14 },
});
