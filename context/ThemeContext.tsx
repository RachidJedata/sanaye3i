import { MyDarkTheme, MyLightTheme } from '@/theme/theme';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

// Define the shape of your context value
interface ThemeContextValue {
    // Theme (you can expand for light/dark or color palette)
    theme: typeof MyDarkTheme;
    isDarkMode: boolean;
    toggleDarkMode: () => void;

    // Favorites logic
    favorites: number[]; // assuming artisan.id is number
    addFavorite: (id: number) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

// Create the context with default values
const ThemeContext = createContext<ThemeContextValue>({
    theme: MyLightTheme,
    isDarkMode: false,
    toggleDarkMode: () => { },
    favorites: [],
    addFavorite: () => { },
    removeFavorite: () => { },
    isFavorite: () => false,
});

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // Theme state
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
    };

    // Favorites state
    const [favorites, setFavorites] = useState<number[]>([]);

    const addFavorite = (id: number) => {
        setFavorites((current) => {
            if (!current.includes(id)) {
                return [...current, id];
            }
            return current;
        });
    };

    const removeFavorite = (id: number) => {
        setFavorites((current) => current.filter((fav) => fav !== id));
    };

    const isFavorite = (id: number) => {
        return favorites.includes(id);
    };

    const theme = isDarkMode ? MyDarkTheme : MyLightTheme;

    // Memoize value so context doesn’t cause unnecessary rerenders
    const value = useMemo<ThemeContextValue>(
        () => ({
            theme,
            isDarkMode,
            toggleDarkMode,
            favorites,
            addFavorite,
            removeFavorite,
            isFavorite,
        }),
        [isDarkMode, favorites]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use in your components
export const useTheme = () => {
    return useContext(ThemeContext);
};
