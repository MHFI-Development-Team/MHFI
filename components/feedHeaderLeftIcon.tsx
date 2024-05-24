import { Link } from 'expo-router';
import TabBarIcon from '@/components/Navigation/TabBarIcon';
import { View, TouchableOpacity } from 'react-native';

const feedHeaderLeftIcon = () => (
  <TouchableOpacity>
    <Link href="/feedScreen">
      <View>
        <TabBarIcon name="leftcircleo" color="white" />
      </View>
    </Link>
  </TouchableOpacity>
);

export default feedHeaderLeftIcon;
