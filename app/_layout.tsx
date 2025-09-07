import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from "react-native-paper";

import "../global.css";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#AB8Bff",
    secondary: "#033b4a",
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </PaperProvider>
  );
}
