// components/ProductCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {LinearGradient } from 'expo-linear-gradient';
import { Star, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { Product } from '@/types/types';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { theme } = useTheme();

  // Fonction pour afficher les étoiles avec dégradé
  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFilled = i < Math.floor(rating);
      stars.push(
        <LinearGradient
          key={i}
          colors={isFilled ? [theme.colors.primary, theme.colors.link] : ['#ccc', '#ccc']}
          style={styles.starGradient}
        >
          <Star size={14} color={isFilled ? '#fff' : '#888'} />
        </LinearGradient>
      );
    }
    return <View style={styles.ratingRow}>{stars}</View>;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.cardBackground]}
        style={styles.card}
      >
        <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
        <View style={styles.infoContainer}>
          <Text style={[styles.category, { color: theme.colors.primary }]}>{product.category}</Text>
          <Text style={[styles.name, { color: theme.colors.text }]} numberOfLines={2}>
            {product.nom}
          </Text>
          {renderRating(product.rating || 0)}
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: theme.colors.text }]}>{product.prix} MAD</Text>
            <LinearGradient
              colors={[theme.colors.link, theme.colors.primary]}
              style={styles.buyButton}
            >
              <Text style={styles.buyButtonText}>Voir</Text>
              <ArrowRight size={14} color="white" style={{ marginLeft: 5 }} />
            </LinearGradient>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    width: 170,
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
  },
  category: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  name: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', marginBottom: 4 },
  starGradient: {
    marginRight: 2,
    borderRadius: 2,
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: 'bold' },
  buyButton: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: { color: 'white', fontWeight: '600', fontSize: 13 },
});
