import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import TabBarIcon from './Navigation/TabBarIcon';
import { Link } from 'expo-router';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    paddingVertical: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.03,
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
