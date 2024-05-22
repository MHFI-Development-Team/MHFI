import AlcoholCalculator from '@/components/AlcoholCalculator/alcoholCalculator';
import { View } from 'react-native';
import globalStyles from '@/constants/globalStyles';

export default function feedScreen() {
  return (
    <View style={globalStyles.container}>
      <AlcoholCalculator />
    </View>
  );
}
