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
  const [smokingType, setSmokingType] = useState('smokes');
  const [costText, setCostText] = useState('Cost of pack of 20?');
  const [showPerPackInput, setShowPerPackInput] = useState(false); //For rollies/cigars amount in pack
  const [smokesPerDay, setSmokesPerDay] = useState(0);
  const [perPack, setPerPack] = useState(20);//For rollies/cigars amount in pack
  const [costPerItem, setCostPerItem] = useState(0);
  const [costPerDay, setCostPerDay] = useState(0);
  const [costPerWeek, setCostPerWeek] = useState(0);
  const [costPerMonth, setCostPerMonth] = useState(0); 
  const [costPerYear, setCostPerYear] = useState(0); 

  // Function to handle dropdown change
  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setIsFocus(false);
    
     // Update smoking type and cost text based on selected value
  switch (itemValue) {
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

  // Function to handle calculate button press
  const handleCalculate = () => {
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

 
    const costPerWeek = costPerDay * 7;
    const costPerMonth = costPerDay * 30;
    const costPerYear = costPerDay * 365;

    setCostPerDay(costPerDay.toFixed(2));
    setCostPerWeek(costPerWeek.toFixed(2));
    setCostPerMonth(costPerMonth.toFixed(2));
    setCostPerYear(costPerYear.toFixed(2));
  };

  return (
    <View style={styles.container}>
      {/* Header Text */}
      <View style={styles.inputContainer}>
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
      <TextInput 
        style={styles.input} 
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
        style={styles.input} 
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
        style={styles.input} 
        placeholder="?" 
        keyboardType="numeric"
        onChangeText={(text) => {
          text = text.replace(/[^0-9]/g, '').replace('-', '');
          setCostPerItem(parseFloat(text));}}
      />

      {/* Calculate Button */}
      <Pressable style={styles.calculateBtn} onPress={handleCalculate}>
        <Text style={styles.calculateText}>Calculate</Text>
      </Pressable>
      </View>
        
      {/* Spending Text */}
      <View style={styles.textContainer}>
        <Text style={styles.spendingText}>How much you are spending</Text>
      </View>

      {/* Cost Display */}
      <View style={styles.costContainer}>
      <View style={styles.costTextContainer}>
          <Text style={styles.costNumber}>Per Day</Text>
          <Text style={styles.cost}>€{costPerDay}</Text>
        </View>

        <View style={styles.costTextContainer}>
          <Text style={styles.costNumber}>Per Week</Text>
          <Text style={styles.cost}>€{costPerWeek}</Text>
        </View>

        <View style={styles.costTextContainer}>
          <Text style={styles.costNumber}>Per Month</Text>
          <Text style={styles.cost}>€{costPerMonth}</Text>
        </View>
      
        <View style={styles.costTextContainer}>
          <Text style={styles.costNumber}>Per Year</Text>
          <Text style={styles.cost}>€{costPerYear}</Text>
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
    height: 70,
    width: 70, 
    color: 'white',
    backgroundColor: '#0A1336',
    borderColor: '#7473E6',
    borderWidth: 1.5,
    borderRadius: 35, 
    marginHorizontal: 15,
    marginTop: 20,
    textAlign: 'center', 
    justifyContent: 'center', 
    textAlignVertical: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  
});
