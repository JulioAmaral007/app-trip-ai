import { colors } from '@/constants/theme'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface RadioProps {
  selected: boolean
  size?: number
  innerSize?: number
  borderColor?: string
  selectedBorderColor?: string
  innerColor?: string
}

export const Radio: React.FC<RadioProps> = ({
  selected,
  size = 20,
  innerSize = 8,
  borderColor = colors.primary,
  selectedBorderColor = colors.primary,
  innerColor = colors.primary,
}) => {
  return (
    <View
      style={[
        styles.radio,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: selected ? selectedBorderColor : borderColor,
        },
      ]}>
      {selected && (
        <View
          style={[
            styles.radioInner,
            {
              width: innerSize,
              height: innerSize,
              borderRadius: innerSize / 2,
              backgroundColor: innerColor,
            },
          ]}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  radio: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
  },
})
