import { Artisan, City, Profession, RootStackParamList } from '@/types/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type DetailRoute = RouteProp<RootStackParamList, 'ArtisanDetail'>;

export default function ArtisanDetail() {
    const route = useRoute<DetailRoute>();
    const { id } = route.params;

    // Replace this with your API call
    const artisan: Artisan = {
        id,
        nom: "Mechanic",
        metier: Profession.Mechanic,
        ville: City.Agadir,
        quartier: "Quartier",
        telephone: "0601010101",
        description: "Experienced mechanic specializing in car repairs.",
        available247: true,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{artisan.nom}</Text>
            <Text style={styles.job}>{artisan.metier}</Text>

            <View style={styles.block}>
                <Text style={styles.label}>Ville</Text>
                <Text style={styles.value}>{artisan.ville}</Text>
            </View>

            <View style={styles.block}>
                <Text style={styles.label}>Quartier</Text>
                <Text style={styles.value}>{artisan.quartier}</Text>
            </View>

            <View style={styles.block}>
                <Text style={styles.label}>Téléphone</Text>
                <Text style={styles.value}>{artisan.telephone}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 24, flex: 1, backgroundColor: 'white' },
    name: { fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
    job: { fontSize: 18, color: '#2563EB', marginBottom: 24 },
    block: { marginBottom: 16 },
    label: { fontSize: 14, color: '#6B7280' },
    value: { fontSize: 18, fontWeight: '600' },
});
