import { StyleSheet, Dimensions  } from "react-native";

// const { rem, vh, vw } = useResponsive();
export const homeStyles = StyleSheet.create({
    goalContainer: {
        height: 231,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingTop: 12
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '400'
    },
    dailyGoalsAchievement: {
        paddingTop: 14,
        paddingLeft: 18,
        display: 'flex',
        flexDirection: 'row',
    },
    dailyGoalsAchievementText:{
        marginTop: 2,
        alignItems: 'center'

    },
    flatList: {
        height: '100%',
    },
    TouchableOpacityStyle: {
        alignItems: 'center',
        marginRight: 10,
        activeOpacity: 0.80
    },
    TouchableOpacityStyleSuggested: {
        alignItems: 'center',
        marginRight: 24,
        activeOpacity: 0.80
    },
    colorLight:{
        fontSize: 14,
        fontWeight: '400',
        paddingTop: 5,
        color: 'white'
    },
    dailyGoalsAchievementValueLighter: {
        color: 'rgba(255, 255, 255, 0.2)' // 80% lighter than white
    },
    dailyGoalsAchievementValueLight: {
        color: 'rgba(255, 255, 255, 0.4)' // 60% lighter than white
    },
    headerSuggested: {
        marginTop: 20
    },
    SuggestedTools: {
        paddingTop: 25
    }
})