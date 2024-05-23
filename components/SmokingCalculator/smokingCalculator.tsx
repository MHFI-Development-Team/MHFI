import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../Button';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type SmokingType = 'cigarettes' | 'cigars' | 'rollies' | 'pipes';

interface OptionItem {
  label: string;
  value: SmokingType;
}

interface CalculationResult {
  weekly: number;
  monthly: number;
  yearly: number;
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
  const [smokesPerDay, setSmokesPerDay] = useState('');
  const [costPerPack, setCostPerPack] = useState('');
  const [smokesPerPack, setSmokesPerPack] = useState('');
  const [results, setResults] = useState<Results>({});
  const [isSmokesInputFocused, setIsSmokesInputFocused] = useState(false);
  const [isCostInputFocused, setIsCostInputFocused] = useState(false);
  const [isPackInputFocused, setIsPackInputFocused] = useState(false);

  const calculateIntake = () => {
    const dailySmokes = parseFloat(smokesPerDay);
    const packCost = parseFloat(costPerPack);
    const smokesInPack = parseFloat(smokesPerPack);
    let costPerWeek: number;
    let costPerMonth: number;
    let costPerYear: number;
    let costOver5years: number;

    if (value === 'cigarettes') {
      costPerWeek = Math.round((7 * packCost * dailySmokes) / 20);
      costPerMonth = Math.round((364 * packCost * dailySmokes) / 240);
      costPerYear = Math.round((365 * packCost * dailySmokes) / 20);
      costOver5years = Math.round((5 * 365 * packCost * dailySmokes) / 20);
    } else {
      costPerWeek = Math.round((7 * packCost * dailySmokes) / smokesInPack);
      costPerMonth = Math.round((365 * packCost * dailySmokes) / (12 * smokesInPack));
      costPerYear = Math.round((365 * packCost * dailySmokes) / smokesInPack);
      costOver5years = Math.round((5 * 365 * packCost * dailySmokes) / smokesInPack);
    }

    const calculate = (): CalculationResult => ({
      weekly: Math.round(dailySmokes * 7 * 100) / 100,
      monthly: Math.round(dailySmokes * 30 * 100) / 100,
      yearly: Math.round(dailySmokes * 365 * 100) / 100,
      costPerWeek,
      costPerMonth,
      costPerYear,
      costOver5years,
    });

    setResults(prevResults => ({
      ...prevResults,
      [value]: calculate(),
    }));
  };

  const formatLabel = (label: string) => {
    return label
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .replace(/(\d+)([A-Z])/g, '$1 $2')
      .trim();
  };

  const renderResult = (
    type: SmokingType,
    period: keyof CalculationResult,
    cost: boolean = false
  ) => (
    <View style={styles.resultCard} key={period}>
      <Text style={styles.resultTitle}>
        {capitalizeFirstLetter(formatLabel(period.toString()))}
        {cost ? ' Cost' : ''}
      </Text>
      <Text style={styles.resultValue}>
        {results[type]?.[period]}
        {cost ? ' €' : ' units'}
      </Text>
    </View>
  );

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const handleDismiss = () => {
    Keyboard.dismiss();
    setIsSmokesInputFocused(false);
    setIsCostInputFocused(false);
    setIsPackInputFocused(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Smoking Calculator</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>What does this calculator do?</Text>
        <Text style={styles.descriptionText}>
          Calculate how much you smoke and its cost on a Weekly, Monthly, and Yearly basis
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
          placeholder={!isFocus ? 'Select Smoking Type' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <MaterialCommunityIcons
              style={styles.icon}
              color={isFocus ? 'white' : 'white'}
              name="smoke"
              size={20}
            />
          )}
        />
      </View>
      <View style={styles.inputsContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Daily ${value} intake`}
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={smokesPerDay}
            onChangeText={setSmokesPerDay}
            onFocus={() => setIsSmokesInputFocused(true)}
            onBlur={() => setIsSmokesInputFocused(false)}
          />
          {isSmokesInputFocused && (
            <TouchableOpacity onPress={handleDismiss} style={styles.dismissIcon}>
              <AntDesign name="checkcircleo" size={20} color={Colors.ButtonColor} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Cost per ${value === 'cigarettes' ? 'pack' : 'unit'}`}
            placeholderTextColor="gray"
            keyboardType="numeric"
            value={costPerPack}
            onChangeText={setCostPerPack}
            onFocus={() => setIsCostInputFocused(true)}
            onBlur={() => setIsCostInputFocused(false)}
          />
          {isCostInputFocused && (
            <TouchableOpacity onPress={handleDismiss} style={styles.dismissIcon}>
              <AntDesign name="checkcircleo" size={20} color={Colors.ButtonColor} />
            </TouchableOpacity>
          )}
        </View>
        {(value === 'cigars' || value === 'rollies' || value === 'pipes') && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Units per pack"
              placeholderTextColor="gray"
              keyboardType="numeric"
              value={smokesPerPack}
              onChangeText={setSmokesPerPack}
              onFocus={() => setIsPackInputFocused(true)}
              onBlur={() => setIsPackInputFocused(false)}
            />
            {isPackInputFocused && (
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
          {renderResult(value, 'costPerWeek', true)}
          {renderResult(value, 'costPerMonth', true)}
          {renderResult(value, 'costPerYear', true)}
          {renderResult(value, 'costOver5years', true)}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    flexGrow: 1,
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

export default SmokingCalculator;
