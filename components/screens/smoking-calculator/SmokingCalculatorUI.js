import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../common-calculator/calculatorStyle';
import SmokingCalculatorLogic from './SmokingCalculatorLogic';
import ErrorModal from '../../ErrorModal';

const SmokingCalculatorUI = () => {
  const {
    data,
    value,
    setValue,
    isFocus,
    setIsFocus,
    smokingType,
    setSmokingType,
    costText,
    setCostText,
    showPerPackInput,
    setShowPerPackInput,
    smokesPerDay,
    setSmokesPerDay,
    perDayText,
    setPerDayText,
    perPack,
    setPerPack,
    costPerItem,
    setCostPerItem,
    costPerDay,
    setCostPerDay,
    costPerWeek,
    setCostPerWeek,
    costPerMonth,
    setCostPerMonth,
    costPerYear,
    setCostPerYear,
    modalVisible,
    setModalVisible,
    errorType,
    setErrorType,
    handleDropdownChange,
    handleCalculate,
    handleReset,
    smokesPerDayRef,
    costPerItemRef,
    perPackRef,
    showCostContainer,
  } = SmokingCalculatorLogic();

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
      {showCostContainer && (
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
      )}
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

export default SmokingCalculatorUI;