import { View, Text, Pressable, StyleSheet, Image, TextInput, SafeAreaView, ScrollView } from "react-native";
import DailyGoals from "../home/DailyGoals";
import { Dimensions } from 'react-native';
import { StatusBar } from "expo-status-bar";
import ContentForYou from "../home/ContentForYou";
import SuggestedTools from "../home/SuggestedTools";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function DailyGoalsTasksScreen() {
  return (
      <SafeAreaView style={{backgroundColor: '#0C0F14', flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: "center", gap: 25, alignItems: "center"}}>
            <Text style={{color: "white"}}>Daily Goal Tasks Screen</Text>
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
