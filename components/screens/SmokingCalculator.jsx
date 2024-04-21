import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// Data for dropdown options
const data = [
  { label: 'Cigarettes', value: '1' },
  { label: 'Rollies', value: '2' },
  { label: 'Vapes', value: '3' },
  { label: 'Cigars', value: '4' },
];

const SmokingCalculator = () => {
  // States
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [smokingType, setSmokingType] = useState('smokes'); // Default value
  const [costText, setCostText] = useState('Cost of pack of 20?'); // Default cost text
  const [showPerPackInput, setShowPerPackInput] = useState(false);

  // Function to handle dropdown change
  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setIsFocus(false);
    
    // Update smoking type and cost text based on selected value
    switch(itemValue) {
      case '1':
        setSmokingType('smokes');
        setCostText('Cost per pack of 20?');
        setShowPerPackInput(false);
        break;
      case '2':
        setSmokingType('rollies');
        setCostText('Cost per tobacco pouch');
        setShowPerPackInput(true);
        break;
      case '3':
        setSmokingType('vapes');
        setCostText('Cost per vape?');
        setShowPerPackInput(false);
        break;
      case '4':
        setSmokingType('cigars');
        setCostText('Cost per pack?');
        setShowPerPackInput(true);
        break;
      default:
        setSmokingType('smokes');
        setCostText('Cost per pack of 20?');
        setShowPerPackInput(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Text */}
      <View style={styles.textContainer}>
        <Text style={styles.headerText}>What are you smoking?</Text>
      </View>

      {/* Dropdown */}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => handleDropdownChange(item.value)}
      />
      
      {/* Smoking Type Input */}
      <View style={styles.textContainer}>
        <Text style={styles.dynamicText}>How many {smokingType} do you smoke per day?</Text>
      </View>
      <TextInput style={styles.input} placeholder="?" keyboardType="numeric"/>
      
      {/* Per Pack Input */}
      {showPerPackInput && (
        <View style={styles.textContainer}>
          <Text style={styles.dynamicText}>How many per pack?</Text>
        </View>
      )}
      {showPerPackInput && <TextInput style={styles.input} placeholder="?" keyboardType="numeric"/>}
      
      {/* Cost Text Input */}
      <View style={styles.textContainer}>
        <Text style={styles.dynamicText}>{costText}</Text>
      </View>
      <TextInput style={styles.input} placeholder="?" keyboardType="numeric"/>

      {/* Calculate Button */}
      <Pressable style={styles.calculateBtn} onPress ={() => console.log('Button')}>
        <Text style={styles.calculateText}>Calculate</Text>
      </Pressable>

      {/* Spending Text */}
      <View style={styles.textContainer}>
        <Text style={styles.spendingText}>How much you are spending</Text>
      </View>

      {/* Cost Display */}
      <View style={styles.costContainer}>
        <View style={styles.costTextContainer}>
          <Text style={styles.costNumber}>Per Week</Text>
          <Text style={styles.cost}>?</Text>
        </View>

        <View style={styles.costTextContainer}>
          <Text style={styles.costNumber}>Per Month</Text>
          <Text style={styles.cost}>?</Text>
        </View>
      
        <View style={styles.costTextContainer}>
          <Text style={styles.costNumber}>Per Year</Text>
          <Text style={styles.cost}>?</Text>
        </View>
      </View>
    </View>
  );
};

export default SmokingCalculator;

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: 250,
    backgroundColor: '#0A1336',
    borderColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 8,
    marginBottom: 16
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#0A1336',
  },
  input: {
    height: 50,
    width: 250,
    color: 'white',
    backgroundColor: '#0A1336',
    borderColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 20
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
    textAlign: 'center',
  },
  costTextContainer: {
    alignItems: 'center',
  },
  costNumber: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  calculateBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 250,
    backgroundColor: '#1B6C0D',
    borderColor: '#58FE7C',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 20
  },
  calculateText: {
    fontSize: 16,
    color: 'white',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
  },
  spendingText: {
    fontSize: 16,
    color: 'white',
  },
  cost: {
    height: 50,
    width: 50,
    color: 'white',
    backgroundColor: '#0A1336',
    borderColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 30,
    paddingHorizontal: 15,
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginTop: 20,
  },
});
