// screens/ProductsScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { products } from '@/constants/data';
import ProductCard from '@/components/ProductCard';
import { HomeProps } from '@/types/navigation'; // Vous devrez ajouter ce type

const ProductsScreen: React.FC<HomeProps> = ({ navigation }) => {
    const { theme } = useTheme();

    const renderProduct = ({ item }) => (
        <ProductCard 
            product={item} 
            onPress={() => {
                // TODO: Naviguer vers une page de détail de Produit (à créer)
                // Pour l'instant, on navigue vers l'écran d'accueil
                console.log("Voir détail produit:", item.nom);
            }} 
        />
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={[styles.header, { backgroundColor: theme.colors.cardBackground }]}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                    Boutique des Artisans
                </Text>
                <Text style={[styles.subtitle, { color: theme.colors.placeholder }]}>
                    Découvrez les créations et produits uniques de nos Sanaye3i locaux.
                </Text>
            </View>
            
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // Affichage en grille
                contentContainerStyle={styles.listContent}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={[styles.emptyText, { color: theme.colors.placeholder }]}>
                            Aucun produit disponible pour le moment.
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 16,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
    },
    listContent: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    columnWrapper: {
        justifyContent: 'space-around',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50,
    },
    emptyText: {
        fontSize: 16,
    }
});

export default ProductsScreen;