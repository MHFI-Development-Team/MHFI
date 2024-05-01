import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './calculatorStyle';
import AlchoholCalculatorLogic from './AlchoholCalculatorLogic';
import ErrorModal from '../../ErrorModal';

const AlcohololCalculatorUI = () => {
  const {
    data,
    value,
    setValue,
    isFocus,
    setIsFocus,
    drinkingTypeText,
    setDrinkingTypeText,
    costText,
    setCostText,
    amountText,
    setAmountText,
    drinksPerDay,
    setDrinksPerDay,
    costPerItem,
    setCostPerItem,
    drinkVolume,
    setDrinkVolume,
    costPerDay,
    costPerWeek,
    costPerMonth,
    costPerYear,
    modalVisible,
    setModalVisible,
    errorType,
    setErrorType,
    handleDropdownChange,
    handleCalculate,
    handleReset,
    drinksPerDayRef,
    costPerItemRef,
    drinkVolumeRef,
  } = AlchoholCalculatorLogic();

  return (
    <SafeAreaView style={{ backgroundColor: '#171621', flex: 1 }}>
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

export default AlcohololCalculatorUI;
