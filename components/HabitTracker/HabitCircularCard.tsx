import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface HabitCircularCardProps {
  imageUri: string | null;
  size: number;
}

const HabitCircularCard: React.FC<HabitCircularCardProps> = ({ imageUri, size }) => {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: size / 2 }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  placeholder: {
    backgroundColor: '#ccc',
  },
});

export default HabitCircularCard;
