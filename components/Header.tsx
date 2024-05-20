import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import TabBarIcon from './navigation/TabBarIcon';
import { Link } from 'expo-router';

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    padding: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity>
        <Link href="/profile">
          <TabBarIcon name="user" color="white" />
        </Link>
      </TouchableOpacity>
    </View>
  );
}
