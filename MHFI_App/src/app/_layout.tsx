import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='index' options={{ title: 'Home'}}/>
            <Tabs.Screen name='dailyGoals' options={{ title: 'Daily Goals'}}/>
        </Tabs>
    );
}