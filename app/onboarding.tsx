import { colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet } from "react-native";

import {
  Exo2_400Regular,
  Exo2_500Medium,
  Exo2_600SemiBold,
  Exo2_700Bold,
  useFonts,
} from "@expo-google-fonts/exo-2";

export default function Onboarding() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    Exo2_400Regular,
    Exo2_500Medium,
    Exo2_600SemiBold,
    Exo2_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      const timer = setTimeout(() => {
        router.replace("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, router]);

  return (
    <LinearGradient
      colors={colors.gradients.secondary as [string, string]}
      style={styles.container}
    >
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("@/assets/images/splash-icon.png")}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background.primary,
  },
  logo: {
    height: "20%",
    aspectRatio: 1,
  },
});
