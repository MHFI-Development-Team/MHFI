import { Keyboard } from "react-native";
import { useState, useRef } from 'react';

// Data for dropdown options
const data = [
  { label: 'Cigarettes', value: '1' },
  { label: 'Rollies', value: '2' },
  { label: 'Vapes', value: '3' },
  { label: 'Cigars', value: '4' },
];

const SmokingCalculatorLogic = () => {
  // States
  const [value, setValue] = useState(null); // State for selected dropdown value
  const [isFocus, setIsFocus] = useState(false); // State to track focus on dropdown
  const [smokingType, setSmokingType] = useState('Default'); // State for selected smoking type
  const [costText, setCostText] = useState('......'); // Placeholder text for cost input
  const [showPerPackInput, setShowPerPackInput] = useState(false); // State to show/hide per pack input
  const [smokesPerDay, setSmokesPerDay] = useState(0); // State for number of smokes per day
  const [perDayText, setPerDayText] = useState('......'); // Placeholder text for smokes per day input
  const [perPack, setPerPack] = useState(0); // State for number of items per pack
  const [costPerItem, setCostPerItem] = useState(0); // State for cost per item
  const [costPerDay, setCostPerDay] = useState(0); // State for cost per day
  const [costPerWeek, setCostPerWeek] = useState(0); // State for cost per week
  const [costPerMonth, setCostPerMonth] = useState(0); // State for cost per month
  const [costPerYear, setCostPerYear] = useState(0); // State for cost per year
  const [modalVisible, setModalVisible] = useState(false); // State for error modal visibility
  const [errorType, setErrorType] = useState(null); // State to track the type of error
  const [showCostContainer, setShowCostContainer] = useState(false);

  const smokesPerDayRef = useRef(null);
  const costPerItemRef = useRef(null);
  const perPackRef = useRef(null);
  
  // Function to handle dropdown change
  const handleDropdownChange = (itemValue) => {
    setValue(itemValue);
    setIsFocus(false);
    
     // Update smoking type, costStyle text, and placeholder text based on selected value
    switch (itemValue) {
      case '1':
        setSmokingType('smokes');
        setCostText('Cost per pack of 20?');
        setPerDayText('Cigarettes per day?');
        setShowPerPackInput(false);
        setShowCostContainer(false); 
        break;
      case '2':
        setSmokingType('rollies');
        setCostText('Cost per tobacco pouch');
        setPerDayText('Rollies per day?');
        setShowPerPackInput(true);
        setShowCostContainer(false); 
        break;
      case '3':
        setSmokingType('vapes');
        setCostText('Cost per vape?');
        setPerDayText('Vapes per day?');
        setShowPerPackInput(false);
        setShowCostContainer(false); 
        break;
      case '4':
        setSmokingType('cigars');
        setCostText('Cost per pack?');
        setPerDayText('Cigars per day?');
        setShowPerPackInput(true);
        setShowCostContainer(false); 
        break;
      default:
        setSmokingType('Default');
        setShowCostContainer(false); 
    }
    handleReset();
  };

  // Function to handle calculate button press
  const handleCalculate = () => {
    Keyboard.dismiss();

    setErrorType(null);

    // Validation checks
    if (smokingType === 'Default') {
      setModalVisible(true);
      setErrorType('selectSmokeType');
      return; // Exit the function early
    }

    if (smokingType !== 'cigarettes' && smokingType !== 'vapes' && (smokesPerDay === 0 || costPerItem === 0)) {
      setModalVisible(true);
      setErrorType('nullValues');
      handleReset();
      return; // Exit the function early
    }
  
    // For rollies and cigars, also check if perPack is provided
    if ((smokingType === 'rollies' || smokingType === 'cigars') && (smokesPerDay === 0 || costPerItem === 0 || perPack === 0)) {
      setModalVisible(true);
      setErrorType('nullValues');
      handleReset();
      return; // Exit the function early
    }

    // Calculate costs based on smoking type
    let costPerDay = 0;
    let costPerCig = 0;

    switch(smokingType) {
      case 'smokes':
        costPerCig = costPerItem / 20;
        costPerDay = costPerCig * smokesPerDay;
        break;
      case 'vapes':
        costPerDay = costPerItem * smokesPerDay;
        break;
      case 'rollies':
      case 'cigars':
        costPerDay = (costPerItem / perPack) * smokesPerDay;
        break;
      default:
        break;
    }

    // Calculate costs for week, month, and year
    const costPerWeek = Math.round(costPerDay * 7); 
    const costPerMonth = Math.round(costPerDay * 30); 
    const costPerYear = Math.round(costPerDay * 365); 

    // Update state with calculated costs
    setCostPerDay(Math.round(costPerDay));
    setCostPerWeek(costPerWeek);
    setCostPerMonth(costPerMonth);
    setCostPerYear(costPerYear);

    handleReset();
    setShowCostContainer(true);
  };

  // Function to handle reset button press
  const handleReset = () => {
    // Reset state variables
    setSmokesPerDay(0);
    setPerPack(0);
    setCostPerItem(0);
    setShowCostContainer(false);

    // Clear text inputs
    smokesPerDayRef.current.clear();
    costPerItemRef.current.clear();   
    if(showPerPackInput){
      perPackRef.current.clear();
    }
  }
    return {
        data,
        value,
        setValue,
        isFocus,
        setIsFocus,
        smokingType,
        setSmokingType,
        costText,
        setCostText,
        showPerPackInput,
        setShowPerPackInput,
        smokesPerDay,
        setSmokesPerDay,
        perDayText,
        setPerDayText,
        perPack,
        setPerPack,
        costPerItem,
        setCostPerItem,
        costPerDay,
        setCostPerDay,
        costPerWeek,
        setCostPerWeek,
        costPerMonth,
        setCostPerMonth,
        costPerYear,
        setCostPerYear,
        modalVisible,
        setModalVisible,
        errorType,
        setErrorType,
        handleDropdownChange,
        handleCalculate,
        handleReset,
        smokesPerDayRef,
        costPerItemRef,
        perPackRef,
        showCostContainer,
      };
  };
  export default SmokingCalculatorLogic;