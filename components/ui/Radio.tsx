import { theme } from '@/constants/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface RadioProps {
  selected: boolean
  size?: number
  borderColor?: string
  backgroundColor?: string
}

export const Radio: React.FC<RadioProps> = ({
  selected,
  size = 20,
  borderColor = theme.colors.gray2,
  backgroundColor = theme.colors.pureWhite,
}) => {
  return (
    <View
      style={[
        styles.radio,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: borderColor,
          backgroundColor: selected ? backgroundColor : theme.colors.gray1,
        },
      ]}>
    </View>
  )
}

const styles = StyleSheet.create({
  radio: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
