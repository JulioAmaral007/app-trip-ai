import { Category, CategoryCode } from "@/data/types";
import { IconName } from "@/components/ui/Icon";
import { Pill, PillProps } from "@/components/category/Pill";

type CategoryPillProps = {
  category: Category;
} & Pick<PillProps, "active" | "onPress">;
export function CategoryPill({ category, ...pillProps }: CategoryPillProps) {
  return (
    <Pill
      iconName={categoryIconMap[category.code]}
      label={category.name}
      {...pillProps}
    />
  );
}

export const categoryIconMap: Record<CategoryCode, IconName> = {
  ADVENTURE: "Adventure",
  BEACH: "Beach",
  CULTURE: "Culture",
  GASTRONOMY: "Gastronomy",
  HISTORY: "History",
  LUXURY: "Luxury",
  NATURE: "Nature",
  URBAN: "Urban",
  SHOPPING: "Shopping",
  FAVORITE: "Star",
};