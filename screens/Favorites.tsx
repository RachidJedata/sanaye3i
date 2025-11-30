import { artisans } from '@/constants/data';
import { useTheme } from '@/context/ThemeContext';
import { Heart } from 'lucide-react-native'; // use the React Native version of Lucide :contentReference[oaicite:0]{index=0}  
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ArtisanCard from '../components/ArtisanCard'; // make sure this is a React Native component  

const Favorites: React.FC = () => {
    const { favorites } = useTheme();

    const favArtisans = artisans.filter(a => favorites.includes(a.id));

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconWrapper}>
                    <Heart color="#DC2626" size={24} />
                </View>
                <Text style={styles.title}>Mes Favoris</Text>
            </View>

            {favArtisans.length > 0 ? (
                <FlatList
                    data={favArtisans}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <ArtisanCard artisan={item} />}
                    ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyState}>
                    <View style={styles.emptyIconBg}>
                        <Heart color="#999" size={48} />
                    </View>
                    <Text style={styles.emptyTitle}>Aucun favori pour le moment</Text>
                    <Text style={styles.emptyText}>
                        Appuyez sur le cœur sur la fiche dun artisan pour lajouter à votre liste.
                    </Text>
                </View>
            )}
        </View>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: 'white' },
    header: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    iconWrapper: {
        backgroundColor: '#FEE2E2', // red-100 in Tailwind-ish
        padding: 8,
        borderRadius: 999, // full circle
        marginRight: 12,
    },
    title: { fontSize: 24, fontWeight: 'bold', color: '#111' },

    listContainer: { paddingBottom: 20 },

    emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 },
    emptyIconBg: {
        backgroundColor: '#F3F4F6', // gray-100-ish
        borderRadius: 60,
        width: 96,
        height: 96,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    emptyTitle: { fontSize: 18, fontWeight: '500', color: '#111', marginBottom: 8, textAlign: 'center' },
    emptyText: { fontSize: 14, color: '#6B7280', textAlign: 'center' }, // gray-500-ish
});
