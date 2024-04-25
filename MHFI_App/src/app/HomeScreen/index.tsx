import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { globalStyle } from '../../../assets/globalStyle/styles';

const globalStyles = globalStyle();

export default function HomeScreen() {
  return (
    <View style={{...globalStyles.container}}>
      <Stack.Screen options={{title: 'Home'}} />

      <Text>Home Screen</Text>

      <Link href="/HomeScreen/dailyGoals">Go to daily goals</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'red',
  },
});