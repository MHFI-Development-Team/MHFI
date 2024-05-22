import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Quiz = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Quiz</Text>
      <Button
        title="Smoking"
        onPress={() => router.push({ pathname: '/(quiz)/[quiz]', params: { category: 'Smoking' } })}
      />
      <Button
        title="Drinking"
        onPress={() =>
          router.push({ pathname: '/(quiz)/[quiz]', params: { category: 'Drinking' } })
        }
      />
      <Button
        title="Drugs"
        onPress={() => router.push({ pathname: '/(quiz)/[quiz]', params: { category: 'Drugs' } })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Quiz;
