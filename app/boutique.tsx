import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground // <-- Importez ImageBackground ici
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, PlusCircle } from 'lucide-react-native';

export default function Boutique() {
  const router = useRouter();

  const allerVersAjoutProduit = () => {
    // Navigue vers la nouvelle route/écran.
    router.push({ pathname: '/AjouterProduit' });
  };

  return (
    // Remplacer <View style={styles.container}> par ImageBackground
    <ImageBackground 
      source={require('../assets/images/background_poterie.jpg')} // Chemin vers votre image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      {/* Ajout d'une surcouche (overlay) pour améliorer la lisibilité du texte */}
      <View style={styles.overlay}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            {/* Changement de couleur pour contraster avec le fond */}
            <ArrowLeft size={24} color="#fff" /> 
          </TouchableOpacity>
          <Text style={styles.title}>Ma Boutique</Text>
          
          <TouchableOpacity 
            onPress={allerVersAjoutProduit} 
            style={styles.addButton}
          >
            {/* Changement de couleur pour contraster avec le fond */}
            <PlusCircle size={30} color="#fff" /> 
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.text}>Bienvenue dans la boutique !</Text>
          <Text style={styles.subText}>C'est ici que vous afficherez vos produits.</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Style pour l'ImageBackground
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  // Nouveau style pour la surcouche (simule l'ancien container, mais est transparent)
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Surcouche noire semi-transparente (ajustez 0.4 si besoin)
    paddingTop: 50, // Ajustez selon votre Safe Area
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Texte en blanc pour un meilleur contraste
    flex: 1, 
    textAlign: 'center', 
    marginLeft: -46, 
  },
  addButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#fff', // Texte en blanc
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Ajout d'un léger fond pour le texte
    padding: 5,
    borderRadius: 5,
  },
  subText: {
    color: '#f0f0f0', // Gris clair
  },
});