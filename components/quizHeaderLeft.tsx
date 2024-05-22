import { Link } from 'expo-router';
import TabBarIcon from '@/components/navigation/TabBarIcon';
import { View, TouchableOpacity } from 'react-native';

const QuizHeader = () => (
  <TouchableOpacity>
    <Link href="/quizScreen">
      <View>
        <TabBarIcon name="leftcircleo" color="white" />
      </View>
    </Link>
  </TouchableOpacity>
);

export default QuizHeader;
