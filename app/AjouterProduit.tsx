import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Alert,
  ImageBackground // Importé pour l'arrière-plan
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react-native'; 

// Correction de l'erreur de type en spécifiant explicitement les types 
// pour useState : <string | null>
export default function AjouterProduit() {
  const router = useRouter();
  
  // États pour stocker les valeurs du formulaire
  const [fabricant, setFabricant] = useState('');
  const [telephone, setTelephone] = useState('');
  const [nomProduit, setNomProduit] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  
  // CORRECTION : Spécification du type pour accepter string ou null
  const [imageUri, setImageUri] = useState<string | null>(null); 

  // Fonction simulée pour sélectionner une image
  const selectionnerImage = () => {
    // Note : Intégrer ici la librairie expo-image-picker pour la sélection réelle.
    
    Alert.alert(
      "Sélection d'Image",
      "La logique de sélection d'image doit être ajoutée ici (ex: avec expo-image-picker).",
      [
        {
          text: "Simuler la sélection",
          // La chaîne est maintenant acceptée grâce à la correction de type ci-dessus
          onPress: () => setImageUri('file://path/to/selected/image.jpg')
        }
      ]
    );
  };

  // Fonction de soumission du formulaire
  const soumettreProduit = () => {
    if (!nomProduit || !prix || !description || !fabricant || !telephone) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const nouveauProduit = {
      fabricant,
      telephone,
      nomProduit,
      prix: parseFloat(prix),
      description,
      imageUri,
    };

    console.log("Produit à ajouter :", nouveauProduit);
    Alert.alert("Succès", `Le produit '${nomProduit}' a été soumis ! (Données visibles dans la console)`);
    // Optionnel: router.back();
  };

  return (
    <ImageBackground 
      source={require('../assets/images/123.jpg')} // Chemin de l'image de fond
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
            placeholder="Numéro de téléphone du fabricant"
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
            <ImageIcon size={30} color={imageUri ? "#28a745" : "#666"} />
            <Text style={styles.imagePickerText}>
              {imageUri ? "Image sélectionnée (Modifier)" : "Ajouter une image du produit"}
            </Text>
          </TouchableOpacity>
          {imageUri && <Text style={styles.imageStatus}>Image prête pour l'envoi.</Text>}
          
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginBottom: 10,
    justifyContent: 'center',
  },
  imagePickerText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  imageStatus: {
    textAlign: 'center',
    color: '#90ee90', 
    marginBottom: 20,
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