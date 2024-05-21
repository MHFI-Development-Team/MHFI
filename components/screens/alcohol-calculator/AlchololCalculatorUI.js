import React from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AlcoholCalculatorLogic from './AlchoholCalculatorLogic';
import styles from '../common-calculator/calculatorStyle';
import ErrorModal from '../../ErrorModal';

const AlcoholCalculatorUI = () => {
  const {
    data,
    value,
    setValue,
    isFocus,
    setIsFocus,
    drinkingTypeText,
    setDrinkingTypeText,
    amountText,
    setAmountText,
    drinksPerDay,
    setDrinksPerDay,
    drinkVolume,
    setDrinkVolume,
    alcoholPerDay,
    alcoholPerWeek,
    alcoholPerMonth,
    alcoholPerYear,
    modalVisible,
    setModalVisible,
    handleDropdownChange,
    handleCalculate,
    handleReset,
    drinksPerDayRef,
    drinkVolumeRef,
    showCostContainer,
    showCanSize,
  } = AlcoholCalculatorLogic();

  return (
    <SafeAreaView style={{ backgroundColor: '#171621', flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.titleBox}>
          <Text style={styles.title}>Calculate your alcohol consumption</Text> 
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>What are you drinking?</Text>
          </View>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={{color: 'white'}}
            data={data}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => handleDropdownChange(item.value)}
          />
          <View style={styles.textContainer}>
            <Text style={styles.dynamicText}>{drinkingTypeText}</Text>
          </View>
          <TextInput
            ref={drinksPerDayRef}
            style={styles.inputStyle}
            keyboardType="numeric"
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, '').replace('-', '');
              setDrinksPerDay(parseInt(text));
            }}
          />
          {showCanSize && (
            <>
          <View style={styles.textContainer}>
            <Text style={styles.dynamicText}>{amountText}</Text>
          </View>
          <TextInput
            ref={drinkVolumeRef}
            style={styles.inputStyle}
            keyboardType="numeric"
            onChangeText={(text) => {
              text = text.replace(/[^0-9]/g, '').replace('-', '');
              setDrinkVolume(parseInt(text));
            }}
            />
          </>
        )}
        </View>
        <View style={styles.buttonsRow}>
          <TouchableOpacity activeOpacity={0.5} style={styles.resetBtn} onPress={handleReset}>
            <Text style={styles.calculateText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.calculateBtn} onPress={handleCalculate}>
            <Text style={styles.calculateText}>Calculate Consumption</Text> 
          </TouchableOpacity>
        </View>
        {showCostContainer && (
          <View style={styles.costContainer}>
            <View style={styles.costTextContainer}>
              <Text style={styles.costTextStyle}>Per Day</Text>
              <Text style={styles.costStyle}>{alcoholPerDay} ml</Text> 
            </View>
            <View style={styles.costTextContainer}>
              <Text style={styles.costTextStyle}>Per Week</Text>
              <Text style={styles.costStyle}>{alcoholPerWeek} ml</Text>
            </View>
            <View style={styles.costTextContainer}>
              <Text style={styles.costTextStyle}>Per Month</Text>
              <Text style={styles.costStyle}>{alcoholPerMonth} ml</Text> 
            </View>
            <View style={styles.costTextContainer}>
              <Text style={styles.costTextStyle}>Per Year</Text>
              <Text style={styles.costStyle}>{alcoholPerYear} ml</Text> 
            </View>
          </View>
        )}
        <ErrorModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export default AlcoholCalculatorUI;
