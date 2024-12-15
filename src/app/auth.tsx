import { View } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { Redirect } from "expo-router";
import { Button, ButtonText } from "@/src/components/ui/button";

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
  console.log("res", res);

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button onPress={performOAuth} size="lg" variant="solid" action="primary">
        <ButtonText>Sign in with Google</ButtonText>
      </Button>
    </View>
  );
}
