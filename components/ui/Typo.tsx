import { theme } from '@/constants/theme'
import type { TextProps, TextStyle } from 'react-native'
import { Text } from 'react-native'

type TextVariant = {
  fontSize?: number
  fontFamily?: string
  lineHeight?: number
  color?: string
}

export type TypoProps = {
  variant?: TextVariant
  color?: string
  children: any | null
  style?: TextStyle
  textProps?: TextProps
}

export function Typo({
  variant = theme.textVariants.defaults,
  color,
  children,
  style,
  textProps = {},
}: TypoProps) {
  const finalColor = color || variant.color || theme.textVariants.defaults.color
  
  const textStyle: TextStyle = {
    fontSize: variant.fontSize || theme.textVariants.defaults.fontSize,
    color: finalColor,
    fontFamily: variant.fontFamily || theme.textVariants.defaults.fontFamily,
    lineHeight: variant.lineHeight || theme.textVariants.defaults.lineHeight,
  }

  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  )
}
