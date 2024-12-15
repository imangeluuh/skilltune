import {
  FlatList,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LESSONS } from "@/assets/lessons";
import { LessonList } from "../components/LessonList";
import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { useAuth } from "../providers/AuthProvider";
import { Redirect } from "expo-router";
import { View } from "react-native";

const Home = () => {
  const { session, user, mounting } = useAuth();

  if (!session) return <Redirect href="/auth" />;

  if (mounting) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <ScrollView>
        <HStack
          space="lg"
          style={{
            padding: 10,
            alignItems: "center",
            justifyContent: "center",
            margin: 20,
          }}
        >
          <Avatar size="xl">
            <AvatarFallbackText>{user?.name}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user?.avatar_url,
              }}
            />
          </Avatar>
          <VStack
            space="sm"
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Heading size="2xl" className="ml-3">
              Hi,
            </Heading>
            <Heading size="2xl" className="ml-3">
              {user?.name}
            </Heading>
          </VStack>
        </HStack>

        <Heading size="lg" className="ml-3 mt-3">
          Continue reading:
        </Heading>
        <Card size="md" variant="elevated" className="m-5">
          <Heading size="md" className="mb-1">
            Web Development Basics
          </Heading>
          <Text size="sm" numberOfLines={3} ellipsizeMode="tail">
            Introduction to front-end and back-end web development
          </Text>
        </Card>

        <FlatList
          data={LESSONS}
          renderItem={({ item }) => <LessonList lesson={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          ListHeaderComponent={<Heading size="lg">Lessons</Heading>}
          style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        ></FlatList>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
