import { theme } from '@/constants/theme'
import { StyleSheet, type ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type ModalWrapperProps = {
  style?: ViewStyle
  children: React.ReactNode
  bg?: string
}

export function ModalWrapper({
  style,
  children,
  bg = theme.colors.gray1,
}: ModalWrapperProps) { 
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bg }, style && style]}>
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
