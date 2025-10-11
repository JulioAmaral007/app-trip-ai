import { CustomTabs } from '@/components/CustomTabs'
import { colors } from '@/constants/theme'
import { Tabs } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AppLayout() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background.primary }}
      edges={['bottom']}>
      <Tabs tabBar={CustomTabs}>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  )
}
