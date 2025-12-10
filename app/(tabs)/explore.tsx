import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { categories as dataCategories } from '@/data/categories'
import { cities } from '@/data/cities'
import { Image } from 'expo-image'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import {
  Buildings,
  Diamond,
  ForkKnife,
  Heart,
  Mountains,
  Scroll,
  ShoppingCart,
  Star,
  Target,
  Umbrella,
} from 'phosphor-react-native'
import { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

interface Destination {
  id: string
  name: string
  country: string
  image: string | number
  isFavorite?: boolean
}

interface Category {
  id: string
  name: string
  subtitle: string
  icon: any
  destinations: Destination[]
}

export default function ExploreScreen() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (destinationId: string) => {
    setFavorites((prev: Set<string>) => {
      const newSet = new Set(prev)
      if (newSet.has(destinationId)) {
        newSet.delete(destinationId)
      } else {
        newSet.add(destinationId)
      }
      return newSet
    })
  }

  // Mapeamento de ícones por código de categoria
  const categoryIconMap: Record<string, any> = {
    FAVORITE: Star,
    URBAN: Buildings,
    BEACH: Umbrella,
    NATURE: Mountains,
    CULTURE: Target,
    SHOPPING: ShoppingCart,
    HISTORY: Scroll,
    ADVENTURE: Mountains,
    LUXURY: Diamond,
    GASTRONOMY: ForkKnife,
  }

  // Agrupar cidades por categoria usando dados reais
  const baseCategories = useMemo(() => {
    return dataCategories.map((category) => {
      // Filtrar cidades que pertencem a esta categoria
      const categoryCities = cities.filter((city) =>
        city.categories.some((cat) => cat.id === category.id)
      )

      // Converter cidades para o formato de destinos
      const destinations = categoryCities.map((city) => ({
        id: city.id,
        name: city.name,
        country: city.country,
        image: city.coverImage,
      }))

      return {
        id: category.id,
        name: category.name,
        subtitle: category.description || '',
        icon: categoryIconMap[category.code] || Star,
        destinations,
      }
    })
  }, [])

  // Adicionar estado de favorito dinamicamente
  const categoriesWithFavorites: Category[] = baseCategories.map((category) => ({
    ...category,
    destinations: category.destinations.map((dest) => ({
      ...dest,
      isFavorite: favorites.has(dest.id),
    })),
  }))

  return (
    <ScreenWrapper>
      <Header title="Explorar" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {categoriesWithFavorites.map((category: Category) => (
            <View key={category.id} style={styles.categorySection}>
              {/* Cabeçalho da Categoria */}
              <View style={styles.categoryHeader}>
                <View style={styles.categoryTitleContainer}>
                  <category.icon size={24} color={colors.primary} weight="fill" />
                  <Typo size={20} fontFamily={font.bold} color={colors.white} style={styles.categoryTitle}>
                    {category.name}
                  </Typo>
                </View>
                <Typo size={14} fontFamily={font.regular} color={colors.gray2} style={styles.categorySubtitle}>
                  {category.subtitle}
                </Typo>
              </View>

              {/* Carrossel de Destinos */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.destinationsCarousel}
                contentContainerStyle={styles.destinationsCarouselContent}>
                {category.destinations.map((destination: Destination) => (
                  <TouchableOpacity
                    key={destination.id}
                    style={styles.destinationCard}
                    onPress={() => {
                      // Navegar para detalhes do destino
                      router.push('/trip-details')
                    }}>
                    <Image
                      source={typeof destination.image === 'number' ? destination.image : { uri: destination.image }}
                      style={styles.destinationImage}
                      contentFit="cover"
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0, 0, 0, 0.8)']}
                      style={styles.destinationGradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                    />
                    <View style={styles.destinationOverlay}>
                      <Typo size={18} fontFamily={font.bold} color={colors.white}>
                        {destination.name}
                      </Typo>
                      <Typo size={14} fontFamily={font.regular} color={colors.white}>
                        {destination.country}
                      </Typo>
                    </View>
                    <TouchableOpacity
                      style={styles.favoriteButton}
                      onPress={(e: any) => {
                        e.stopPropagation()
                        toggleFavorite(destination.id)
                      }}>
                      <Heart
                        size={20}
                        color={favorites.has(destination.id) ? colors.primary : colors.white}
                        weight={favorites.has(destination.id) ? 'fill' : 'regular'}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          ))}
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    marginBottom: 16,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  categoryTitle: {
    marginLeft: 0,
  },
  categorySubtitle: {
    marginTop: 4,
    marginLeft: 32,
  },
  destinationsCarousel: {
    marginHorizontal: -20,
  },
  destinationsCarouselContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  destinationCard: {
    width: 200,
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 16,
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
