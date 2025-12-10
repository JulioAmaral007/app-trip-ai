import { colors, font } from '@/constants/theme'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as Icons from 'phosphor-react-native'
import { type ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabbarConfig: {
    [key: string]: {
      icon: (isFocused: boolean) => ReactNode
      label: string
    }
  } = {
    index: {
      icon: (isFocused: boolean) => (
        <Icons.House
          size={24}
          color={isFocused ? colors.primary : '#AAAAAA'}
          weight={isFocused ? 'fill' : 'regular'}
        />
      ),
      label: 'Início',
    },
    explore: {
      icon: (isFocused: boolean) => (
        <Icons.MagnifyingGlass
          size={24}
          color={isFocused ? colors.primary : '#AAAAAA'}
          weight={isFocused ? 'fill' : 'regular'}
        />
      ),
      label: 'Explorar',
    },
    profile: {
      icon: (isFocused: boolean) => (
        <Icons.User
          size={24}
          color={isFocused ? colors.primary : '#AAAAAA'}
          weight={isFocused ? 'fill' : 'regular'}
        />
      ),
      label: 'Perfil',
    },
  }

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const config = tabbarConfig[route.name]

        if (!config) return null

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
            {config.icon(isFocused)}
            <Text style={styles.tabbarLabel}>
              {config.label}
            </Text>
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
    height: 70,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  tabbarLabel: {
    fontSize: 12,
    fontFamily: font.regular,
    color: colors.gray2,
    marginTop: 2,
  },
})
