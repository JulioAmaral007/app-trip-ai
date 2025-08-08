import { colors } from '@/constants/theme'
import React from 'react'
import {
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native'

export interface InputProps extends TextInputProps {
  icon?: React.ReactNode
  containerStyle?: ViewStyle
  inputStyle?: TextStyle
  inputRef?: React.RefObject<TextInput>
  //   label?: string;
  //   error?: string;
}

export function Input(props: InputProps) {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.text.secondary}
        ref={props.inputRef}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.primary,
    borderRadius: 17,
    borderCurve: 'continuous',
    paddingHorizontal: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: 14,
  },
})
