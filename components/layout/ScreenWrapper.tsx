import { theme } from '@/constants/theme';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { ScreenWrapperProps } from '@/components/types';


export function ScreenWrapper({style, children, scrollable}: ScreenWrapperProps) {
  const Container = scrollable ? ScrollView : View;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{ flex: 1, backgroundColor: theme.colors.background, paddingHorizontal: 24, ...style }}
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
