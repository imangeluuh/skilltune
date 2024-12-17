import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { LESSONS } from "@/assets/lessons";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { getLessons } from "@/src/api/api";

const Lesson = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, error, isLoading } = getLessons();

  // will change pa to only get the lesson with the id
  if (isLoading) return <ActivityIndicator size="large" />;

  if (error || !data)
    return <Text>Error {error?.message || "An error occured"}</Text>;

  const lesson = data.lessons.find((lesson) => lesson.id == parseInt(id));

  if (!lesson) return <Redirect href="/404" />;

  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{ title: lesson.title, headerShown: true }} /> */}
      <Heading size="2xl" className="mb-5">
        {lesson.title}
      </Heading>
      <Text style={styles.content} size="lg">
        {lesson.description}
      </Text>
    </View>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    borderLeftColor: "black",
    borderLeftWidth: 3,
    paddingLeft: 10,
  },
});
