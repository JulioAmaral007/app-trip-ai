import { theme } from "@/constants/theme";
import { Pressable, PressableProps, StyleSheet, View } from "react-native";
import { Icon, IconName } from "./Icon";
import { Typo } from "./Typo";

export type PillProps = {
  label: string;
  iconName: IconName;
  active: boolean;
  onPress?: PressableProps["onPress"];
};

/**
 * The height of the pill is the sum of the icon size, padding, and border width.
 * This is used to calculate the marginTop of the pill to center it vertically.
 */
export const PILL_HEIGHT = 16 + 16 + 4;

export function Pill({ label, iconName, active, onPress }: PillProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.box, active ? styles.boxActive : styles.boxInactive]}>
        <Icon name={iconName} size={16} color={active ? "primary" : "gray2"} />
        <Typo variant={theme.textVariants.text14}>
          {label}
        </Typo>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: theme.borderRadius.rounded,
    borderColor: theme.colors.gray1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  boxActive: {
    backgroundColor: theme.colors.gray2,
  },
  boxInactive: {
    backgroundColor: theme.colors.transparent,
  },
});