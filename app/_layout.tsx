import { colors } from '@/constants/theme'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { TripProvider } from '@/contexts/TripContext'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

function RootLayoutContent() {
  const { user } = useAuth()

  return (
    <>
      <StatusBar style="light" backgroundColor={colors.black} translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="index" />

        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)/sign-in" />
          <Stack.Screen name="(auth)/sign-up" />
        </Stack.Protected>

        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
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
