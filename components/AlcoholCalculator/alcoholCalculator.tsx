import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../Button';
import { Colors } from '@/constants/Colors';

type AlcoholType = 'spirits' | 'cans';

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

  const renderResult = (type: AlcoholType, period: 'weekly' | 'monthly' | 'yearly') => (
    <Text style={styles.resultText}>
      {`${capitalizeFirstLetter(type)} ${capitalizeFirstLetter(period)}: ${results[type]?.[period]} liters`}
    </Text>
  );

  const handleDismiss = () => {
    Keyboard.dismiss();
    setIsDrinksInputFocused(false);
    setIsVolumeInputFocused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alcohol Calculator</Text>
      <View style={{ gap: 5, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
          What does this calculator do?
        </Text>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
          Calculate how much alcohol you consume in a Weekly - Monthly - Yearly bases
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          itemTextStyle={{ color: 'white' }}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={{
            backgroundColor: Colors.secondary,
            borderWidth: 0.2,
            borderRadius: 20,
            marginTop: 5,
            borderColor: 'grey',
          }}
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
              color={isFocus ? 'black' : 'black'}
              name="wine-bottle"
              size={20}
            />
          )}
        />
      </View>
      <View style={{ gap: 20 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.yinput}
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
              style={styles.yinput}
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
          {renderResult(value, 'weekly')}
          {renderResult(value, 'monthly')}
          {renderResult(value, 'yearly')}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
  },
  dropdown: {
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 8,
    backgroundColor: Colors.secondary,
    width: 300,
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
    color: 'white',
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
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 20,
    paddingHorizontal: 10,
    color: 'white',
  },
  customButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 20,
  },
  customText: {
    color: 'black',
    fontSize: 15,
  },
  results: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: 'white',
    marginVertical: 5,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: 20,
  },
  yinput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: 'white',
  },
  dismissIcon: {
    padding: 10,
  },
});

export default AlcoholCalculator;
