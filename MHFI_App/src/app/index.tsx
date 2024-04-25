import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link, Redirect } from 'expo-router';

export default function HomeScreenRedirect() {
  return (
    <Redirect href={'/HomeScreen'} />
  );
}
