import { colors, font } from '@/constants/theme'
import type { TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native'

export type TypoProps = {
  size?: number
  color?: string
  fontFamily?: TextStyle['fontFamily']
  children: any | null
  style?: TextStyle
  textProps?: TextProps
}

export function Typo({
  size,
  color = colors.text.primary,
  fontFamily = font.regular,
  children,
  style,
  textProps = {},
}: TypoProps) {
  const textStyle: TextStyle = {
    fontSize: size ? size : 18,
    color,
    fontFamily,
  }

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  )
}
