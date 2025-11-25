import { MyDarkTheme, MyLightTheme } from '@/theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

interface ThemeContextValue {
    theme: typeof MyDarkTheme;
    isDarkMode: boolean;
    isReady: boolean;
    toggleDarkMode: () => void;

    favorites: number[];
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

const FAVORITES_KEY = '@favorites';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [isReady, setIsReady] = useState(false);

    // Load favorites from AsyncStorage on mount
    useEffect(() => {
        (async () => {
            try {
                const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
                if (jsonValue) setFavorites(JSON.parse(jsonValue));
            } catch (e) {
                console.error('Failed to load favorites', e);
            }
            setIsReady(true);
        })();
    }, []);

    // Save favorites whenever it changes
    useEffect(() => {
        (async () => {
            try {
                await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
            } catch (e) {
                console.error('Failed to save favorites', e);
            }
        })();
    }, [favorites]);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    const addFavorite = (id: number) => setFavorites(prev => (prev.includes(id) ? prev : [...prev, id]));
    const removeFavorite = (id: number) => setFavorites(prev => prev.filter(f => f !== id));
    const toggleFavorite = (id: number) => setFavorites(prev => (prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]));
    const isFavorite = (id: number) => favorites.includes(id);

    const theme = isDarkMode ? MyDarkTheme : MyLightTheme;

    const value = useMemo(() => ({
        isReady,
        theme,
        isDarkMode,
        toggleDarkMode,
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
    }), [theme, isDarkMode, favorites]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
