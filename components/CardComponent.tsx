import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';

interface CardComponentProps {
  image: string;
  title: string;
  description: string;
  onPress: () => void;
}

const CardComponent: React.FC<CardComponentProps> = ({ image, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardWrapper}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.readMoreText}>Read More</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
  },
  readMoreButton: {
    alignItems: 'center',
  },
  readMoreText: {
    color: Colors.ButtonColor,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CardComponent;
