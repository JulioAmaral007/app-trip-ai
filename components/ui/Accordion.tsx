import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Typo } from "@/components/ui/Typo";

type AccordionProps = {
  title: string;
  description: string;
};

export function Accordion({ title, description }: AccordionProps) {
  const isOpen = useSharedValue(false);
  const progress = useSharedValue(0); // 0 => 1

  function handleOpenPress() {
    isOpen.value = !isOpen.value;
    progress.value = withTiming(isOpen.value ? 0 : 1, { duration: 600 });
  }

  return (
    <Pressable onPress={handleOpenPress}>
      <View>
        <AccordionHeader title={title} progress={progress} />
        <AccordionBody
          description={description}
          isOpen={isOpen}
          progress={progress}
        />
      </View>
    </Pressable>
  );
}

function AccordionHeader({
  title,
  progress,
}: {
  title: string;
  progress: SharedValue<number>;
}) {

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    tintColor: interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.gray2, theme.colors.primary]
    ),
    transform: [
      {
        rotate: interpolate(progress.value, [0, 1], [0, -180]) + "deg",
      },
    ],
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.transparent, theme.colors.gray1]
    ),
    borderBottomLeftRadius: interpolate(
      progress.value,
      [0, 1],
      [theme.borderRadius.default, 0]
    ),
    borderBottomRightRadius: interpolate(
      progress.value,
      [0, 1],
      [theme.borderRadius.default, 0]
    ),
  }));

  return (
    <Animated.View style={[styles.header, animatedStyle]}>
      <View style={{ flexShrink: 1 }}>
        <Typo variant={theme.textVariants.title16}>{title}</Typo>
      </View>

      <Animated.Image
        source={require("@/assets/images/chevron-down.png")}
        style={[iconAnimatedStyle, { width: 24, height: 24 }]}
      />
    </Animated.View>
  );
}

function AccordionBody({
  description,
  isOpen,
  progress,
}: {
  description: string;
  isOpen: SharedValue<boolean>;
  progress: SharedValue<number>;
}) {
  const height = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1]),
      height: interpolate(progress.value, [0, 1], [0, height.value]),
      borderTopLeftRadius: interpolate(
        progress.value,
        [0, 1],
        [theme.borderRadius.default, 0]
      ),
      borderTopRightRadius: interpolate(
        progress.value,
        [0, 1],
        [theme.borderRadius.default, 0]
      ),
    };
  });

  return (
    <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
      <View
        style={styles.body}
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
      >
        <Typo variant={theme.textVariants.text16}>{description}</Typo>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: theme.colors.gray1,
    borderRadius: theme.borderRadius.default,
  },
  body: {
    position: "absolute",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: theme.colors.gray1,
    borderBottomLeftRadius: theme.borderRadius.default,
    borderBottomRightRadius: theme.borderRadius.default,
  },
});
