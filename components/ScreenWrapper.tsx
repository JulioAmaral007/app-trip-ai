import { Dimensions, Platform, View, type ViewStyle } from "react-native";

import { colors } from "@/constants/theme";

const { height } = Dimensions.get("window");

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

export function ScreenWrapper({ style, children }: ScreenWrapperProps) {
  const paddingTop = Platform.OS === "ios" ? height * 0.06 : 30;
  return (
    <View
      style={[
        {
          paddingTop,
          flex: 1,
          backgroundColor: colors.background.primary,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
