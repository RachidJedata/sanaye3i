import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { artisans } from '@/constants/data';
import ArtisanCard from '@/components/ArtisanCard';

const FavoritesScreen: React.FC = () => {
    const { favorites } = useTheme();

    const favArtisans = artisans.filter(a => favorites.includes(a.id));

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>❤️ Mes Favoris</Text>

            {favArtisans.length === 0 ? (
                <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
            ) : (
                <FlatList
                    data={favArtisans}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <ArtisanCard artisan={item} />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </SafeAreaView>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
    emptyText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 40 },
});
