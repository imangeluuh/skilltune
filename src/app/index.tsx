import { FlatList, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
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

const Home = () => {
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
            <AvatarFallbackText>Jane Doe</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
          </Avatar>
          <VStack
            space="sm"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Heading size="2xl" className="ml-3">
              Hi,
            </Heading>
            <Heading size="2xl" className="ml-3">
              Jane Doe
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
