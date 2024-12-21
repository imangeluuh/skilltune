import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function HomeLayout() {
  const { session, user, mounting } = useAuth();

  if (mounting) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) return <Redirect href="/auth" />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
