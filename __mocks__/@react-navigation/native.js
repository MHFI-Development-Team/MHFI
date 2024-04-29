jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
      }),
    };
  });

  jest.mock('react-native-svg', () => ({
  __esModule: true,
  default: 'Svg',
  Rect: 'Rect',
}));

  
  jest.mock('expo-splash-screen', () => ({
    preventAutoHideAsync: jest.fn(),
    hideAsync: jest.fn(),
  }));
  
  jest.mock('expo-font', () => ({
    loadAsync: jest.fn(),
  }));

  jest.mock('../../assets/svg/home-icon', () => 'HomeIcon');


jest.mock('expo-asset', () => {
    return {
    __esModule: true,
    default: 'Asset',
  };
});