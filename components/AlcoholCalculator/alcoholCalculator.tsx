import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../Button';
import { Colors } from '@/constants/Colors';

type AlcoholType = 'spirits' | 'cans';
type Period = 'weekly' | 'monthly' | 'yearly';

interface OptionItem {
  label: string;
  value: AlcoholType;
}

interface CalculationResult {
  weekly: number;
  monthly: number;
  yearly: number;
}

interface Results {
  spirits?: CalculationResult;
  cans?: CalculationResult;
}

const data: OptionItem[] = [
  { label: 'Spirits', value: 'spirits' },
  { label: 'Cans', value: 'cans' },
];

const AlcoholCalculator = () => {
  const [value, setValue] = useState<AlcoholType>('spirits');
  const [isFocus, setIsFocus] = useState(false);
  const [drinksPerDay, setDrinksPerDay] = useState('');
  const [volumePerDrink, setVolumePerDrink] = useState('');
  const [results, setResults] = useState<Results>({});
  const [isDrinksInputFocused, setIsDrinksInputFocused] = useState(false);
  const [isVolumeInputFocused, setIsVolumeInputFocused] = useState(false);

  const calculateIntake = () => {
    Keyboard.dismiss();
    let alcoholPerDayLiters: number;
    if (value === 'cans') {
      alcoholPerDayLiters = (parseFloat(drinksPerDay) * parseFloat(volumePerDrink)) / 1000;
    } else {
      alcoholPerDayLiters = parseFloat(drinksPerDay) / 1000;
    }

    const calculate = (amountPerDay: number): CalculationResult => ({
      weekly: Math.round(amountPerDay * 7 * 100) / 100,
      monthly: Math.round(amountPerDay * 30 * 100) / 100,
      yearly: Math.round(amountPerDay * 365 * 100) / 100,
    });

    setResults(prevResults => ({
      ...prevResults,
      [value]: calculate(alcoholPerDayLiters),
    }));
  };

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const renderResult = (type: AlcoholType, period: Period) => (
    <View style={styles.resultCard} key={period}>
      <Text style={styles.resultTitle}>{capitalizeFirstLetter(period)}</Text>
      <Text style={styles.resultValue}>{results[type]?.[period]} liters</Text>
    </View>
  );

  const handleDismiss = () => {
    Keyboard.dismiss();
    setIsDrinksInputFocused(false);
    setIsVolumeInputFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alcohol Calculator</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>What does this calculator do?</Text>
        <Text style={styles.descriptionText}>
          Calculate how much alcohol you consume on a Weekly, Monthly, and Yearly basis
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          itemTextStyle={{ color: 'white' }}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.dropdownContainer}
          activeColor="#FF922E"
          data={data}
          autoScroll
          maxHeight={300}
          minHeight={100}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Alcohol Type' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <FontAwesome6
              style={styles.icon}
              color={isFocus ? 'white' : 'white'}
              name="wine-bottle"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Daily ${value} intake (drinks)`}
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={drinksPerDay}
            onChangeText={setDrinksPerDay}
            onFocus={() => setIsDrinksInputFocused(true)}
            onBlur={() => setIsDrinksInputFocused(false)}
          />
          {isDrinksInputFocused && (
            <TouchableOpacity onPress={handleDismiss} style={styles.dismissIcon}>
              <AntDesign name="checkcircleo" size={20} color={Colors.ButtonColor} />
            </TouchableOpacity>
          )}
        </View>
        {value === 'cans' && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Volume per drink (ml)"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={volumePerDrink}
              onChangeText={setVolumePerDrink}
              onFocus={() => setIsVolumeInputFocused(true)}
              onBlur={() => setIsVolumeInputFocused(false)}
            />
            {isVolumeInputFocused && (
              <TouchableOpacity onPress={handleDismiss} style={styles.dismissIcon}>
                <AntDesign name="checkcircleo" size={20} color={Colors.ButtonColor} />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <Button
        title="Calculate"
        onPress={calculateIntake}
        style={styles.customButton}
        textStyle={styles.customText}
      />
      {results[value] && (
        <View style={styles.results}>
          {['weekly', 'monthly', 'yearly'].map(period => renderResult(value, period as Period))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: Colors.secondary,
    width: 300,
    marginBottom: 20,
  },
  dropdownContainer: {
    backgroundColor: Colors.secondary,
    borderWidth: 0.2,
    borderRadius: 20,
    marginTop: 5,
    borderColor: 'grey',
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  inputsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'white',
  },
  dismissIcon: {
    padding: 10,
  },
  customButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  customText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  results: {
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  resultCard: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: '90%',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  resultValue: {
    fontSize: 16,
    color: 'white',
  },
});

export default AlcoholCalculator;
