import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { User, Settings, Heart, LogOut, Moon, Sun } from 'lucide-react-native';

const ProfileScreen: React.FC = () => {
    const { theme } = useTheme();

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            
            {/* Header Profil */}
            <View style={styles.header}>
                <View style={[styles.avatar, { backgroundColor: theme.colors.link }]}>
                    <User color="#FFFFFF" size={40} />
                </View>
                <Text style={[styles.userName, { color: theme.colors.text }]}>
                    Utilisateur Sanaye3i
                </Text>
                <Text style={[styles.userEmail, { color: theme.colors.placeholder }]}>
                    compte@example.com (Démonstration)
                </Text>
            </View>

            {/* Section Général */}
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Général</Text>
            <View style={[styles.settingsGroup, { backgroundColor: theme.colors.cardBackground, borderColor: theme.colors.border }]}>
                
                {/* Option Favoris (Navigation) */}
                <TouchableOpacity 
                    style={styles.settingItem}
                    onPress={() => alert("Afficher la liste des artisans favoris")}
                >
                    <Heart color={theme.colors.placeholder} size={24} />
                    <Text style={[styles.settingText, { color: theme.colors.text }]}>Mes Artisans Favoris</Text>
                </TouchableOpacity>

                {/* Option Paramètres (Placeholder) */}
                <TouchableOpacity 
                    style={[styles.settingItem, styles.borderBottom]}
                    onPress={() => alert("Afficher les paramètres de l'application")}
                >
                    <Settings color={theme.colors.placeholder} size={24} />
                    <Text style={[styles.settingText, { color: theme.colors.text }]}>Paramètres</Text>
                </TouchableOpacity>
                
                {/* Option Mode Sombre/Clair */}
                <View style={[styles.settingItem, styles.switchContainer]}>
                    {theme.dark ? <Moon color={theme.colors.placeholder} size={24} /> : <Sun color={theme.colors.placeholder} size={24} />}
                    <Text style={[styles.settingText, { color: theme.colors.text }]}>
                        Mode {theme.dark ? 'Sombre' : 'Clair'}
                    </Text>
                    <Switch
                        trackColor={{ false: theme.colors.border, true: theme.colors.link }}
                        thumbColor={theme.colors.cardBackground}
                        onValueChange={() => alert("Theme toggle not yet implemented")}
                        value={theme.dark}
                    />
                </View>
            </View>
            
            {/* Déconnexion */}
            <TouchableOpacity 
                style={[styles.logoutButton, { backgroundColor: theme.colors.notification }]}
                onPress={() => alert("Déconnexion simulée")}
            >
                <LogOut color="#FFFFFF" size={20} />
                <Text style={styles.logoutText}>Déconnexion</Text>
            </TouchableOpacity>

        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userEmail: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
    },
    settingsGroup: {
        borderRadius: 12,
        marginBottom: 25,
        borderWidth: 1,
        overflow: 'hidden', // Pour que les bords ronds coupent le dernier élément
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        minHeight: 55,
    },
    borderBottom: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#E0E0E0', // Une couleur neutre pour la ligne de séparation
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
    },
    switchContainer: {
        justifyContent: 'space-between',
        paddingRight: 15,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 12,
        marginTop: 20,
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});