import { colors } from '@/constants/theme';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { ScreenWrapperProps } from './types';


export function ScreenWrapper({ children, scrollable}: ScreenWrapperProps) {
  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{ flex: 1, backgroundColor: colors.black, paddingHorizontal: 24 }}
      >
        <Container 
          style={scrollable ? undefined : { flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </Container>
      </View>
    </KeyboardAvoidingView>
  );
}
