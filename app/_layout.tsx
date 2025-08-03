import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const isLoggedIn = true;

export default function RootLayout() {
  return (
    <>
      <StatusBar style="inverted" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="index" />

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={isLoggedIn}>
          <Stack.Screen name="(tabs)" />
          {/* <Stack.Screen name="travelers" />
          <Stack.Screen name="dates" />
          <Stack.Screen name="budget" />
          <Stack.Screen name="interests" />
          <Stack.Screen name="review" />
          <Stack.Screen name="generating" />
          <Stack.Screen name="home" /> */}
        </Stack.Protected>
      </Stack>
    </>
  );
}
