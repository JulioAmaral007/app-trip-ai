import { Image, Pressable, useWindowDimensions, View } from "react-native";

import { CityPreview } from "@/components/types";
import { theme } from "@/constants/theme";
import { Link } from "expo-router";
import { Typo } from "@/components/ui/Typo";

type FavoriteCityCardProps = {
  cityPreview: CityPreview;
};

export function FavoriteCityCard({ cityPreview }: FavoriteCityCardProps) {

  const { width } = useWindowDimensions();
  const IMAGE_WIDTH = width * 0.3;
  const IMAGE_HEIGHT = IMAGE_WIDTH * 0.75;

  return (
    <Link push href={`/city-details/${cityPreview.id}`} asChild>
      <Pressable>
        <View
          style={{ flexDirection: "row", backgroundColor: theme.colors.gray1, padding: 12, borderRadius: theme.borderRadius.small, justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row" }}>
            <Image
              source={
                typeof cityPreview.coverImage === "number"
                  ? cityPreview.coverImage
                  : { uri: cityPreview.coverImage }
              }
              style={[
                {
                  width: IMAGE_WIDTH,
                  height: IMAGE_HEIGHT,
                  borderRadius: theme.borderRadius.small,
                },
              ]}
            />

            <View style={{ marginLeft: 16, justifyContent: "center" }}>
              <Typo variant={theme.textVariants.title16}>{cityPreview.name}</Typo>
              <Typo variant={theme.textVariants.text16}>{cityPreview.country}</Typo>
            </View>
          </View>
{/* 
          <View >
            <View style={{ alignSelf: "flex-end" }}>
              <CityFavoriteButton city={cityPreview} />
            </View>
          </View> */}
        </View>
      </Pressable>
    </Link>
  );
}
