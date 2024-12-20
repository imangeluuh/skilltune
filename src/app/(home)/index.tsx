import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LessonListItem } from "../../components/LessonListItem";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { getLessons } from "../../api/api";
import ListHeader from "@/src/components/ListHeader";
import { Text } from "@/src/components/ui/text";

const Home = () => {
  const { data, error, isLoading } = getLessons();

  if (isLoading) return <ActivityIndicator size="large" />;

  if (error || !data)
    return <Text>Error {error?.message || "An error occured"}</Text>;

  return (
    <SafeAreaView edges={["top", "bottom"]} style={{ flex: 1 }}>
      <FlatList
        data={data.lessons}
        renderItem={({ item }) => <LessonListItem lesson={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        ListHeaderComponent={ListHeader}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
      ></FlatList>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
