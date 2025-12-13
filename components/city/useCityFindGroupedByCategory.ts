import { CitiesGroupedByCategory } from "@/components/city/CitiesGroupedByCategoryItem";
import { CityPreview } from "@/components/types";
import { categories } from "@/data/categories";
import { cities } from "@/data/cities";
import { useMemo } from "react";

export function useCityFindGroupedByCategory() {
  const groupedData = useMemo(() => {
    const grouped: CitiesGroupedByCategory[] = [];

    // Para cada categoria, encontrar as cidades que pertencem a ela
    categories.forEach((category) => {
      const citiesInCategory = cities
        .filter((city) =>
          city.categories.some((cat) => cat.id === category.id)
        )
        .map(
          (city): CityPreview => ({
            id: city.id,
            name: city.name,
            country: city.country,
            coverImage: city.coverImage,
            isFavorite: false, // Valor padrão, pode ser gerenciado por estado/contexto no futuro
          })
        );

      // Só adicionar a categoria se houver cidades nela
      if (citiesInCategory.length > 0) {
        grouped.push({
          category,
          cities: citiesInCategory,
        });
      }
    });

    return grouped;
  }, []);

  return {
    data: groupedData,
    isLoading: false,
    error: null,
  };
}
