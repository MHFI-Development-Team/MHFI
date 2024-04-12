import { StyleSheet, Dimensions  } from "react-native";
import { Svg, Defs, RadialGradient, Rect, Stop } from 'react-native-svg';



// Gets phone screenWidth
const screenWidth = Dimensions.get('window').width;

export const globalStyles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    fontFamily: "Poppins",
  },
  mainPageContainer: {
    backgroundColor: "#040509",
    flex: 1,
  },
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0.05 * screenWidth,
  },
  headerText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
    flex: 1
  },
  headerImage: {
    width: 33,
    height: 33,
  },
});