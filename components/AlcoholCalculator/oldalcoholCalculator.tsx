import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from 'react-native';
import Button from '../Button';
import { Colors } from '@/constants/Colors';
import { Vibration } from 'react-native';

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

const AlcoholCalculator = () => {
  const [alcoholType, setAlcoholType] = useState<AlcoholType>('spirits');
  const [drinksPerDay, setDrinksPerDay] = useState('');
  const [volumePerDrink, setVolumePerDrink] = useState('');
  const [results, setResults] = useState<Results>({});
  const [expanded, setExpanded] = useState(false);
  const [top, setTop] = useState(0);
  const buttonRef = useRef<View>(null);

  const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

  const onSelect = useCallback((item: OptionItem) => {
    setAlcoholType(item.value);
    setExpanded(false);
  }, []);

  const calculateIntake = () => {
    let alcoholPerDayLiters: number;
    if (alcoholType === 'cans') {
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
      [alcoholType]: calculate(alcoholPerDayLiters),
    }));
  };

  const data: OptionItem[] = [
    { label: 'Spirits', value: 'spirits' },
    { label: 'Cans', value: 'cans' },
  ];

  const capitalizeFirstLetter = (string: string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const renderResult = (type: AlcoholType, period: 'weekly' | 'monthly' | 'yearly') => (
    <Text style={styles.resultText}>
      {`${capitalizeFirstLetter(type)} ${capitalizeFirstLetter(period)}: ${results[type]?.[period]} liters`}
    </Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alcohol Calculator</Text>
      <View
        ref={buttonRef}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          const topOffset = layout.y;
          const heightOfComponent = layout.height;
          const finalValue = topOffset + heightOfComponent + (Platform.OS === 'android' ? -32 : 3);
          setTop(finalValue);
        }}>
        <TouchableOpacity activeOpacity={0.8} onPress={toggleExpanded}>
          <Text style={styles.text}>
            {alcoholType
              ? data.find(item => item.value === alcoholType)?.label
              : 'Select Alcohol Type'}
          </Text>
          <AntDesign name={expanded ? 'caretup' : 'caretdown'} />
        </TouchableOpacity>
        {expanded ? (
          <Modal visible={expanded} transparent>
            <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
              <View style={styles.backdrop}>
                <View
                  style={[
                    styles.options,
                    {
                      top,
                    },
                  ]}>
                  <FlatList
                    keyExtractor={item => item.value}
                    data={data}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.optionItem}
                        onPress={() => {{Vibration.vibrate(50);{() => onSelect(item)}}}}>
                        <Text style={styles.text}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        ) : null}
      </View>
      <TextInput
        style={styles.input}
        placeholder={`Daily ${alcoholType} intake (drinks)`}
        placeholderTextColor="gray"
        keyboardType="numeric"
        value={drinksPerDay}
        onChangeText={setDrinksPerDay}
      />
      {alcoholType === 'cans' && (
        <TextInput
          style={styles.input}
          placeholder="Volume per drink (ml)"
          placeholderTextColor="gray"
          keyboardType="numeric"
          value={volumePerDrink}
          onChangeText={setVolumePerDrink}
        />
      )}
      <Button
        title="Test"
        onPress={() => {{Vibration.vibrate(50);{calculateIntake}}}}
        style={styles.customButton}
        textStyle={styles.customText}
      />
      {results[alcoholType] && (
        <View style={styles.results}>
          {renderResult(alcoholType, 'weekly')}
          {renderResult(alcoholType, 'monthly')}
          {renderResult(alcoholType, 'yearly')}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  optionItem: {
    height: 40,
    justifyContent: 'center',
  },
  separator: {
    height: 4,
  },
  options: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    padding: 10,
    borderRadius: 6,
    maxHeight: 250,
  },
  text: {
    fontSize: 15,
    opacity: 0.8,
  },
  customButton: {
    backgroundColor: Colors.ButtonColor,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  customText: {
    color: 'black',
    fontSize: 15,
  },

  results: {},
  resultText: {},
  container: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  title: {},
  input: {},
});

export default AlcoholCalculator;
