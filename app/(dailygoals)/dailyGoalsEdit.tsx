import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import Button from '@/components/Button';
import { Colors } from '@/constants/Colors';

const dailyGoalsEdit = () => {
  const handlePress = () => {
    Alert.alert('Button pressed!');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>dailyGoalsEdit</Text>
      <Button
        title="Test"
        onPress={handlePress}
        style={styles.customButton}
        textStyle={styles.customText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  customText: {
    color: 'black',
    fontSize: 15,
  },
});

export default dailyGoalsEdit;
