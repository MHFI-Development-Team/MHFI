import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SmokingCalculator from './components/screens/SmokingCalculator';
import DrinkingCalculator from './components/screens/DrinkingCalculator';

export default function App() {


  return (

    <View style={styles.container}>
     <DrinkingCalculator/>
    </View>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
