import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground,
  FlatList,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowLeft, PlusCircle, Trash2, ShoppingBag, User, Phone } from 'lucide-react-native'; 

// Type pour les produits
type Produit = {
  id: string;
  nomProduit: string;
  prix: number;
  description: string;
  fabricant: string;
  telephone: string; 
  imageUri: string | null;
};

export default function Boutique() {
  const router = useRouter();
  const [produits, setProduits] = useState<Produit[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 1. CHARGEMENT DES DONNÉES ---
  const chargerProduits = async () => {
    try {
      setLoading(true);
      const storedProducts = await AsyncStorage.getItem('boutique_produits');
      if (storedProducts) {
        setProduits(JSON.parse(storedProducts));
      } else {
        setProduits([]); 
      }
    } catch (error) {
      console.error("Erreur de chargement", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      chargerProduits();
    }, [])
  );

  // --- 2. SUPPRESSION D'UN PRODUIT ---
 const supprimerProduit = (id: string) => {
  Alert.alert(
    "Supprimer",
    "Retirer cet article de la boutique ?",
    [
      { text: "Annuler", style: "cancel" },
      { 
        text: "Supprimer", 
        style: "destructive",
        onPress: async () => {

          // 1. Supprimer dans l’état
          const nouvelleListe = produits.filter((p) => p.id !== id);
          setProduits(nouvelleListe);

          // 2. Sauvegarder dans AsyncStorage
          try {
            await AsyncStorage.setItem(
              "boutique_produits",
              JSON.stringify(nouvelleListe)
            );
          } catch (error) {
            console.log("Erreur sauvegarde suppression :", error);
          }
        }
      }
    ]
  );
};

console.log("Produits chargés :", produits);


  // --- 3. NAVIGATION ---
  const allerVersAjoutProduit = () => {
    router.push('/AjouterProduit'); 
  };

  // --- 4. VISUEL D'UNE CARTE PRODUIT (MISE À JOUR) ---
  const renderItem = ({ item }: { item: Produit }) => (
    <View style={styles.card}>
      {/* SECTION IMAGE */}
      <View style={styles.imageContainer}>
        {item.imageUri ? (
          <Image source={{ uri: item.imageUri }} style={styles.productImage} resizeMode="cover" />
        ) : (
          <View style={styles.placeholderImage}>
            <ShoppingBag size={30} color="#ccc" />
          </View>
        )}
        <TouchableOpacity style={styles.deleteButton} onPress={() => supprimerProduit(item.id)}>
          <Trash2 size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* SECTION CONTENU DU PRODUIT */}
      <View style={styles.cardContent}>
        {/* Nom et Prix du Produit */}
        <View style={styles.titlePriceContainer}>
            <Text style={styles.productName} numberOfLines={1}>{item.nomProduit}</Text>
            <Text style={styles.productPrice}>{item.prix} DH</Text>
        </View>

        {/* Description Simple (Retrait de numberOfLines) */}
        <Text style={styles.descriptionText}>
            {item.description}
        </Text>

        {/* Informations Fabricant */}
        <View style={styles.fabricantInfo}>
            <View style={styles.infoRow}>
                <User size={12} color="#666" style={{ marginRight: 5 }} />
                <Text style={styles.fabricantText} numberOfLines={1}>
                    **{item.fabricant}**
                </Text>
            </View>
            <View style={styles.infoRow}>
                <Phone size={12} color="#666" style={{ marginRight: 5 }} />
                <Text style={styles.fabricantText} numberOfLines={1}>
                    {item.telephone}
                </Text>
            </View>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../assets/images/background_poterie.jpg')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        
        {/* --- HEADER --- */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" /> 
          </TouchableOpacity>
          
          <Text style={styles.title}>L7aNoT</Text>
          
          <TouchableOpacity onPress={allerVersAjoutProduit} style={styles.addButton}>
            <PlusCircle size={30} color="#fff" /> 
          </TouchableOpacity>
        </View>

        {/* --- LISTE DES PRODUITS --- */}
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={produits}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            numColumns={2} 
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.text}>Bienvenue dans la boutique !</Text>
                <Text style={styles.subText}>C'est ici que vous afficherez vos produits.</Text>
                <Text style={styles.subTextSmall}>(Appuyez sur + pour commencer)</Text>
              </View>
            }
          />
        )}

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Styles généraux inchangés
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)', paddingTop: 50, paddingHorizontal: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, justifyContent: 'space-between' },
  backButton: { padding: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
  addButton: { padding: 8 },
  listContainer: { paddingBottom: 50 },
  columnWrapper: { justifyContent: 'space-between' },

  // --- Styles de la Carte Produit (Ajustés) ---
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
    width: '48%', 
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    // Augmente la hauteur pour plus de texte, mais reste fixée pour la grille
    height: 360, 
  },
  imageContainer: {
    height: 120,
    width: '100%',
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    padding: 6,
    borderRadius: 20,
  },
  cardContent: {
    padding: 8, 
    flex: 1, 
  },
  
  // Nouveaux styles pour les informations
  titlePriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  productName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#28a745', 
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    // La suppression de numberOfLines ici permet plus de texte
  },
  
  fabricantInfo: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 5,
    marginTop: 'auto', 
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  fabricantText: {
    fontSize: 11,
    color: '#666',
  },

  // Style "Vide" (Bienvenue) inchangé
  emptyContainer: { marginTop: 100, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#fff', textAlign: 'center' },
  subText: { fontSize: 16, color: '#f0f0f0', textAlign: 'center', marginBottom: 5 },
  subTextSmall: { fontSize: 14, color: '#ccc', fontStyle: 'italic' }
});