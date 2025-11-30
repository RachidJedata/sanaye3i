// screens/BoutiqueScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Info } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import { products } from '@/constants/data';

const BoutiqueScreen: React.FC = () => {
  const { theme, isReady } = useTheme();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Marché Artisanal</Text>
      <View style={[styles.infoBanner, { backgroundColor: theme.colors.cardBackground }]}>
        <Info color={theme.colors.link} size={20} />
        <Text style={[styles.infoText, { color: theme.colors.text }]}>
          Cette section est un exemple d'intégration E-commerce.
        </Text>
      </View>
      <Text style={[styles.sectionSubtitle, { color: theme.colors.text }]}>
        Produits Artisanaux Populaires
      </Text>
    </View>
  );

  if (!isReady) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.link} />
      </View>
    );
  }

  return (
    <FlatList
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ProductCard product={item} onPress={() => alert(item.nom)} />}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default BoutiqueScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { paddingHorizontal: 16, paddingBottom: 20, paddingTop: 10 },
  headerContainer: { marginBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  infoBanner: { flexDirection: 'row', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  infoText: { marginLeft: 8, flexShrink: 1, fontSize: 14 },
  sectionSubtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 15 },
});
