import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const MyLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        headerBackground: "#ffffff",
        headerText: "#111111",
        logoTint: "#000000",
        background: "#ffffff",
        text: "#111111",
        border: "#cccccc",
        placeholder: "#666666",
        cardBackground: "#f8f8f8",
        pillBackground: "#eaeaea",
        pillSelected: "#3B82F6",
        noResultsIconBg: "#f0f0f0",
        link: "#3B82F6",
        pillText: "#FFFFFF",
        pillUnselected: "#F3F4F6",
        pillBorder: "#D1D5DB",
        pillTextUnselected: "#374151",

        textSecondary: "#6B7280",
        iconSecondary: "#6B7280",
        jobBadgeBackground: "#DBEAFE",
        jobBadgeText: "#1E3A8A",
        callButtonBg: "#DCFCE7",
        callButtonText: "#064E3B",
        callButtonIcon: "#064E3B",

        // Badges
        badgeAvailableBackground: "#34D399", // green-400-ish
        badgeAvailableText: "#FFFFFF",        // white text simple

        // Buttons / Actions
        buttonPrimary: "#2563EB",             // blue-600
        buttonText: "#FFFFFF",                // white text on primary button

        // Misc / Icons
        iconPrimary: "#2563EB",                // maybe same as link or accent
    },
};

export const MyDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        headerBackground: "#1a1a1a",
        headerText: "#f5f5f5",
        logoTint: "#000000",
        background: "#121212",
        text: "#808080",
        border: "#333333",
        placeholder: "#999999",
        cardBackground: "#1e1e1e",
        pillBackground: "#2a2a2a",
        pillSelected: "#3B82F6",
        noResultsIconBg: "#2a2a2a",
        link: "#60a5fa",
        pillText: "#ffffffff",
        pillUnselected: "#626264ff",
        pillBorder: "#3a3b3cff",
        pillTextUnselected: "#aaacaeff",


        textSecondary: "#6B7280",
        iconSecondary: "#6B7280",
        jobBadgeBackground: "#DBEAFE",
        jobBadgeText: "#1E3A8A",
        callButtonBg: "#DCFCE7",
        callButtonText: "#064E3B",
        callButtonIcon: "#38e2b5ff",

        // Badges
        badgeAvailableBackground: "#10B981",       // green-500-ish
        badgeAvailableText: "#FFFFFF",              // white text

        // Buttons / Actions
        buttonPrimary: "#3B82F6",                   // brighter blue for button
        buttonText: "#FFFFFF",                       // white text


        // Misc / Icons
        iconPrimary: "#60A5FA",                       // same accent
    },
};