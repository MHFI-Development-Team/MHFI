import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '@/constants/globalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default function Profile() {
  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text style={[globalStyles.text, styles.text]}>User Profile</Text>
    </View>
  );
}
