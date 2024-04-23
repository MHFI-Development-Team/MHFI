import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, StatusBar, ScrollView } from 'react-native';

// import { ArrowRight, WalkingGoalIcon } from "../../assets/svg/svg-icons";

import { global_style_function } from "../../assets/style";
import { useResponsive } from "react-native-responsive-hook";
import ContentForYou from "../home/ContentForYou";

import DailyGoals from "../home/DailyGoals";
import SuggestedTools from "../home/SuggestedTools";
import ArrowRight from "../../assets/svg/arrow-right";
import WalkingGoalIcon from "../../assets/achievements/walking_goal";
import SearchBarIcon from "../../assets/svg/searchbar-icon";
import FeedHeader from "../feed/FeedHeader";
import FeedCards from "../feed/FeedCards";
import SettingIcon from "../../assets/svg/SettingsIcon";
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function FeedScreen() {
  const styles = useStyles();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FeedHeader />
        <ScrollView showsVerticalScrollIndicator={false}>
          <FeedCards />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const useStyles = () => {
  const { rem, vh, vw } = useResponsive();

  const styles = StyleSheet.create({
    ...global_style_function(),
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: "#040509",
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 16,
      paddingRight: 16
    },
  });

  return styles;

};