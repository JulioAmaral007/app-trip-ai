import { colors } from '@/constants/theme'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as Icons from 'phosphor-react-native'
import { type ReactNode } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabbarIcons: { [key: string]: (isFocused: boolean) => ReactNode } = {
    index: (isFocused: boolean) => (
      <Icons.Island
        size={28}
        color={isFocused ? colors.primary.orange : colors.text.primary}
        weight={isFocused ? 'fill' : 'regular'}
      />
    ),
    profile: (isFocused: boolean) => (
      <Icons.User
        size={28}
        color={isFocused ? colors.primary.orange : colors.text.primary}
        weight={isFocused ? 'fill' : 'regular'}
      />
    ),
  }

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}>
            {tabbarIcons[route.name] && tabbarIcons[route.name](isFocused)}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: colors.background.primary,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: colors.border.primary,
    borderTopWidth: 1,
  },
  tabbarItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
})
