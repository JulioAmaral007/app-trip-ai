import { AuthContext, AuthProvider } from '@/contexts/AuthContext'
import { TripProvider } from '@/contexts/TripContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { use } from 'react'

function RootLayoutContent() {
  const { isLoggedIn } = use(AuthContext)

  console.log(isLoggedIn)

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="index" />

        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)/index" />
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
  )
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <TripProvider>
        <RootLayoutContent />
      </TripProvider>
    </AuthProvider>
  )
}
