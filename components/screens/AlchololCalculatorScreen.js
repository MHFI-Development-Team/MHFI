import { View, Text, Pressable, StyleSheet, Image, TextInput, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useRef } from 'react';
import DailyGoals from "../home/DailyGoals";
import { Dimensions } from 'react-native';
import { StatusBar } from "expo-status-bar";
import ContentForYou from "../home/ContentForYou";
import SuggestedTools from "../home/SuggestedTools";
import { Dropdown } from 'react-native-element-dropdown';
import ErrorModal from "../ErrorModal";
// Dropdown options

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Dropdown options
const data = [
  { label: 'Cans', value: '1' },
  { label: 'Spirits', value: '2' },
];

const AlchoholCalculatorScreen = () => {
  // State variables
  const [value, setValue] = useState(null); // Dropdown selected value
  const [isFocus, setIsFocus] = useState(false); // Dropdown focus state
  const [drinkType, setType] = useState('Default'); // Type of drink selected
  const [drinkingTypeText, setDrinkingTypeText] = useState('......'); // Text related to drink type
  const [costText, setCostText] = useState('......'); // Text related to cost
  const [amountText, setAmountText] = useState('......'); // Text related to amount per pack
  const [drinksPerDay, setDrinksPerDay] = useState(0); // Number of drinks consumed per day
  const [costPerItem, setCostPerItem] = useState(0); // Cost per pack/bottle
  const [drinkVolume, setDrinkVolume] = useState(0); // Volume per pack/bottle
  const [costPerDay, setCostPerDay] = useState(0); // Cost per day
  const [costPerWeek, setCostPerWeek] = useState(0); // Cost per week
  const [costPerMonth, setCostPerMonth] = useState(0); // Cost per month
  const [costPerYear, setCostPerYear] = useState(0); // Cost per year
  const [modalVisible, setModalVisible] = useState(false);//Error modal
  const [errorType, setErrorType] = useState(null); // State to track the type of error


  // Function to handle dropdown change
  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setIsFocus(false);

    switch (itemValue) {
      case '1':
        setDrinkingTypeText('Cans consumed per day?');
        setCostText('Cost per pack of cans');
        setAmountText('Cans per pack?');
        setType('Cans');
        break;
      case '2':
        setDrinkingTypeText('Volume consumed per day (ml)?');
        setCostText('Cost per bottle of spirits');
        setAmountText('Volume per bottle (ml)?');
        setType('Spirits');
        break;
      default:
        setType('Default');
    }

    handleReset();
  
  };

  const errorModal = () => {
    console.log("Inside errorModal");
    let errorMessage;

    switch(errorType){
      case('selectDrinkType'):
        errorMessage = 'Uh oh, Please select a drink type!'
      break;
      case('nullValues'):
      errorMessage = 'Uh oh, All fields must have a value!'
      break;
      default:
        errorMessage = 'ERROR :('
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{errorMessage}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  // Function to handle calculate button press
  const handleCalculate = () => {
    setErrorType(null);

      if (drinkType === 'Default') {
        setModalVisible(true);
        setErrorType('selectDrinkType');
        return; // Exit the function early
      }

      if(drinksPerDay === 0 || drinkVolume === 0 || costPerItem === 0){
        setModalVisible(true);
        setErrorType('nullValues');
        handleReset();
        return; // Exit the function early
      }
  
    let costPerDay = 0;

    switch (drinkType) {
      case 'Cans':
        costPerDay = (drinksPerDay * costPerItem) / drinkVolume;
        break;
      case 'Spirits':
        costPerDay = (drinksPerDay * costPerItem) / drinkVolume;
        break;
      default:
        break;
    }

    // Calculate costs for week, month, and year
    const costPerWeek = costPerDay * 7;
    const costPerMonth = costPerDay * 30;
    const costPerYear = costPerDay * 365;

    // Update state with calculated costs
    setCostPerDay(costPerDay.toFixed(2));
    setCostPerWeek(costPerWeek.toFixed(2));
    setCostPerMonth(costPerMonth.toFixed(2));
    setCostPerYear(costPerYear.toFixed(2));

    handleReset();
  };

  // Function to handle reset button press
  const handleReset = () => {
    // Reset state variables
    setDrinksPerDay(0);
    setCostPerItem(0);
    setDrinkVolume(0);

    // Clear text inputs
    drinksPerDayRef.current.clear();
    costPerItemRef.current.clear();
    drinkVolumeRef.current.clear();
  };

  // References for text inputs
  const drinksPerDayRef = useRef(null);
  const costPerItemRef = useRef(null);
  const drinkVolumeRef = useRef(null);

  return (
      <SafeAreaView style={{backgroundColor: '#0C0F14', flex: 1}}>
        <View style={styles.container}>
      <View style={styles.inputContainer}>
      {/* Reset button */}
      <TouchableOpacity activeOpacity={0.5} style={styles.resetBtn} onPress={handleReset}>
        <Text style={styles.calculateText}>Reset</Text>
      </TouchableOpacity>

      {/* Header Text */}
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>What are you drinking?</Text>
      </View>

      {/* Dropdown */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => handleDropdownChange(item.value)}
      />

      {/* Drinking Type Input */}
      <View style={styles.textContainer}>
        <Text style={styles.dynamicText}>{drinkingTypeText}</Text>
      </View>
      <TextInput
        ref={drinksPerDayRef}
        style={styles.inputStyle}
        placeholder="?"
        keyboardType="numeric"
        onChangeText={(text) => {
          // Replace any non-numeric characters with an empty string
          text = text.replace(/[^0-9]/g, '').replace('-', '');
          setDrinksPerDay(parseInt(text));
        }}
      />

      {/* Amount Per Pack Input */}
      <View style={styles.textContainer}>
        <Text style={styles.dynamicText}>{amountText}</Text>
      </View>
      <TextInput
        ref={drinkVolumeRef}
        style={styles.inputStyle}
        placeholder="?"
        keyboardType="numeric"
        onChangeText={(text) => {
          text = text.replace(/[^0-9]/g, '').replace('-', '');
          setDrinkVolume(parseInt(text));
        }}
      />

      {/* Cost Text Input */}
      <View style={styles.textContainer}>
        <Text style={styles.dynamicText}>{costText}</Text>
      </View>
      <TextInput
        ref={costPerItemRef}
        style={styles.inputStyle}
        placeholder="?"
        keyboardType="numeric"
        onChangeText={(text) => {
          // Allow only numeric and decimal inputs
          text = text.replace(/[^0-9.]/g, '');
          setCostPerItem(parseFloat(text));
        }}
      />
      </View>
      {/* Calculate Button */}
      <View style={{alignContent:'center'}}>
      <TouchableOpacity activeOpacity={0.5} style={styles.calculateBtn} onPress={handleCalculate}>
        <Text style={styles.calculateText}>Calculate Savings</Text>
      </TouchableOpacity>
      </View>

      {/* Cost Display */}
      <View style={styles.costContainer}>
        <View style={styles.costTextContainer}>
          <Text style={styles.costTextStyle}>Per Day</Text>
          <Text style={styles.costStyle}>€{costPerDay}</Text>
        </View>

        <View style={styles.costTextContainer}>
          <Text style={styles.costTextStyle}>Per Week</Text>
          <Text style={styles.costStyle}>€{costPerWeek}</Text>
        </View>

        <View style={styles.costTextContainer}>
          <Text style={styles.costTextStyle}>Per Month</Text>
          <Text style={styles.costStyle}>€{costPerMonth}</Text>
        </View>

        <View style={styles.costTextContainer}>
          <Text style={styles.costTextStyle}>Per Year</Text>
          <Text style={styles.costStyle}>€{costPerYear}</Text>
        </View>
      </View>
        {/* Error Modal */}
        <ErrorModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        errorType={errorType}
      />
    </View>
      </SafeAreaView>
  );
};
export default AlchoholCalculatorScreen;

const styles = StyleSheet.create({
  container: {
    paddingLeft: screenWidth * 0.05,
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
  backgroundColor: '#234AF5',
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
  backgroundColor: '#234AF5',
  borderWidth: 1.5,
  borderRadius: 30,
  paddingHorizontal: 15,
  marginBottom: 20,
  alignSelf: 'center', 
},
});