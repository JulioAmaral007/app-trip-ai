import { theme } from "@/constants/theme";
import { View } from "react-native";

export function BlackOpacity() {
  return (
    <View
      style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: theme.colors.background, opacity: 0.25 }}
    />
  );
}
