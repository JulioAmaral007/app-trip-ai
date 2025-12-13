import { ActivityIndicator, type ActivityIndicatorProps, View } from 'react-native'

import { theme } from '@/constants/theme'

export type LoadingProps = ActivityIndicatorProps

export function Loading({ size = 'large', color = theme.colors.text }: ActivityIndicatorProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size={size} color={color} />
    </View>
  )
}
