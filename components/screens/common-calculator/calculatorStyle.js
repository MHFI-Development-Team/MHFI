import { StyleSheet,  Dimensions, } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171621', 
    padding: 16,
  },
  resetContainer: {
    flex: 0.4,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
  },
  inputContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
  },
  dropdown: {
    height: 50,
    width: screenWidth - 30,
    backgroundColor: '#303345',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 10, 
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  inputStyle: {
    height: 50,
    width: screenWidth - 30,
    color: 'white',
    backgroundColor: '#303345',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 10,
    width: screenWidth - 30,
  },
  costContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 20,
    minHeight: 100, 
  },
  dynamicText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10, 
  },
  costTextContainer: {
    alignItems: 'center',
    marginHorizontal: 10, 
  },
  costTextStyle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  calculateBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: '100%', 
    backgroundColor: '#FF922E',
    borderWidth: 1.5,
    borderRadius: 30,
    marginBottom: 20,
    marginTop: 50
  },
  calculateText: {
    fontSize: 16,
    color: 'white',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10, 
    marginBottom: 10, 
  },
  costStyle: {
    height: 70,
    width: screenWidth - 30,
    color: 'white',
    backgroundColor: '#6A1B9A',
    borderRadius: 35,
    textAlign: 'center', 
    textAlignVertical: 'center', 
    marginHorizontal: 5, 
  },
  resetBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: screenWidth - 325,
    backgroundColor: '#FF922E',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignSelf: 'center', 
  },
});

export default styles;