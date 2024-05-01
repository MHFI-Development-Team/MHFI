import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
  inputContainer: {
    padding: 16,
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    flexWrap: 'wrap', 
  },
  dropdown: {
    height: 50,
    width: '100%',
    backgroundColor: '#0A1336',
    borderColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 8,
    marginBottom: 5
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  inputStyle: {
    height: 40,
    width: '100%',
    color: 'white',
    backgroundColor: '#0A1336',
    borderColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 10
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
    width: 'auto',
    textAlign: 'left', 
    marginLeft: 10, 
    flexWrap: 'wrap', 
  },
  costTextContainer: {
    alignItems: 'center',
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
    width: 250,
    backgroundColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignSelf: 'center', 
  },
  calculateText: {
    fontSize: 16,
    color: 'white',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 10, 
  },
  costStyle: {
    height: 70,
    width: 70,
    color: 'white',
    backgroundColor: '#0A1336',
    borderColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 35,
    marginHorizontal: 10, 
    marginTop: 20,
    textAlign: 'center', 
    justifyContent: 'center', 
    textAlignVertical: 'center', 
  },
  resetBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 100,
    backgroundColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20,
    alignSelf: 'center', 
  },
  });
  export default styles;