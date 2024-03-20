import { View, Text, Pressable, StyleSheet, Image, FlatList, SafeAreaView, ScrollView } from "react-native"

import ArrowRight from "../../assets/svg/arrow-right"
import WalkingGoalIcon from "../../assets/achievements/walking_goal";

import { global_style_function } from "../../assets/style";
import { useResponsive } from "react-native-responsive-hook";
import { TouchableOpacity } from "react-native";
import Greetings from "../../utils/Greetings";

export default function HomeScreen() {
    const styles = useStyles();
  return (
    <View style={styles.background}>
        <View style={styles.topBar}>
            <TouchableOpacity onPress={() => {}}>
            <Image
                style={styles.topBarAvatar}
                source={require("../../assets/placeholder.png")}
            ></Image>
            </TouchableOpacity>
            
            <Text style={styles.topBarText}><Greetings/>,<Text> Abdul</Text></Text>
      </View>

        <View style={{...styles.dailyGoalsWrapper}}>
            <View style={{...styles.dailyGoalsHeader}}>
                <Text style={{ ...styles.dailyGoalsText, ...styles.heading, ...styles.colorLight }}>
                    Your daily goals
                </Text>
                <TouchableOpacity activeOpacity={0.80}>
                    <ArrowRight></ArrowRight>
                </TouchableOpacity>
            </View>

            <SafeAreaView style={{...styles.dailyGoalsAchievements}}>
              <ScrollView style = {styles.flatList} horizontal = {true}>
                <TouchableOpacity activeOpacity={0.80}>
                    <WalkingGoalIcon />
                    <View style={{...styles.dailyGoalsAchievementText}}>
                        <Text style={{...styles.colorLight}}>Daily steps</Text>
                        <Text style={{...styles.dailyGoalsAchievementValue, ...styles.colorLight}}>200 / 10,000</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.80}>
                    <WalkingGoalIcon />
                    <View style={{...styles.dailyGoalsAchievementText}}>
                        <Text style={{...styles.colorLight}}>Daily steps</Text>
                        <Text style={{...styles.dailyGoalsAchievementValue, ...styles.colorLight}}>200 / 10,000</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.80}>
                    <WalkingGoalIcon />
                    <View style={{...styles.dailyGoalsAchievementText}}>
                        <Text style={{...styles.colorLight}}>Daily steps</Text>
                        <Text style={{...styles.dailyGoalsAchievementValue, ...styles.colorLight}}>200 / 10,000</Text>
                    </View>
                </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
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

        flatList: {
          height: '100%',
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
  
