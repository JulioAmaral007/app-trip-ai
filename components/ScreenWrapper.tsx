import { colors } from '@/constants/theme'
import { type ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type ScreenWrapperProps = {
  style?: ViewStyle
  children: React.ReactNode
}

export function ScreenWrapper({ style, children }: ScreenWrapperProps) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.black,
        },
        style,
      ]}> 
      {children}
    </SafeAreaView>
  )
}
