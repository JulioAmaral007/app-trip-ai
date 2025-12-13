import { CityPreview } from '@/components/types'
import { cities } from '@/data/cities'
import { useMemo } from 'react'

type UseCityFindAllParams = {
  name?: string
  categoryId?: string | null
}

export function useCityFindAll({ name, categoryId }: UseCityFindAllParams) {
  const filteredCities = useMemo(() => {
    let result = cities

    // Filtrar por nome
    if (name && name.trim()) {
      const searchTerm = name.trim().toLowerCase()
      result = result.filter(
        (city) =>
          city.name.toLowerCase().includes(searchTerm) ||
          city.country.toLowerCase().includes(searchTerm)
      )
    }

    // Filtrar por categoria
    if (categoryId) {
      result = result.filter((city) =>
        city.categories.some((category) => category.id === categoryId)
      )
    }

    // Transformar em CityPreview com isFavorite
    return result.map(
      (city): CityPreview => ({
        id: city.id,
        name: city.name,
        country: city.country,
        coverImage: city.coverImage,
        isFavorite: false, // Valor padrão, pode ser gerenciado por estado/contexto no futuro
      })
    )
  }, [name, categoryId])

  return {
    data: filteredCities,
    isLoading: false,
    error: null,
  }
}

