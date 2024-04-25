import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <Tabs>
            <Tabs.Screen name='HomeScreen' options={{ title: 'Home', headerShown: false}}/>
            <Tabs.Screen name='feedScreen' options={{ title: 'Feed'}}/>
            <Tabs.Screen name="index" options={{href: null}}/>
        </Tabs>
    );
}