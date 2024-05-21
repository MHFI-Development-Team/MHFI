import AlcoholCalculator from '@/components/AlcoholCalculator/alcoholCalculator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function feedScreen() {
  return (
    <SafeAreaView>
      <AlcoholCalculator />
    </SafeAreaView>
  );
}
