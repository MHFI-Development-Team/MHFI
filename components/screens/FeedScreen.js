import { View, Text, Pressable, StyleSheet, Image, TextInput, SafeAreaView, ScrollView } from "react-native";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function ProfileScreen() {
  return (
      <SafeAreaView style={{backgroundColor: '#171621', flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: "center", gap: 25, alignItems: "center"}}>
            <Text style={{color: "white"}}>Feed Screen</Text>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: screenWidth * 0.05,
    flex: 1
  },
});