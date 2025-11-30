import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { artisans } from '@/constants/data';
import ArtisanCard from '@/components/ArtisanCard';
import DetailScreen from './DetailScreen';
import Home from './Home';
import BoutiqueScreen from './BoutiqueScreen';
import ProfileScreen from './ProfileScreen';

export {
    Home,
    DetailScreen,
    BoutiqueScreen,
    ProfileScreen,
};

const FavoritesScreen: React.FC = () => {
    const { favorites } = useTheme(); 

    const favArtisans = artisans.filter(a => favorites.includes(a.id));

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>❤️ Mes Favoris</Text>

            {favArtisans.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}>Aucun favori pour le moment</Text>
                </View>
            ) : (
                <FlatList
                    data={favArtisans}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <ArtisanCard artisan={item} />}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    extraData={favorites} // ✅ ensures FlatList updates when favorites change
                />
            )}
        </SafeAreaView>
    );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { fontSize: 26, fontWeight: 'bold', marginBottom: 16 },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#666', marginTop: 40, textAlign: 'center' },
});
