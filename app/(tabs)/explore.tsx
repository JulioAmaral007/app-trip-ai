import { CitiesGroupedByCategory, CitiesGroupedByCategoryItem } from "@/components/city/CitiesGroupedByCategoryItem";
import { useCityFindGroupedByCategory } from "@/components/city/useCityFindGroupedByCategory";
import { ScreenWrapper } from "@/components/layout/ScreenWrapper";
import { Separator } from "@/components/ui/Separator";
import { useScrollToTop } from "@react-navigation/native";
import { useRef } from "react";
import { FlatList, ListRenderItemInfo } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const { data } = useCityFindGroupedByCategory();
  const { top } = useSafeAreaInsets();

  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<CitiesGroupedByCategory>) {
    return <CitiesGroupedByCategoryItem {...item} />;
  }

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.category.id}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={{
          paddingTop: top + 20,
          paddingBottom: 16,
        }}
      />
    </ScreenWrapper>
  );
}