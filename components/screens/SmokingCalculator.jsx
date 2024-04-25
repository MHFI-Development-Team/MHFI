import React, { useState, useRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, Modal, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Imported Dropdown component

// Data for dropdown options
const data = [
  { label: 'Cigarettes', value: '1' },
  { label: 'Rollies', value: '2' },
  { label: 'Vapes', value: '3' },
  { label: 'Cigars', value: '4' },
];

const SmokingCalculator = () => {
  // States
  const [value, setValue] = useState(null); // State for selected dropdown value
  const [isFocus, setIsFocus] = useState(false); // State to track focus on dropdown
  const [smokingType, setSmokingType] = useState('Default'); // State for selected smoking type
  const [costText, setCostText] = useState('......'); // Placeholder text for cost input
  const [showPerPackInput, setShowPerPackInput] = useState(false); // State to show/hide per pack input
  const [smokesPerDay, setSmokesPerDay] = useState(0); // State for number of smokes per day
  const [perDayText, setPerDayText] = useState('......'); // Placeholder text for smokes per day input
  const [perPack, setPerPack] = useState(0); // State for number of items per pack
  const [costPerItem, setCostPerItem] = useState(0); // State for cost per item
  const [costPerDay, setCostPerDay] = useState(0); // State for cost per day
  const [costPerWeek, setCostPerWeek] = useState(0); // State for cost per week
  const [costPerMonth, setCostPerMonth] = useState(0); // State for cost per month
  const [costPerYear, setCostPerYear] = useState(0); // State for cost per year
  const [modalVisible, setModalVisible] = useState(false); // State for error modal visibility
  const [errorType, setErrorType] = useState(null); // State to track the type of error

  const smokesPerDayRef = useRef(null);
  const costPerItemRef = useRef(null);
  const perPackRef = useRef(null);
  
  // Function to handle dropdown change
  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setIsFocus(false);
    
     // Update smoking type, costStyle text, and placeholder text based on selected value
    switch (itemValue) {
      case '1':
        setSmokingType('smokes');
        setCostText('Cost per pack of 20?');
        setPerDayText('Cigarettes per day?');
        setShowPerPackInput(false);
        break;
      case '2':
        setSmokingType('rollies');
        setCostText('Cost per tobacco pouch');
        setPerDayText('Rollies per day?');
        setShowPerPackInput(true);
        break;
      case '3':
        setSmokingType('vapes');
        setCostText('Cost per vape?');
        setPerDayText('Vapes per day?');
        setShowPerPackInput(false);
        break;
      case '4':
        setSmokingType('cigars');
        setCostText('Cost per pack?');
        setPerDayText('Cigars per day?');
        setShowPerPackInput(true);
        break;
      default:
        setSmokingType('Default');
        handleReset();
    }
  };

  // Function to display error modal
  const errorModal = () => {
    let errorMessage;

    switch(errorType){
      case('selectSmokeType'):
        errorMessage = 'Uh oh, Please select a smoking type!'
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

    // Validation checks
    if (smokingType === 'Default') {
      setModalVisible(true);
      setErrorType('selectSmokeType');
      return; // Exit the function early
    }

    if (smokingType !== 'cigarettes' && smokingType !== 'vapes' && (smokesPerDay === 0 || costPerItem === 0)) {
      setModalVisible(true);
      setErrorType('nullValues');
      handleReset();
      return; // Exit the function early
    }
  
    // For rollies and cigars, also check if perPack is provided
    if ((smokingType === 'rollies' || smokingType === 'cigars') && (smokesPerDay === 0 || costPerItem === 0 || perPack === 0)) {
      setModalVisible(true);
      setErrorType('nullValues');
      handleReset();
      return; // Exit the function early
    }

    // Calculate costs based on smoking type
    let costPerDay = 0;
    let costPerCig = 0;

    switch(smokingType) {
      case 'smokes':
        costPerCig = costPerItem / 20;
        costPerDay = costPerCig * smokesPerDay;
        break;
      case 'vapes':
        costPerDay = costPerItem * smokesPerDay;
        break;
      case 'rollies':
      case 'cigars':
        costPerDay = (costPerItem / perPack) * smokesPerDay;
        break;
      default:
        break;
    }
  
    // Calculate costs for different durations
    const costPerWeek = costPerDay * 7;
    const costPerMonth = costPerDay * 30;
    const costPerYear = costPerDay * 365;

    // Update state with calculated costs
    setCostPerDay(costPerDay.toFixed(2));
    setCostPerWeek(costPerWeek.toFixed(2));
    setCostPerMonth(costPerMonth.toFixed(2));
    setCostPerYear(costPerYear.toFixed(2));

    // Reset inputs
    handleReset();
  };

  // Function to reset inputs and state variables
  const handleReset = () => {
    setSmokesPerDay(0);
    setCostPerItem(0);
    setPerPack(0);

    // Clear text inputs
    smokesPerDayRef.current.clear();
    costPerItemRef.current.clear();
   
    if (showPerPackInput) {
      perPackRef.current.clear();
    }
  }; 

  return (
    <View style={styles.container}>
      {/* Header Text and Reset Button */}
      <View style={styles.inputContainer}>
        <TouchableOpacity activeOpacity={0.5} style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.calculateText}>Reset</Text>
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>What are you smoking?</Text>
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
        
        {/* Smoking Type Input */}
        <View style={styles.textContainer}>
          <Text style={styles.dynamicText}>{perDayText}</Text>
        </View>
        <TextInput 
          ref ={smokesPerDayRef}
          style={styles.inputStyle} 
          placeholder="?" 
          keyboardType="numeric"
          onChangeText={(text) => {
            // Replace any non-numeric characters with an empty string
            text = text.replace(/[^0-9]/g, '').replace('-', '');
            setSmokesPerDay(parseInt(text));
          }}
        />
        
        {/* Per Pack Input */}
        {showPerPackInput && (
          <View style={styles.textContainer}>
            <Text style={styles.dynamicText}>How many per pack?</Text>
          </View>
        )}
        {showPerPackInput && <TextInput 
          ref={perPackRef}
          style={styles.inputStyle} 
          placeholder="?" 
          keyboardType="numeric"
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, '').replace('-', '');
            setPerPack(parseInt(text));
          }}
        />}
        
        {/* Cost Text Input */}
        <View style={styles.textContainer}>
          <Text style={styles.dynamicText}>{costText}</Text>
        </View>
        <TextInput 
          ref ={costPerItemRef}
          style={styles.inputStyle} 
          placeholder="?" 
          keyboardType="numeric"
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, '').replace('-', '');
            setCostPerItem(parseFloat(text));
          }}
        />
      </View>
      
      {/* Calculate Button */}
      <TouchableOpacity activeOpacity={0.5} style={styles.calculateBtn} onPress={handleCalculate}>
        <Text style={styles.calculateText}>Calculate Savings</Text>
      </TouchableOpacity>
        
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
      {errorModal()}
    </View>
  );
};

export default SmokingCalculator;

// Styles
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black', // You can change the background color here
  },
  inputContainer: {
    padding: 16,
    flexDirection: 'row', // Flex main axis horizontally
    justifyContent: 'flex-start', // Align items to start
    flexWrap: 'wrap', // Wrap items if they exceed the width
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
    width: '100%', // Set width to 100%
  },
  costContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dynamicText: {
    fontSize: 16,
    color: 'white',
    width: 250,
    textAlign: 'left', 
    marginLeft: 10, 
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
    alignSelf: 'center', // Center the button horizontally
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
  spendingText: {
    fontSize: 16,
    color: 'white',
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
  calculateText: {
    fontSize: 16,
    color: 'white',
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
    alignSelf: 'center', // Align button to center horizontally
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
