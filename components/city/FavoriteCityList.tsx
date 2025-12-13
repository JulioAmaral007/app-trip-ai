import { FavoriteCityCard } from "@/components/city/FavoriteCityCard";
import { CityPreview } from "@/components/types";
import { cities } from "@/data/cities";
import { FlatList, FlatListProps, ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Dados mockados de cidades favoritas
const mockFavoriteCities: CityPreview[] = [
  {
    id: cities[0].id,
    name: cities[0].name,
    country: cities[0].country,
    coverImage: cities[0].coverImage,
    isFavorite: true,
  },
  {
    id: cities[1].id,
    name: cities[1].name,
    country: cities[1].country,
    coverImage: cities[1].coverImage,
    isFavorite: true,
  },
  {
    id: cities[2].id,
    name: cities[2].name,
    country: cities[2].country,
    coverImage: cities[2].coverImage,
    isFavorite: true,
  },
];

export function FavoriteCityList({
  ListFooterComponent,
  ListHeaderComponent,
}: Pick<
  FlatListProps<CityPreview>,
  "ListFooterComponent" | "ListHeaderComponent"
>) {
  const favoriteList = mockFavoriteCities;
  const { top } = useSafeAreaInsets();

  function renderItem({ item }: ListRenderItemInfo<CityPreview>) {
    return <FavoriteCityCard cityPreview={item} />;
  }

  return (
    <FlatList
      data={favoriteList}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={{
        gap: 16,
        paddingTop: top + 20,
        paddingBottom: 16,
      }}
    />
  );
}
