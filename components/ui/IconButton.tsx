import { theme } from "@/constants/theme";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { Icon, IconName } from "@/components/ui/Icon";

type IconButtonProps = {
  iconName: IconName;
  onPress: PressableProps["onPress"];
};

export function IconButton({ iconName, onPress }: IconButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={styles.button}
      >
        <Icon name={iconName} color="text" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.borderRadius.rounded,
    boxShadow: theme.boxShadows.primary,
  },
});