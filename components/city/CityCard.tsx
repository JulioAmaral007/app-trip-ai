import { CityPreview } from "@/components/types";
import { BlackOpacity } from "@/components/ui/BlackOpacity";
import { Typo } from "@/components/ui/Typo";
import { theme } from "@/constants/theme";
import { Link } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, useWindowDimensions, View } from "react-native";

type CityCardProps = {
  cityPreview: CityPreview;
  type?: "small" | "large";
  disableFavorite?: boolean;
  onPress?: () => void;
};

export function CityCard({
  cityPreview,
  type = "large",
  disableFavorite = false,
  onPress,
}: CityCardProps) {
  const { width } = useWindowDimensions();

  const cardWith = width * 0.7;
  const cardHeight = cardWith * 0.9;

  const style =
    type === "small" ? { width: cardWith, height: cardHeight } : undefined;

  const cardContent = (
    <Pressable onPress={onPress}>
      <ImageBackground
        source={
          typeof cityPreview.coverImage === "number"
            ? cityPreview.coverImage
            : { uri: cityPreview.coverImage }
        }
        style={[{ width: "100%", height: 280 }, style]}
        imageStyle={{ borderRadius: theme.borderRadius.default }}
        resizeMode="cover"
      >
        <BlackOpacity />
        <View style={{ flex: 1, padding: 24, justifyContent: 'space-between' }}>
          <View style={{ alignSelf: 'flex-end' }}>
            {/* {!disableFavorite && <CityFavoriteButton city={city} />} */}
          </View>
          <View>
            <Typo variant={theme.textVariants.title22}>{cityPreview.name}</Typo>
            <Typo variant={theme.textVariants.text16}>{cityPreview.country}</Typo>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );

  if (onPress) {
    return cardContent;
  }

  return (
    <Link push href={`/create-trip/travelers`} asChild>
      {cardContent}
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    // borderWidth: 1,
    // borderColor: "#FF4B4B",
    // paddingHorizontal: 8,
    // paddingVertical: 16,
    // padding: 16,
  },
  title: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: 600,
    marginTop: 16,
  },
  description: {
    color: theme.colors.text,
    fontSize: 16,
    marginTop: 8,
  },
})
