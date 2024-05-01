import React, { useState, useRef } from 'react';
import { Modal, Text, View, Pressable, Alert } from 'react-native';

const data = [
    { label: 'Cans', value: '1' },
    { label: 'Spirits', value: '2' },
  ];

const AlchoholCalculatorLogic = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [drinkType, setType] = useState('Default');
  const [drinkingTypeText, setDrinkingTypeText] = useState('......');
  const [costText, setCostText] = useState('......');
  const [amountText, setAmountText] = useState('......');
  const [drinksPerDay, setDrinksPerDay] = useState(0);
  const [costPerItem, setCostPerItem] = useState(0);
  const [drinkVolume, setDrinkVolume] = useState(0);
  const [costPerDay, setCostPerDay] = useState(0);
  const [costPerWeek, setCostPerWeek] = useState(0);
  const [costPerMonth, setCostPerMonth] = useState(0);
  const [costPerYear, setCostPerYear] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorType, setErrorType] = useState(null);

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

    if (drinkType === 'Default') {
      setModalVisible(true);
      setErrorType('selectDrinkType');
      return;
    }

    if (drinksPerDay === 0 || drinkVolume === 0 || costPerItem === 0) {
      setModalVisible(true);
      setErrorType('nullValues');
      handleReset();
      return;
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

    const costPerWeek = costPerDay * 7;
    const costPerMonth = costPerDay * 30;
    const costPerYear = costPerDay * 365;

    setCostPerDay(costPerDay.toFixed(2));
    setCostPerWeek(costPerWeek.toFixed(2));
    setCostPerMonth(costPerMonth.toFixed(2));
    setCostPerYear(costPerYear.toFixed(2));

    handleReset();
  };

  const handleReset = () => {
    setDrinksPerDay(0);
    setCostPerItem(0);
    setDrinkVolume(0);

      // Clear text inputs
       drinksPerDayRef.current.clear();
       costPerItemRef.current.clear();
       drinkVolumeRef.current.clear();
  };

  const drinksPerDayRef = useRef(null);
  const costPerItemRef = useRef(null);
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
    errorModal,
    handleCalculate,
    handleReset,
    drinksPerDayRef,
    costPerItemRef,
    drinkVolumeRef,
  };
};

export default AlchoholCalculatorLogic;
