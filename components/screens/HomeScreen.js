import { View, Text, Pressable, StyleSheet, Image, TextInput, SafeAreaView, ScrollView } from "react-native";
import { Dimensions } from 'react-native';
import ProfileIcon from "../../assets/svg/ProfileIcon";
import SettingIcon from "../../assets/svg/SettingsIcon";
import { StatusBar } from "expo-status-bar";
import DailyGoals from "../home/DailyGoals";
import ContentForYou from "../home/ContentForYou";
import SuggestedTools from "../home/SuggestedTools";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function HomeScreen() {
  return (
      <SafeAreaView style={{backgroundColor: '#0C0F14', flex: 1}}>
        <View style={styles.container}>
          <View style={{flex: 1, justifyContent: "center", gap: 25}}>
            <DailyGoals />
            <SuggestedTools />
            <ContentForYou />
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: screenWidth * 0.05,
    flex: 1
  },
});
