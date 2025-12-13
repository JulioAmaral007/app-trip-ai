import { CategoryPill } from "@/components/category/CategoryPill";
import { CreateTripInput } from "@/components/ui/CreateTripInput";
import { Category } from "@/data/types";
import { ScrollView, StyleSheet, View } from "react-native";

type CityFilterProps = {
  categories?: Category[];
  selectedCategoryId: string | null;
  onChangeSelectedCategoryId: (id: string | null) => void;
};
export function CityFilter({
  categories,
  selectedCategoryId,
  onChangeSelectedCategoryId,
}: CityFilterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <CreateTripInput />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoriesContainer}>
          {categories?.map((category) => (
            <CategoryPill
              key={category.id}
              active={category.id === selectedCategoryId}
              category={category}
              onPress={() =>
                onChangeSelectedCategoryId(
                  category.id === selectedCategoryId ? null : category.id
                )
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    marginTop: 16,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
  },
});