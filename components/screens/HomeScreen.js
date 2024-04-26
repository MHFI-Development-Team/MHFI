import { View, Text, Pressable, StyleSheet, Image, TextInput, SafeAreaView, ScrollView } from "react-native";
import DailyGoals from "../home/DailyGoals";
import { Dimensions } from 'react-native';
import ProfileIcon from "../../assets/svg/ProfileIcon";
import SettingIcon from "../../assets/svg/SettingsIcon";

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor:"#0C0F14", flex: 1, marginTop: 20, paddingTop: 10}}>
          <View style={styles.headerContainer}>
            <ProfileIcon />
            <SettingIcon />
          </View>
          <View>
            <DailyGoals />
          </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    paddingHorizontal: screenWidth * 0.05,
  },
  headerContainer: {
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "space-between"
  }
});
