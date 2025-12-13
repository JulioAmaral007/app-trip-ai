import { router } from "expo-router";
import { ImageBackground, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BlackOpacity } from "@/components/ui/BlackOpacity";
import { CategoryPill } from "@/components/category/CategoryPill";
import { IconButton } from "@/components/ui/IconButton";
import { PILL_HEIGHT } from "@/components/category/Pill";
import { City } from "@/components/types";

type CityDetailsHeaderProps = Pick<
  City,
  "id" | "coverImage" | "categories" | "isFavorite"
>;

export function CityDetailsHeader({
  id,
  coverImage,
  categories,
  isFavorite,
}: CityDetailsHeaderProps) {
  const { top } = useSafeAreaInsets();
  return (
    <View>
      <ImageBackground
        source={
          typeof coverImage === "number" ? coverImage : { uri: coverImage }
        }
        style={{ width: "100%", height: 250 }}
        imageStyle={{ borderBottomRightRadius: 40 }}
      >
        <BlackOpacity />
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingTop: top }}
        >
          <IconButton iconName="Chevron-left" onPress={router.back} />
          {/* <CityFavoriteButton size={30} city={{ id, isFavorite }} /> */}
        </View>
      </ImageBackground>

      <ScrollView
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: -PILL_HEIGHT / 2 }}
      >
        <View style={{ flexDirection: 'row', gap: 8, paddingHorizontal: 16 }}>
          {categories.map((category) => (
            <CategoryPill active={true} key={category.id} category={category} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
