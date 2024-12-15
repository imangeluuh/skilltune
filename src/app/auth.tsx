import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  EXPO_CLIENT_ID,
  EXPO_ANDROID_CLIENT_ID,
  EXPO_IOS_CLIENT_ID,
  EXPO_WEB_CLIENT_ID,
} from "@env";

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {
  const [user, setUser] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
    androidClientId: EXPO_ANDROID_CLIENT_ID,
    iosClientId: EXPO_IOS_CLIENT_ID,
    webClientId: EXPO_WEB_CLIENT_ID,
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    handleToken();
  }, [response]);

  async function handleToken() {
    getUserInfo(response.authentication.accessToken);
  }

  const getUserInfo = async (token: string) => {
    if (!token) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/userinfo/v2/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const userInfo = await response.json();
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setUser(userInfo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {!user ? (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View>
          <Image src=""></Image>
          <Text>Email: {user.email}</Text>
          <Text>Name: {user.name}</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
