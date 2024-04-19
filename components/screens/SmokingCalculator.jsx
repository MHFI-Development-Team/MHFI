import React, { useState } from 'react';
  import { StyleSheet, Text, TextInput, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';


  const data = [
    { label: 'Cigarettes', value: '1' },
    { label: 'Rollies', value: '2' },
    { label: 'Vapes', value: '3' },
    { label: 'Cigars', value: '4' },
  ];

  const SmokingCalculator = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [smokingType, setSmokingType] = useState('smokes'); // Default value
  const [costText, setCostText] = useState('Cost of pack of 20?'); // Default cost text

  // Function to handle dropdown change
  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setIsFocus(false);
    
    // Update smoking type and cost text based on selected value
    switch(itemValue) {
      case '1':
        setSmokingType('smokes');
        setCostText('Cost of pack of 20?');
        break;
      case '2':
        setSmokingType('rollies');
        setCostText('Cost of pack of 20?');
        break;
      case '3':
        setSmokingType('vapes');
        setCostText('Cost of single vape?');
        break;
      case '4':
        setSmokingType('cigars');
        setCostText('Cost of pack of 20?');
        break;
      default:
        setSmokingType('smokes');
        setCostText('Cost of pack of 20?');
    }
  };


    return (
      <View style={styles.container}>

         <View style={styles.textContainer}>
        <Text style={{fontSize: 16, color: 'white'}}>What are you smoking?</Text>
        </View>

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
         <View style={styles.textContainer}>
         <Text style={styles.dynamicText}>How many {smokingType} do you smoke per day?</Text>
         </View>
        <TextInput style={styles.input} placeholder="?"/>
        <View style={styles.textContainer}>
        <Text style={styles.dynamicText}>{costText}</Text>
        </View>
        <TextInput style={styles.input} placeholder="?"/>
       
        <View style={styles.costContainer}>
        <View style={styles.textContainer}>
        <Text style={{fontSize: 16, color: 'white'}}>How much you are spending</Text>
        </View>
        <Text style={styles.cost}>?</Text>
        </View>
        </View>
   
    );
  };

  export default SmokingCalculator;

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
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
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
    input:{
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
    cost: {
      height: 50,
      color: 'white',
      backgroundColor: '#0A1336',
      borderColor: '#7473E6',
      borderWidth: 1.5,
      borderRadius: 30,
      paddingHorizontal: 15,
      marginBottom: 20,
      alignSelf: 'stretch',
      marginLeft: -20,
      marginRight: -20,
    },
    
    
    textContainer:{
        alignItems: 'center',
        marginBottom: 20
    },
    costContainer:{
      alignItems: 'center',
      marginTop: 20
  },
  dynamicText: {
    fontSize: 16,
    color: 'white',
    width: 250,
    textAlign: 'center',
  },
    spentContainer:{

    }

  });