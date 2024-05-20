import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

type SquareCardProps = {
  imageUri: string;
  size: number;
  text: string;
};

const styles = (size: number) =>
  StyleSheet.create({
    card: {
      width: size,
      height: size,
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    text: {
      color: 'white',
      textAlign: 'center',
    },
  });

export default function SquareCard(props: SquareCardProps) {
  return (
    <View style={styles(props.size).card}>
      <Image source={{ uri: props.imageUri }} style={styles(props.size).image} />
      <Text style={styles(props.size).text}>{props.text}</Text>
    </View>
  );
}
