import { colors } from '@/constants/theme'
import { AuthContext, AuthProvider } from '@/contexts/AuthContext'
import { TripProvider } from '@/contexts/TripContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { use } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function RootLayoutContent() {
  const authContext = use(AuthContext)
  const user = authContext?.user

  console.log(user)

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.background.primary} translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="index" />

        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)/index" />
          <Stack.Screen name="(auth)/login" />
        </Stack.Protected>

        <Stack.Protected guard={!!user}>
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
    <SafeAreaProvider>
      <AuthProvider>
        <TripProvider>
          <RootLayoutContent />
        </TripProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
