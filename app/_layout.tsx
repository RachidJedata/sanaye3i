import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { MyDarkTheme, MyLightTheme } from "@/theme/theme";
import { Stack } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function HeaderTitle() {
  const { isDarkMode, theme, toggleDarkMode } = useTheme();

  return (
    <View style={styles.headerRow}>
      {/* Left Section: Logo + Title */}
      <View style={styles.leftSection}>
        <Image
          source={require("../assets/images/icon.png")}
          style={[styles.logo, { tintColor: theme.colors.logoTint }]}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: theme.colors.headerText }]}>
          Sanaye3i
        </Text>
      </View>

      {/* Right Section: Toggle Button */}
      <TouchableOpacity onPress={toggleDarkMode} style={styles.toggleBtn}>
        <Text style={{ color: theme.colors.headerText, fontSize: 20 }}>
          {!isDarkMode ? "🌙" : "☀️"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          header: () => <CustomHeader />,
        }}
      />
    </ThemeProvider>
  );
}

function CustomHeader() {

  const { theme } = useTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ backgroundColor: theme.colors.headerBackground }}
    >
      <HeaderTitle />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Perfect alignment
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 32,
    height: 32,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  toggleBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
