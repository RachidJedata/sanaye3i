// App.tsx

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Nouveau !
import { Home, List, ShoppingBag } from 'lucide-react-native'; // Icônes de tabulation
import { ThemeProvider, useTheme } from './context/ThemeContext'; 

// Importation des écrans
import HomeScreen from './screens/Home';
import DetailScreen from './screens/DetailScreen';
import ProductsScreen from './app/ProductsScreen'; // Nouveau !

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); // Nouveau !

// 1. Stack Navigator pour l'Annuaire (Accueil & Détail Artisan)
const HomeStackNavigator = () => {
    const { theme } = useTheme();
    return (
        <HomeStack.Navigator
            initialRouteName="AnnuaireHome"
            screenOptions={{
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTintColor: theme.colors.cardBackground, 
                headerTitleStyle: { fontWeight: 'bold' },
                contentStyle: { backgroundColor: theme.colors.background }
            }}
        >
            <HomeStack.Screen 
                name="AnnuaireHome" 
                component={HomeScreen} 
                options={{ title: 'Sanaye3i - Annuaire Artisan' }}
            />
            <HomeStack.Screen 
                name="FicheArtisan" 
                component={DetailScreen} 
                options={{ title: 'Fiche Artisan' }} 
            />
        </HomeStack.Navigator>
    );
};

// 2. Tab Navigator Principal
const MainNavigator = () => {
    const { theme } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({  color, size }) => {
                    let IconComponent = Home;
                    if (route.name === 'Annuaire') {
                        IconComponent = List;
                    } else if (route.name === 'Boutique') {
                        IconComponent = ShoppingBag;
                    }

                    return <IconComponent color={color} size={size} />;
                },
                tabBarActiveTintColor: theme.colors.link,
                tabBarInactiveTintColor: theme.colors.placeholder,
                tabBarStyle: { 
                    backgroundColor: theme.colors.cardBackground,
                    borderTopColor: theme.colors.border,
                },
                headerShown: false, // On utilise les headers du Stack Navigator
            })}
        >
            <Tab.Screen 
                name="Annuaire" 
                component={HomeStackNavigator} 
                options={{ title: "Services" }}
            />
            <Tab.Screen 
                name="Products" 
                component={ProductsScreen} 
                options={{ 
                    title: "Produits",
                    // Afficher l'entête ici car ProductsScreen est un écran unique
                    headerShown: true,
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTintColor: theme.colors.cardBackground, 
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Tab.Navigator>
    );
};


export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <MainNavigator />
                <StatusBar style="auto" /> 
            </NavigationContainer>
        </ThemeProvider>
    );
}