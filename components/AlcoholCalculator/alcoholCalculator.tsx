import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';
import { useProfile } from '../../contexts/ProfileContext';

import * as Haptics from 'expo-haptics';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const avgAlcoholPercentage = {
  spirits: 40, // average percentage of alcohol in spirits
  cans: 5, // average percentage of alcohol in cans
};

const AlcoholCalculator = () => {
  const { currency } = useProfile(); // Use the currency context
  const [value, setValue] = useState<AlcoholType>('spirits');
  const [isFocus, setIsFocus] = useState(false);
  const [drinksPerDay, setDrinksPerDay] = useState('');
  const [volumePerDrink, setVolumePerDrink] = useState('');
  const [results, setResults] = useState<Results>({});
  const [isDrinksInputFocused, setIsDrinksInputFocused] = useState(false);
  const [isVolumeInputFocused, setIsVolumeInputFocused] = useState(false);

  const calculateIntake = () => {
    Keyboard.dismiss();
    const drinksPerDayNum = parseFloat(drinksPerDay);
    const volumePerDrinkNum = parseFloat(volumePerDrink);
    const avgPercentage = avgAlcoholPercentage[value];

    let alcoholPerDayMl: number;
    if (value === 'cans') {
      alcoholPerDayMl = (drinksPerDayNum * volumePerDrinkNum * avgPercentage) / 100;
    } else {
      alcoholPerDayMl = (drinksPerDayNum * avgPercentage) / 100;
    }

    const calculate = (amountPerDay: number): CalculationResult => ({
      weekly: Math.round(amountPerDay * 7 * 100) / 100,
      monthly: Math.round(amountPerDay * 30 * 100) / 100,
      yearly: Math.round(amountPerDay * 365 * 100) / 100,
    });

    setResults(prevResults => ({
      ...prevResults,
      [value]: calculate(alcoholPerDayMl),
    }));
  };

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const renderResult = (type: AlcoholType, period: Period) => {
    const amount = results[type]?.[period] ?? 0; // Provide a default value of 0 if undefined
    return (
      <View style={styles.resultCard} key={period}>
        <Text style={styles.resultTitle}>{capitalizeFirstLetter(period)}</Text>
        <Text style={styles.resultValue}>
          {amount >= 1000 ? `${(amount / 1000).toFixed(2)} liters` : `${amount} ml`}
        </Text>
      </View>
    );
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    setIsDrinksInputFocused(false);
    setIsVolumeInputFocused(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Alcohol Calculator</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>What does this calculator do?</Text>
          <Text style={styles.descriptionText}>
            Calculate the average amount of alcohol you consume on a weekly, monthly, and yearly
            basis based on your input.
          </Text>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          itemTextStyle={{ color: 'white' }}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={styles.dropdownContainer}
          activeColor="#FF922E"
          data={data}
          autoScroll
          maxHeight={windowHeight * 0.3}
          minHeight={windowHeight * 0.1}
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
              size={windowHeight * 0.03}
            />
          )}
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Daily ${value} intake (ml)`}
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={drinksPerDay}
              onChangeText={setDrinksPerDay}
              onFocus={() => setIsDrinksInputFocused(true)}
              onBlur={() => setIsDrinksInputFocused(false)}
            />
            {isDrinksInputFocused && (
              <TouchableOpacity
              activeOpacity={0.8}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  handleDismiss();
                }}
                style={styles.dismissIcon}>
                <AntDesign
                  name="checkcircleo"
                  size={windowHeight * 0.03}
                  color={Colors.ButtonColor}
                />
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
                <TouchableOpacity
                activeOpacity={0.8}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    handleDismiss();
                  }}
                  style={styles.dismissIcon}>
                  <AntDesign
                    name="checkcircleo"
                    size={windowHeight * 0.03}
                    color={Colors.ButtonColor}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
        <TouchableOpacity
        activeOpacity={0.8}
          style={styles.calculateButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            calculateIntake();
          }}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
        {results[value] && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resultsContainer}>
            <View style={styles.results}>
              {['weekly', 'monthly', 'yearly'].map(period => renderResult(value, period as Period))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: '#24263B',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: windowHeight * 0.14,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  descriptionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  descriptionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  dropdown: {
    height: windowHeight * 0.06,
    borderRadius: windowHeight * 0.015,
    paddingHorizontal: windowWidth * 0.02,
    backgroundColor: Colors.secondary,
    width: '100%',
    marginBottom: windowHeight * 0.03,
  },
  dropdownContainer: {
    backgroundColor: Colors.secondary,
    borderWidth: 0.2,
    borderRadius: windowHeight * 0.015,
    marginTop: windowHeight * 0.01,
    borderColor: 'grey',
  },
  icon: {
    marginRight: windowWidth * 0.02,
  },
  placeholderStyle: {
    fontSize: windowHeight * 0.018,
    color: 'grey',
    fontWeight: '500',
  },
  selectedTextStyle: {
    fontSize: windowHeight * 0.018,
    color: 'white',
    fontWeight: '500',
  },
  inputsContainer: {
    width: '100%',
    marginBottom: windowHeight * 0.03,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderColor: 'gray',
    borderWidth: 0.2,
    borderRadius: windowHeight * 0.015,
    backgroundColor: Colors.secondary,
    marginBottom: windowHeight * 0.015,
  },
  input: {
    flex: 1,
    height: windowHeight * 0.06,
    paddingHorizontal: windowWidth * 0.025,
    color: 'white',
  },
  dismissIcon: {
    padding: windowHeight * 0.015,
  },
  calculateButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: windowWidth * 0.1,
    paddingVertical: windowHeight * 0.02,
    borderRadius: windowHeight * 0.015,
    marginTop: windowHeight * 0.02,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#0C0F14',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: windowHeight * 0.06,
  },
  results: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultCard: {
    backgroundColor: Colors.secondary,
    borderRadius: windowHeight * 0.015,
    padding: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.01,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: windowHeight * 0.022,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
  },
  resultValue: {
    fontSize: windowHeight * 0.02,
    color: 'white',
  },
});

export default AlcoholCalculator;
