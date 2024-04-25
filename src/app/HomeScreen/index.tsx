import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import HomeIcon from "../../../assets/svg/homeIcon";
import { Link, Stack } from 'expo-router';

export default function HomeScreen() {

  const headerStyle = StyleSheet.create({
    main: {
      backgroundColor: "black",
      color: "white"
    }
  })

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "black", borderBottomWidth: 0, padding: 10},
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          headerTitle: "Home",
          headerLeft: () => 
            <View style={{ paddingLeft: 16 }}>
              <HomeIcon />
            </View>
,
          headerRight: () => (
            <View style={{ paddingRight: 16 }}>
              <HomeIcon />
            </View>
          ),
        }}
      />

      <Text>Home Screen</Text>

      <Link href="/HomeScreen/dailyGoals">Go to daily goals</Link>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171621',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
});