import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // Utilisez le hook useRouter
import { ArrowLeft } from 'lucide-react-native'; // Assurez-vous d'avoir lucide-react-native installé

export default function Boutique() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
           <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Ma Boutique</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Bienvenue dans la boutique !</Text>
        <Text style={styles.subText}>C'est ici que vous afficherez vos produits.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, // Ajustez selon votre Safe Area
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  subText: {
    color: 'gray',
  },
});