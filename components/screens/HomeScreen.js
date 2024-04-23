import { View, Text, Pressable, StyleSheet, Image, TextInput, SafeAreaView, ScrollView } from "react-native";

// import { ArrowRight, WalkingGoalIcon } from "../../assets/svg/svg-icons";

import { global_style_function } from "../../assets/style";
import { useResponsive } from "react-native-responsive-hook";
import ContentForYou from "../home/ContentForYou";

import DailyGoals from "../home/DailyGoals";
import SuggestedTools from "../home/SuggestedTools";
import ArrowRight from "../../assets/svg/arrow-right";
import WalkingGoalIcon from "../../assets/achievements/walking_goal";
import SearchBarIcon from "../../assets/svg/searchbar-icon";

export default function HomeScreen() {
  const styles = useStyles();
  return (
    <View style={{ ...styles.background, ...styles.fullHeight }}>
      {/* <View style={styles.topBar}>
        <Pressable onPress={() => {}}>
          <Image
            style={styles.topBarAvatar}
            source={require("../../assets/placeholder.png")}
          ></Image>
        </Pressable>
        <Text style={styles.topBarText}>
          Good morning, <Text style={styles.italic}>Abdul</Text>
        </Text>
      </View> */}
      <SafeAreaView>
        <ScrollView>
          <View style={styles.contentForYouWrapper}>
            <DailyGoals />
            <SuggestedTools />
            <ContentForYou />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const useStyles = () => {
  const { rem, vh, vw } = useResponsive();

  const styles = StyleSheet.create({
    ...global_style_function(),
    contentForYouWrapper: {
        display: 'flex',
        flexDirection: 'column',
        //marginTop: vh(2.575),
        //paddingHorizontal: vh(1.93),
    },
    contentForYouHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchbarBarWrapper: {
        height: vh(4.72),
        borderRadius: 100,
        gap: vh(1.0729),
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: vh(1.9313),
        paddingVertical: vh(1.0729),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(108, 92, 231, 0.25)',
        backgroundColor: 'rgba(21, 43, 134, 0.2)',
    },
    searchBarInput: {
        width: '100%',
        height: '100%',
        flexShrink: 1,
        color: '#fff'
    },

    fullHeight: {
        flex: 1
    },
    dailyGoalsAchievements: {
      display: "flex",
      flexDirection: "row",
      gap: vh(2.36051502),
    },
    dailyGoalsAchievementText: {
      marginTop: vh(0.429),
    },
    // dailyGoalsAchievementValue
    dailyGoalsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: vh(1.502),
      marginTop: vh(1.28)
    },
    dailyGoalsText: {
      fontSize: 20,
      // fontSize: rem(1)
    },
    dailyGoalsHeader: {
      display: "flex",
      flexDirection: "row",

      alignItems: "center",
      justifyContent: "space-between",
    },
    topBar: {
      height: vh(6.75965665),
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: vh(1.07),
      paddingHorizontal: vh(2.36051502),
    },
    italic: {
      fontStyle: "italic",
    },
    topBarText: {
      color: "#fff",
      zIndex: 2,
      fontWeight: "800",
    },
    topBarAvatar: {
      width: vh(3.54),
      height: vh(3.54),
    },
  });

  return styles;
};
