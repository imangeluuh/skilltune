import { StyleSheet, View } from "react-native";
import React from "react";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Heading } from "@/src/components/ui/heading";
import { Card } from "@/src/components/ui/card";
import { Text } from "@/src/components/ui/text";

const ListHeader = () => {
  return (
    <View>
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
          <AvatarFallbackText>name</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "",
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
            name
          </Heading>
        </VStack>
      </HStack>

      {/* <Heading size="lg" className="ml-3 mt-3">
        Continue reading:
      </Heading>

      <Card size="md" variant="elevated" className="m-3">
        <Heading size="md" className="mb-1">
          Maintenance Forms & Forms
        </Heading>
        <Text size="sm" numberOfLines={3} ellipsizeMode="tail">
          This subject focuses on documentation, including aircraft logbooks,
          work orders, and inspection reports. Students learn the importance of
          accurate records for safety, compliance, and tracking maintenance
          history.
        </Text>
      </Card> */}

      <Heading size="lg" className="ml-3 mt-3">
        Lesson Plan
      </Heading>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({});