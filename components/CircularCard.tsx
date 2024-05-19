import React from "react";
import { View, Image, StyleSheet } from "react-native";

// TEST
type CircularCardProps = {
  imageUri: string;
  size: number;
};

const styles = (size: number) =>
  StyleSheet.create({
    card: {
      overflow: "hidden",
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    image: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
      borderRadius: size / 2,
    },
  });

export default function CircularCard(props: CircularCardProps) {
  return (
    <View style={styles(props.size).card}>
      <Image
        source={{ uri: props.imageUri }}
        style={styles(props.size).image}
      />
    </View>
  );
}
