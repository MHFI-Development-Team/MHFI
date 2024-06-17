// import AlcoholCalculator from '@/components/AlcoholCalculator/alcoholCalculator';
import { View } from 'react-native';
import globalStyles from '@/constants/globalStyles';
import GeoLocator from '@/components/GeoLocator/GeoLocator';

export default function feedScreen() {
  return (
    <View style={globalStyles.container}>
      <GeoLocator />
    </View>
  );
}
