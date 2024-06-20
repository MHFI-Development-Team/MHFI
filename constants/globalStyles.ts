import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get("window").height;
export default StyleSheet.create({
  container: {
    backgroundColor: '#171621',
    flex: 1,
    textDecorationColor: 'white',
  },
  textHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: windowHeight * 0.02,
  },
  text: {
    color: 'white',
  },
  secondary: {
    backgroundColor: '#303345',
  },
});
