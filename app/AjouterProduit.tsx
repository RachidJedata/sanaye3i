import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Alert,
  ImageBackground,
  Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react-native'; 
import * as ImagePicker from 'expo-image-picker'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function AjouterProduit() {
  const router = useRouter();
  
  // États
  const [fabricant, setFabricant] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nomProduit, setNomProduit] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null); 

  // --- FONCTION 1 : Sélectionner une vraie image ---
  const selectionnerImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission requise", "Vous avez refusé l'accès à vos photos !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, 
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); 
    }
  };

  // --- FONCTION 2 : Sauvegarder pour la page Boutique (MODIFIÉE) ---
  const soumettreProduit = async () => {
    // Validation basique
    if (!nomProduit || !prix || !description || !fabricant || !telephone) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    // Normaliser le nom du produit pour la comparaison (sans majuscules/minuscules)
    const nomProduitNormalise = nomProduit.trim().toLowerCase();

    try {
      // 1. Récupérer les produits existants du stockage
      const produitsExistantsJSON = await AsyncStorage.getItem('boutique_produits');
      let produits = produitsExistantsJSON ? JSON.parse(produitsExistantsJSON) : [];
      
      // 2. Vérification de l'existence
      const produitExistant = produits.find(
        (p: { nomProduit: string; }) => p.nomProduit.trim().toLowerCase() === nomProduitNormalise
      );

      if (produitExistant) {
        // --- MESSAGE SI PRODUIT EXISTE DÉJÀ ---
        Alert.alert(
          "Produit déjà enregistré", 
          `Un produit nommé "${nomProduit}" existe déjà dans votre boutique. Voulez-vous le modifier ou annuler l'ajout ?`,
          [
            { 
              text: "Annuler", 
              style: 'cancel' 
            },
            {
              text: "Modifier l'Existant",
              // Pour simplifier, nous allons juste remplacer l'ancien produit par le nouveau
              onPress: async () => {
                const produitModifie = {
                  ...produitExistant, // Garde l'ID existant
                  fabricant,
                  telephone,
                  nomProduit,
                  prix: parseFloat(prix),
                  description,
                  imageUri, 
                };
                
                // Remplacer l'ancien produit dans la liste
                const nouvelleListe = produits.map((p: { id: string; }) => 
                  p.id === produitExistant.id ? produitModifie : p
                );

                await AsyncStorage.setItem('boutique_produits', JSON.stringify(nouvelleListe));

                Alert.alert("Succès", "Produit mis à jour !", [
                  { 
                    text: "OK", 
                    onPress: () => router.push('/boutique') 
                  }
                ]);
              }
            }
          ]
        );
        return; // Stoppe l'exécution si le produit existe
      }

      // 3. Création et ajout du nouveau produit (si non existant)
      const nouveauProduit = {
        id: Date.now().toString(), // ID unique
        fabricant,
        telephone,
        nomProduit,
        prix: parseFloat(prix),
        description,
        imageUri, 
      };

      produits.push(nouveauProduit);

      // 4. Sauvegarder la nouvelle liste dans le téléphone
      await AsyncStorage.setItem('boutique_produits', JSON.stringify(produits));

      Alert.alert("Succès", "Produit ajouté à la boutique !", [
        { 
          text: "OK", 
          onPress: () => router.push('/boutique') // Redirige vers la page Boutique
        }
      ]);

    } catch (error) {
      Alert.alert("Erreur", "Impossible de sauvegarder le produit.");
      console.error(error);
    }
  };

  return (
    <ImageBackground 
      source={require('../assets/images/123.jpg')} 
      style={styles.backgroundImage} 
      resizeMode="cover" 
    >
      <View style={styles.overlay}> 
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Ajouter un Produit</Text>
          <View style={{ width: 40 }} /> 
        </View>

        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          
          {/* Informations Fabricant */}
          <Text style={styles.sectionTitle}>Informations Fabricant</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom complet du fabricant"
            placeholderTextColor="#666" 
            value={fabricant}
            onChangeText={setFabricant}
          />
          <TextInput
            style={styles.input}
            placeholder="Numéro de téléphone"
            placeholderTextColor="#666"
            keyboardType="phone-pad"
            value={telephone}
            onChangeText={setTelephone}
          />

          {/* Informations Produit */}
          <Text style={styles.sectionTitle}>Détails du Produit</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom du produit"
            placeholderTextColor="#666"
            value={nomProduit}
            onChangeText={setNomProduit}
          />
          <TextInput
            style={styles.input}
            placeholder="Prix (ex: 99.99)"
            placeholderTextColor="#666"
            keyboardType="numeric"
            value={prix}
            onChangeText={setPrix}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Description détaillée du produit..."
            placeholderTextColor="#666"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          {/* Option d'Image */}
          <Text style={styles.sectionTitle}>Image du Produit</Text>
          <TouchableOpacity 
            style={styles.imagePicker} 
            onPress={selectionnerImage}
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <ImageIcon size={30} color="#666" />
            )}
            <Text style={styles.imagePickerText}>
              {imageUri ? "Changer l'image" : "Ajouter une image du produit"}
            </Text>
          </TouchableOpacity>
          
          {/* Bouton de Soumission */}
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={soumettreProduit}
          >
            <Text style={styles.submitButtonText}>Enregistrer le Produit</Text>
          </TouchableOpacity>
          
          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: { 
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
    paddingTop: 50,
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
    color: '#fff', 
  },
  formContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff', 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333', 
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', 
    paddingTop: 12,
  },
  imagePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 10,
    justifyContent: 'center',
    overflow: 'hidden', 
  },
  previewImage: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 10,
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});