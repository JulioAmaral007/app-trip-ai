import { theme } from "@/constants/theme";
import { View } from "react-native";

export function Separator() {
  return (
    <View style={{ marginVertical: 24, marginHorizontal: 16 }}>
      <View style={{ height: 1, backgroundColor: theme.colors.gray2, width: "100%" }} />
    </View>
  );
}
