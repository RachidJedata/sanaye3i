import { Stack } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <View style={styles.header}>
            <Image
              source={require('../assets/images/icon.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Sanaye3i</Text>
          </View>
        ),
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "#fff", // header background
        },
        headerShadowVisible: false, // remove bottom shadow
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },
});
