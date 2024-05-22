import { View, Text, StyleSheet, TextInput, Keyboard, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../Button';
import { Colors } from '@/constants/Colors';

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
    <Text style={styles.resultText}>
      {`${capitalizeFirstLetter(type)} ${formatLabel(period.toString())}${cost ? ' Cost' : ''}: ${results[type]?.[period]} ${cost ? '€' : ''}`}
    </Text>
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
    <View style={styles.container}>
      <Text style={styles.title}>Smoking Calculator</Text>
      <View style={{ gap: 5, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>
          What does this calculator do?
        </Text>
        <Text style={{ color: 'white', fontSize: 14, textAlign: 'center' }}>
          Calculate how much you smoke and its cost on a Weekly - Monthly - Yearly basis
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
              color={isFocus ? 'black' : 'black'}
              name="smoking"
              size={20}
            />
          )}
        />
      </View>
      <View style={{ gap: 20 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.yinput}
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
            style={styles.yinput}
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
              style={styles.yinput}
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

export default SmokingCalculator;
