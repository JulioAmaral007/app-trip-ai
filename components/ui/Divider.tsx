import { theme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";

export function Divider() {
  return (
    <View style={styles.divider}>
      <View style={styles.dividerLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    paddingHorizontal: 16,
    alignSelf: 'center',
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray1,
  },
  dividerLine: {
    alignSelf: 'center',
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray1,
  },
});