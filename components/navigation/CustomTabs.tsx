import { Icon, type IconName } from '@/components/ui/Icon'
import { theme } from '@/constants/theme'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

type TabConfig = {
  label: string
  icon: IconName
  iconFilled?: IconName
}

const TAB_CONFIG: Record<string, TabConfig> = {
  index: {
    label: 'Inicio',
    icon: 'Home-outline',
    iconFilled: 'Home-fill',
  },
  profile: {
    label: 'Perfil',
    icon: 'Person-outline',
    iconFilled: 'Person-fill',
  },
}

export function CustomTabs({ state, descriptors, navigation }: BottomTabBarProps) {

  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index
        const config = TAB_CONFIG[route.name]

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
          <TabItem
            key={route.name}
            label={config.label}
            iconName={isFocused && config.iconFilled ? config.iconFilled : config.icon}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
          />
        )
      })}
    </View>
  )
}

type TabItemProps = {
  label: string
  iconName: IconName
  isFocused: boolean
  onPress: () => void
  onLongPress: () => void
  accessibilityLabel?: string
  testID?: string
}

function TabItem({
  label,
  iconName,
  isFocused,
  onPress,
  onLongPress,
  accessibilityLabel,
  testID,
}: TabItemProps) {
  const scale = useSharedValue(0)

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, { duration: 350 })
  }, [isFocused, scale])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4])
    const top = interpolate(scale.value, [0, 1], [0, 8])

    return {
      transform: [{ scale: scaleValue }],
      top,
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])

    return {
      opacity,
    }
  })

  const color = isFocused ? theme.colors.primary : theme.colors.gray2

  return (
    <TouchableOpacity
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}>
      <Animated.View style={animatedIconStyle}>
        <Icon name={iconName} size={24} color={isFocused ? 'primary' : 'gray2'} />
      </Animated.View>

      <Animated.Text
        style={[
          {
            color,
            fontSize: 11,
          },
          animatedTextStyle,
        ]}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tabbar: {
    position: 'absolute', 
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: theme.borderRadius.rounded,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.gray1,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 12,
    shadowOpacity: 0.08,
    elevation: 8
  },
  tabbarItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  }
})
