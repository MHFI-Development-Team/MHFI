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
import { useProfile } from '../ProfileContext';
import * as Haptics from 'expo-haptics';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type SmokingType = 'cigarettes' | 'cigars' | 'rollies' | 'pipes';
type CostPeriod = 'costPerWeek' | 'costPerMonth' | 'costPerYear' | 'costOver5years';

interface OptionItem {
  label: string;
  value: SmokingType;
}

interface CalculationResult {
  costPerWeek: number;
  costPerMonth: number;
  costPerYear: number;
  costOver5years: number;
}

interface Results {
  cigarettes?: CalculationResult;
  cigars?: CalculationResult;
  rollies?: CalculationResult;
  pipes?: CalculationResult;
}

const data: OptionItem[] = [
  { label: 'Cigarettes', value: 'cigarettes' },
  { label: 'Cigars', value: 'cigars' },
  { label: 'Rollies', value: 'rollies' },
  { label: 'Pipes', value: 'pipes' },
];

const SmokingCalculator = () => {
  const [value, setValue] = useState<SmokingType>('cigarettes');
  const [isFocus, setIsFocus] = useState(false);
  const [packsPerDay, setPacksPerDay] = useState('');
  const [costPerPack, setCostPerPack] = useState('');
  const [results, setResults] = useState<Results>({});
  const [isPacksInputFocused, setIsPacksInputFocused] = useState(false);
  const [isCostInputFocused, setIsCostInputFocused] = useState(false);
  const { currency } = useProfile();

  const calculateCost = () => {
    Keyboard.dismiss();
    const dailyPacks = parseFloat(packsPerDay);
    const packCost = parseFloat(costPerPack);

    const costPerDay = dailyPacks * packCost;
    const costPerWeek = costPerDay * 7;
    const costPerMonth = costPerDay * 30;
    const costPerYear = costPerDay * 365;
    const costOver5years = costPerYear * 5;

    const calculate = (): CalculationResult => ({
      costPerWeek: Math.round(costPerWeek * 100) / 100,
      costPerMonth: Math.round(costPerMonth * 100) / 100,
      costPerYear: Math.round(costPerYear * 100) / 100,
      costOver5years: Math.round(costOver5years * 100) / 100,
    });

    setResults(prevResults => ({
      ...prevResults,
      [value]: calculate(),
    }));
  };

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: currency === '£' ? 'GBP' : 'EUR',
    }).format(amount);
  };

  const renderResult = (type: SmokingType, period: CostPeriod) => {
    const amount = results[type]?.[period] ?? 0; // Provide a default value of 0 if undefined
    let periodLabel = period
      .replace('costPer', 'Cost Per ')
      .replace(/([A-Z])/g, ' $1')
      .trim();

    if (period === 'costOver5years') {
      periodLabel = 'Cost Over 5 Years';
    }

    return (
      <View style={styles.resultCard} key={period}>
        <Text style={styles.resultTitle}>{capitalizeFirstLetter(periodLabel)}</Text>
        <Text style={styles.resultValue}>{formatCurrency(amount)}</Text>
      </View>
    );
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    setIsPacksInputFocused(false);
    setIsCostInputFocused(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Smoking Calculator</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>What does this calculator do?</Text>
          <Text style={styles.descriptionText}>
            Calculate the cost of your smoking habit on a weekly, monthly, and yearly basis based on
            your input.
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
          placeholder={!isFocus ? 'Select Smoking Type' : '...'}
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
              name="smoking"
              size={windowHeight * 0.03}
            />
          )}
        />
        <View style={styles.inputsContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Packs per day"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={packsPerDay}
              onChangeText={setPacksPerDay}
              onFocus={() => setIsPacksInputFocused(true)}
              onBlur={() => setIsPacksInputFocused(false)}
            />
            {isPacksInputFocused && (
              <TouchableOpacity
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
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Cost per pack (${currency})`}
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={costPerPack}
              onChangeText={setCostPerPack}
              onFocus={() => setIsCostInputFocused(true)}
              onBlur={() => setIsCostInputFocused(false)}
            />
            {isCostInputFocused && (
              <TouchableOpacity
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
        </View>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            calculateCost();
          }}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
        {results[value] && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.resultsContainer}
            style={{ overflow: 'visible' }}>
            <View style={styles.results}>
              {['costPerWeek', 'costPerMonth', 'costPerYear', 'costOver5years'].map(period =>
                renderResult(value, period as CostPeriod)
              )}
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
    marginTop: windowHeight * 0.08,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: 24,
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
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#0C0F14',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsContainer: {
    marginTop: windowHeight * 0.02,
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

export default SmokingCalculator;
