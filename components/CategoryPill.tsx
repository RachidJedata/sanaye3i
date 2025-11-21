import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CategoryPillProps {
    category: string;
    isSelected: boolean;
    onPress: () => void;
    // Optional custom styles
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
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.pill,
                isSelected ? styles.pillSelected : styles.pillUnselected,
                style,
            ]}
            activeOpacity={0.7}
        >
            <Text
                style={[
                    styles.text,
                    isSelected ? styles.textSelected : styles.textUnselected,
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
        borderRadius: 20,            // makes it pill-shaped
        borderWidth: 1,
        marginHorizontal: 4,
        marginVertical: 4,
    },
    pillSelected: {
        backgroundColor: '#2563EB',  // blue-600-ish
        borderColor: '#2563EB',
    },
    pillUnselected: {
        backgroundColor: '#F3F4F6',  // gray-100-ish
        borderColor: '#D1D5DB',      // gray-300-ish
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
    textSelected: {
        color: 'white',
    },
    textUnselected: {
        color: '#374151',             // gray-700-ish
    },
});
