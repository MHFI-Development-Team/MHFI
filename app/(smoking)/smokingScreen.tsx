import { View } from 'react-native';
import globalStyles from '@/constants/globalStyles';
import SmokingCalculator from '@/components/SmokingCalculator/smokingCalculator';

export default function SmokingLayout() {
  return (
    <View style={[globalStyles.container, { paddingHorizontal: 16 }]}>
      <SmokingCalculator />
    </View>
  );
}
