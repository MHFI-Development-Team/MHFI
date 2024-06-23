import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type ContentCardProps = {
  imageUri: string;
  size: number;
};

const radiusSize =10;

const styles = () =>
  StyleSheet.create({
    card: {
      width: 300,
      height: 180,
      borderRadius: radiusSize,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: radiusSize,
    },
  });

export default function ContentCard(props: ContentCardProps) {
  return (
    <View style={styles().card}>
      <Image source={{ uri: props.imageUri }} style={styles().image} />
    </View>
  );
}
