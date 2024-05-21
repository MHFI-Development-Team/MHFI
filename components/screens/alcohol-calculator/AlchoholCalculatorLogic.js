import React, { useState, useRef } from 'react';
import { Modal, Text, View, Pressable, Alert, Keyboard } from 'react-native';

const data = [
  { label: 'Cans', value: '1' },
  { label: 'Spirits', value: '2' },
];

const AlcoholCalculatorLogic = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [drinkType, setType] = useState('Default');
  const [drinkingTypeText, setDrinkingTypeText] = useState('......');
  const [amountText, setAmountText] = useState('......');
  const [drinksPerDay, setDrinksPerDay] = useState(0);
  const [drinkVolume, setDrinkVolume] = useState(0);
  const [alcoholPerDay, setAlcoholPerDay] = useState(0); // in liters
  const [alcoholPerWeek, setAlcoholPerWeek] = useState(0); // in liters
  const [alcoholPerMonth, setAlcoholPerMonth] = useState(0); // in liters
  const [alcoholPerYear, setAlcoholPerYear] = useState(0); // in liters
  const [modalVisible, setModalVisible] = useState(false);
  const [errorType, setErrorType] = useState(null);
  const [showCostContainer, setShowCostContainer] = useState(false);
  const [showCanSize, setShowCanSize] = useState(false); // State to show/hide per pack input

  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setIsFocus(false);

    switch (itemValue) {
      case '1':
        setDrinkingTypeText('Cans consumed per day?');
        setAmountText('ml per can?');
        setType('Cans');
        setShowCostContainer(false);
        setShowCanSize(true);
        break;
      case '2':
        setDrinkingTypeText('Volume consumed per day (ml)?');
        setAmountText('Volume per bottle (ml)?');
        setType('Spirits');
        setShowCostContainer(false);
        setShowCanSize(false);
        break;
      default:
        setType('Default');
        setShowCostContainer(false);
    }

    handleReset();
  };

  const errorModal = () => {
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

  const handleCalculate = () => {
    setErrorType(null);

    Keyboard.dismiss();

    if (drinkType === 'Default') {
      setModalVisible(true);
      setErrorType('selectDrinkType');
      return;
    }

    if ((drinkType === 'cans') && (drinksPerDay === 0 || drinkVolume === 0)) {
      setModalVisible(true);
      setErrorType('nullValues');
      handleReset();
      return;
    }

    if ((drinkType === 'spirits') && (drinksPerDay === 0)) {
      setModalVisible(true);
      setErrorType('nullValues');
      handleReset();
      return; // Exit the function early
    }
    let alcoholPerDay = 0; // in milliliters

    switch (drinkType) {
      case 'Cans':
        alcoholPerDay = drinksPerDay * drinkVolume; // milliliters
        break;
      case 'Spirits':
        alcoholPerDay =  drinksPerDay; // milliliters
        break;
      default:
        break;
    }

    // Convert milliliters to liters
    const alcoholPerDayLiters = alcoholPerDay / 1000;
    const alcoholPerWeek = Math.round(alcoholPerDayLiters * 7 * 100) / 100; // in liters
    const alcoholPerMonth = Math.round(alcoholPerDayLiters * 30 * 100) / 100; // in liters
    const alcoholPerYear = Math.round(alcoholPerDayLiters * 365 * 100) / 100; // in liters

    setAlcoholPerDay(Math.round(alcoholPerDayLiters * 100) / 100); // in liters
    setAlcoholPerWeek(alcoholPerWeek); // in liters
    setAlcoholPerMonth(alcoholPerMonth); // in liters
    setAlcoholPerYear(alcoholPerYear); // in liters

    handleReset();
    setShowCostContainer(true);
  };

  const handleReset = () => {
    setDrinksPerDay(0);
    setDrinkVolume(0);
    setShowCostContainer(false);

    // Clear text inputs
    drinksPerDayRef.current.clear();
    if(showCanSize){
      drinkVolumeRef.current.clear();
    }
  };

  const drinksPerDayRef = useRef(null);
  const drinkVolumeRef = useRef(null);

  // Expose state variables and functions for use in UI
  return {
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
    errorType,
    setErrorType,
    handleDropdownChange,
    errorModal,
    handleCalculate,
    handleReset,
    drinksPerDayRef,
    drinkVolumeRef,
    showCostContainer,
    showCanSize
  };
};

export default AlcoholCalculatorLogic;
