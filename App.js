import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SmokingCalculator from './components/screens/SmokingCalculator';

export default function App() {


  return (

    <View style={styles.container}>
     <SmokingCalculator/>
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
