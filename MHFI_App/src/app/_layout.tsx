import { Tabs } from "expo-router";


export default function RootLayout() {
    return (
        <Tabs screenOptions={{tabBarActiveTintColor: 'red'}}>
            <Tabs.Screen name='HomeScreen' options={{ title: 'Home', headerShown: false}}/>
            <Tabs.Screen name='feedScreen' options={{ title: 'Feed'}}/>
            <Tabs.Screen name='messageScreen' options={{ title: 'Message'}}/>
            <Tabs.Screen name="index" options={{href: null}}/>
        </Tabs>
    );
}