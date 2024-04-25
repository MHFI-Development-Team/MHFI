import { Stack } from 'expo-router';
import { View, Text } from 'react-native';

export default function dailyGoalScreen() {
    return (
        <View>
            <Stack.Screen options={{title: 'Daily Goals'}} />
            <Text>Daily Goal</Text>
        </View>
    );
}