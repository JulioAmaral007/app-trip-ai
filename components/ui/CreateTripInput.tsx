import { type IconName } from "@/components/ui/Icon";
import { IconButton } from "@/components/ui/IconButton";
import { theme } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export function CreateTripInput() {
  const router = useRouter();
  const iconName: IconName = "Plus";

  const handlePress = () => {
    router.push('/create-trip/select-city');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          style={styles.logo}
          contentFit="contain"
          source={require('@/assets/images/logo.png')}
        /> 
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handlePress}
        >
          <IconButton iconName={iconName} onPress={handlePress} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  logo: {
    width: 100,
    height: 60,
  },
  input: {
    flex: 1,
    paddingLeft: 24,
    color: theme.colors.text,
    fontSize: 16,
    fontFamily: "PoppinsBold",
    lineHeight: 22,
  },
  iconButton: {
    borderRadius: theme.borderRadius.rounded,
    padding: 8,
  },
});
