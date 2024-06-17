import { Stack } from 'expo-router';

export default function GeolocatorLayout() {
  return (
    <Stack>
      <Stack.Screen name="geoLocatorScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
