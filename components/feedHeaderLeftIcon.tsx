import { Link } from 'expo-router';
import TabBarIcon from '@/components/Navigation/TabBarIcon';
import { View, TouchableOpacity } from 'react-native';

import * as Haptics from 'expo-haptics';

const feedHeaderLeftIcon = () => (
  <TouchableOpacity
  activeOpacity={0.8}
    onPress={() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }}>
    <Link href="/feedScreen">
      <View>
        <TabBarIcon name="leftcircleo" color="white" />
      </View>
    </Link>
  </TouchableOpacity>
);

export default feedHeaderLeftIcon;
