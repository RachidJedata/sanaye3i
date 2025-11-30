import React, { useRef } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    ViewStyle,
    TextStyle,
} from "react-native";
import { useTheme } from "@/context/ThemeContext";

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

    // Animation scale
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const animatePress = () => {
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 0.92,
                speed: 30,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                speed: 20,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePress = () => {
        animatePress();
        onPress();
    };

    return (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={handlePress}
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
            >
                <Text
                    style={[
                        styles.text,
                        {
                            color: isSelected
                                ? theme.colors.pillText
                                : theme.colors.pillTextUnselected,
                        },
                        textStyle,
                    ]}
                >
                    {category}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CategoryPill;

const styles = StyleSheet.create({
    pill: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginHorizontal: 6,
        marginVertical: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    text: {
        fontSize: 14,
        fontWeight: "600",
    },
});
