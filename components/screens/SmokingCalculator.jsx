import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Imported Dropdown component
import ErrorModal from './ErrorModal'; // Import ErrorModal component

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
    setSmokesPerDay(0);
    setPerPack(0);
    setCostPerItem(0);

    // Clear text inputs
    smokesPerDayRef.current.clear();
    costPerItemRef.current.clear();
    perPackRef.current.clear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
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

        {/* Input for smokes per day */}
        <View style={styles.textContainer}>
          <Text style={styles.dynamicText}>{perDayText}</Text>
        </View>
        <TextInput
          ref={smokesPerDayRef}
          style={styles.inputStyle}
          placeholder="?"
          keyboardType="numeric"
          onChangeText={(text) => {
            text = text.replace(/[^0-9]/g, '').replace('-', '');
            setSmokesPerDay(parseInt(text));
          }}
        />

        {/* Input for per pack (if applicable) */}
        {showPerPackInput && (
          <View style={styles.textContainer}>
            <Text style={styles.dynamicText}>Items per pack?</Text>
          </View>
        )}
        {showPerPackInput && (
          <TextInput
            ref={perPackRef}
            style={styles.inputStyle}
            placeholder="?"
            keyboardType="numeric"
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, '').replace('-', '');
              setPerPack(parseInt(text));
            }}
          />
        )}

        {/* Input for cost per item */}
        <View style={styles.textContainer}>
          <Text style={styles.dynamicText}>{costText}</Text>
        </View>
        <TextInput
          ref={costPerItemRef}
          style={styles.inputStyle}
          placeholder="?"
          keyboardType="numeric"
          onChangeText={(text) => {
            text = text.replace(/[^0-9.]/g, '');
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
      <ErrorModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        errorType={errorType}
      />
    </View>
  );
};

export default SmokingCalculator;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black', 
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
});
