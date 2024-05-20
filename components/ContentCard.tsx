import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

type ContentCardProps = {
  imageUri: string;
  size: number;
  text: string;
};

const styles = (size: number) =>
  StyleSheet.create({
    card: {
      width: size,
      height: size,
      borderRadius: size / 3,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: size / 3,
    },
    text: {
      color: 'white',
      textAlign: 'center',
    },
  });

export default function ContentCard(props: ContentCardProps) {
  return (
    <View style={styles(props.size).card}>
      <Image source={{ uri: props.imageUri }} style={styles(props.size).image} />
      <Text style={styles(props.size).text}>{props.text}</Text>
    </View>
  );
}
