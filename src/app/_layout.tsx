import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/src/components/ui/gluestack-ui-provider";
import "@/global.css";
import { AuthProvider } from "../providers/AuthProvider";
import QueryProvider from "../providers/QueryProvider";

export default function RootLayout() {
  return (
    <GluestackUIProvider>
      <AuthProvider>
        <QueryProvider>
          <Stack>
            <Stack.Screen
              name="(home)"
              options={{ headerShown: false, title: "SkillTune" }}
            />
            <Stack.Screen name="lessons" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </QueryProvider>
      </AuthProvider>
    </GluestackUIProvider>
  );
}
