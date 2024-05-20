import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { SvgProps } from 'react-native-svg';

type SquareCardProps = {
  imageUri?: string;
  SvgComponent?: React.FC<SvgProps>;
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
  const { imageUri, SvgComponent, size, text } = props;

  return (
    <View style={styles(size).card}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles(size).image} />
      ) : SvgComponent ? (
        <SvgComponent width="100%" height="100%" />
      ) : null}
      <Text style={styles(size).text}>{text}</Text>
    </View>
  );
}
