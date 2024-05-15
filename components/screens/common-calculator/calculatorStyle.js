import { StyleSheet,  Dimensions, } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171621', 
    padding: 16, 
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
  },
  resetContainer: {
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
    color: 'white'
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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center', 
  },
  dynamicText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10, 
  },
  costTextContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  costTextStyle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  calculateBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: screenWidth * 0.50,
    backgroundColor: '#FF922E',
    borderWidth: 1.5,
    borderRadius: 30,
    
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
    width: 70,
    color: 'white',
    backgroundColor: '#6A1B9A',
    borderRadius: 35,
    marginHorizontal: 5, 
    textAlign: 'center', 
    textAlignVertical: 'center', 
 
  },
  resetBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: screenWidth * 0.30,
    backgroundColor: '#FF922E',
    borderWidth: 1.5,
    borderRadius: 30,
    alignSelf: 'center', 
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;