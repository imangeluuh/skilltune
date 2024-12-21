import { View } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { Redirect } from "expo-router";
import { Button, ButtonText } from "@/src/components/ui/button";
import { ChartNoAxesCombined } from "lucide-react-native";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });
  if (error) throw error;
  return data.session;
};

const performOAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });
  if (error) throw error;

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    const { url } = res;
    await createSessionFromUrl(url);
  }
};

export default function Auth() {
  const { session } = useAuth();

  if (session) return <Redirect href="/" />;

  // Handle linking into app from email app.
  const url = Linking.useURL();
  if (url) createSessionFromUrl(url);

  return (
    <View
      style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center" }}
    >
      <VStack space="lg" className="justify-center items-center">
        <ChartNoAxesCombined strokeWidth={3} size={100} />
        <Text size="4xl" className="mb-5 font-bold text-black">
          SkillTune
        </Text>
      </VStack>
      <Button onPress={performOAuth} size="lg" variant="solid" action="primary">
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </View>
  );
}
