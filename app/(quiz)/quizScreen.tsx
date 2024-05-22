import { View } from 'react-native';
import globalStyles from '@/constants/globalStyles';
import Quiz from '@/components/Quiz/quiz';

export default function FeedScreen() {
  return (
    <View style={[globalStyles.container, { paddingHorizontal: 16 }]}>
      <Quiz />
    </View>
  );
}
