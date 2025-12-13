import { theme } from '@/constants/theme'
import { type ReactNode } from 'react'
import { StyleSheet, View, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Typo } from '@/components/ui/Typo'

export type HeaderProps = {
  title?: string
  style?: ViewStyle
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Header({ title = '', leftIcon, rightIcon, style }: HeaderProps) {
  const { top } = useSafeAreaInsets()

  return (
    <View style={[styles.container, { paddingTop: top }, style]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
          {title ? (
            <View style={styles.titleContainer}>
              <Typo variant={theme.textVariants.title22} style={styles.title}>
                {title}
              </Typo>
            </View>
          ) : null}
        </View>

        {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 100,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 16,
  },
  leftIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
  },
  rightIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
