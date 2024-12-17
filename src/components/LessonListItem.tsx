import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Lesson } from "@/assets/types/lesson";
import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { Link } from "expo-router";
import { Tables } from "../types/database.types";

export const LessonListItem = ({ lesson }: { lesson: Tables<"lessons"> }) => {
  return (
    <Link asChild href={`/lessons/${lesson.id}`}>
      <Pressable>
        <View style={styles.cardContainer}>
          <Card size="md" variant="elevated" className="m-3">
            <Heading size="md" className="mb-1">
              {lesson.title}
            </Heading>
            <Text size="sm" numberOfLines={3} ellipsizeMode="tail">
              {lesson.description}
            </Text>
          </Card>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
  },
});
