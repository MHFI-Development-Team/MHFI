import { StyleSheet,  Dimensions, } from "react-native";

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#171621', // Set background color for the entire screen
    padding: 16, // Add padding to the container
  },
  inputContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: '#303345',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginBottom: 10, // Adjusted margin for consistency
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  inputStyle: {
    height: 40,
    width: '100%',
    color: 'white',
    backgroundColor: '#303345',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  textContainer: {
    marginBottom: 10,
    width: '100%', 
  },
  costContainer: {
    flexDirection: 'row',
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
    marginHorizontal: 10, // Added margin for consistent spacing
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
    width: '100%', // Adjusted width to fill the container
    backgroundColor: '#FF922E',
    borderWidth: 1.5,
    borderRadius: 30,
    marginBottom: 20,
  },
  calculateText: {
    fontSize: 16,
    color: 'white',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10, 
    marginBottom: 10, // Added margin bottom for consistency
  },
  costStyle: {
    height: 70,
    width: 70,
    color: 'white',
    backgroundColor: '#6A1B9A',
    borderRadius: 35,
    textAlign: 'center', 
    textAlignVertical: 'center', 
  },
  resetBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 100,
    backgroundColor: '#FF922E',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignSelf: 'center', 
  },
});

export default styles;