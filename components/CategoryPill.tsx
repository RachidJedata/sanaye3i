import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

interface CategoryPillProps {
    category: string;
    isSelected: boolean;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
    category,
    isSelected,
    onPress,
    style,
    textStyle,
}) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.pill,
                {
                    backgroundColor: isSelected
                        ? theme.colors.pillSelected
                        : theme.colors.pillUnselected,
                    borderColor: isSelected
                        ? theme.colors.pillSelected
                        : theme.colors.pillBorder,
                },
                style,
            ]}
            activeOpacity={0.7}
        >
            <Text
                style={[
                    styles.text,
                    {
                        color: isSelected ? theme.colors.pillText : theme.colors.pillTextUnselected,
                    },
                    textStyle,
                ]}
            >
                {category}
            </Text>
        </TouchableOpacity>
    );
};

export default CategoryPill;

const styles = StyleSheet.create({
    pill: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 4,
        marginVertical: 4,
    },
    text: {
        fontSize: 14,
        fontWeight: "500",
    },
});
