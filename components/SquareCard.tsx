import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';

type SquareCardProps = {
  imageUri?: string;
  SvgComponent?: React.FC<SvgProps>;
  size: number;
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
  });

export default function SquareCard(props: SquareCardProps) {
  const { imageUri, SvgComponent, size } = props;

  return (
    <View style={styles(size).card}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles(size).image} />
      ) : SvgComponent ? (
        <SvgComponent width="100%" height="100%" />
      ) : null}
    </View>
  );
}
