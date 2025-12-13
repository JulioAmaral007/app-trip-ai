import { theme } from "@/constants/theme";
import { ScrollView, View } from "react-native";
import { categoryIconMap } from "@/components/category/CategoryPill";
import { CityCard } from "@/components/city/CityCard";
import { Icon } from "@/components/ui/Icon";
import { Typo } from "@/components/ui/Typo";
import { Category, CategoryCode, CityPreview } from "@/components/types";

export type CitiesGroupedByCategory = {
  category: Category;
  cities: CityPreview[];
};

export function CitiesGroupedByCategoryItem({
  category,
  cities,
}: CitiesGroupedByCategory) {
  return (
    <View >
      <View style={{ flexDirection: "row", marginLeft: 16 }}>
        <Icon name={categoryIconMap[category.code as CategoryCode]} color="primary" />
        <View style={{ marginLeft: 12, marginBottom: 16 }}>
          <Typo variant={theme.textVariants.title22}>{category.name}</Typo>
          <Typo variant={theme.textVariants.text14}>{category.description}</Typo>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          columnGap: 16,
          paddingLeft: 16,
        }}
      >
        {cities.map((city: CityPreview) => (
          <CityCard
            key={city.id}
            cityPreview={city}
            type="small"
            disableFavorite
          />
        ))}
      </ScrollView>
    </View>
  );
}
