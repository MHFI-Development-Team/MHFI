import { View, Text, Pressable, StyleSheet, Image } from "react-native"

import ArrowRight from "../../assets/svg/arrow-right"
import WalkingGoalIcon from "../../assets/achievements/walking_goal";

import { global_style_function } from "../../assets/style";
import { useResponsive } from "react-native-responsive-hook";

export default function HomeScreen() {
    const styles = useStyles();
  return (
    <View style={styles.background}>
        <View style={styles.topBar}>
            <Pressable onPress={() => {}}>
            <Image
                style={styles.topBarAvatar}
                source={require("../../assets/placeholder.png")}
            ></Image>
            </Pressable>
            <Text style={styles.topBarText}>Good morning, <Text style={styles.italic}>Abdul</Text></Text>
      </View>

        <View style={{...styles.dailyGoalsWrapper}}>
            <View style={{...styles.dailyGoalsHeader}}>
                <Text style={{ ...styles.dailyGoalsText, ...styles.heading, ...styles.colorLight }}>
                    Your daily goals
                </Text>
                <Pressable>
                    <ArrowRight></ArrowRight>
                </Pressable>
            </View>
            <View style={{...styles.dailyGoalsAchievements}}>
                <Pressable>
                    <WalkingGoalIcon />
                    <View style={{...styles.dailyGoalsAchievementText}}>
                        <Text style={{...styles.colorLight}}>Daily steps</Text>
                        <Text style={{...styles.dailyGoalsAchievementValue, ...styles.colorLight}}>200 / 10,000</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <WalkingGoalIcon />
                    <View style={{...styles.dailyGoalsAchievementText}}>
                        <Text style={{...styles.colorLight}}>Daily steps</Text>
                        <Text style={{...styles.dailyGoalsAchievementValue, ...styles.colorLight}}>200 / 10,000</Text>
                    </View>
                </Pressable>
                <Pressable>
                    <WalkingGoalIcon />
                    <View style={{...styles.dailyGoalsAchievementText}}>
                        <Text style={{...styles.colorLight}}>Daily steps</Text>
                        <Text style={{...styles.dailyGoalsAchievementValue, ...styles.colorLight}}>200 / 10,000</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    </View>
  )
}

const useStyles = () => {
    const { rem, vh, vw } = useResponsive();
  
    const styles = StyleSheet.create({ 
        ...global_style_function(),
        dailyGoalsAchievements: {
            display: 'flex',
            flexDirection: 'row',
            gap: vh(2.36051502)
        },
        dailyGoalsAchievementText: {
            marginTop: vh(0.429)
        },
        // dailyGoalsAchievementValue
      dailyGoalsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: vh(1.502),

        paddingHorizontal: vh(1.93),
        marginTop: vh(1.28)
      },
      dailyGoalsText: {
        fontSize: 20
        // fontSize: rem(1)
      },
      dailyGoalsHeader: {
        display: 'flex',
        flexDirection: 'row',

        alignItems: 'center',
        justifyContent: 'space-between',
      },
      topBar: {
        backgroundColor: '#000',
        height: vh(6.75965665),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: vh(1.07),
        paddingHorizontal: vh(2.36051502)
      },
      italic: {
        fontStyle: 'italic'
      },
      topBarText: {
        color: '#fff',
        zIndex: 2,
        fontWeight: "800"
      },
      topBarAvatar: {
        width: vh(3.54),
        height: vh(3.54),
      }
    });
  
    return styles
  }
  
