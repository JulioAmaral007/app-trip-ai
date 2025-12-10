import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
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
  MagnifyingGlass,
  Mountains,
  Scroll,
  ShoppingCart,
  Star,
  Target,
  Umbrella,
  X,
} from 'phosphor-react-native'
import { useContext, useMemo, useState } from 'react'
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()
  const { setDestination } = useContext(TripContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState('star') // Destaques ativo por padrão

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

  // Preparar todas as categorias para os filtros
  const mainCategories = useMemo(() => {
    return dataCategories.map((category) => ({
      id: category.id,
      name: category.name,
      code: category.code,
      icon: categoryIconMap[category.code] || Star,
    }))
  }, [])

  // Converter cidades para destinos e filtrar por categoria
  const getFilteredDestinations = () => {
    let filtered = cities.map((city) => ({
      id: city.id,
      name: city.name,
      country: city.country,
      image: city.coverImage,
      categories: city.categories.map((cat) => cat.code),
    }))

    // Filtrar por categoria ativa
    if (activeCategory === 'star') {
      // Destaques - mostrar todas as cidades (ou você pode filtrar por favoritos)
      // Por enquanto, mostra todas
    } else {
      const categoryCode = dataCategories.find((cat) => cat.id === activeCategory)?.code
      if (categoryCode) {
        filtered = filtered.filter((dest) => dest.categories.includes(categoryCode))
      }
    }

    // Filtrar por pesquisa
    if (searchQuery) {
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return filtered
  }

  const filteredDestinations = getFilteredDestinations()

  const toggleFavorite = (destinationId: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(destinationId)) {
        newSet.delete(destinationId)
      } else {
        newSet.add(destinationId)
      }
      return newSet
    })
  }

  const handleDestinationSelect = (destination: any) => {
    setDestination(`${destination.name}, ${destination.country}`)
    setSearchQuery('')
    router.push('/create-trip/travelers')
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <ScreenWrapper>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Qual seu próximo destino?"
                placeholderTextColor={colors.gray2}
                autoCapitalize="none"
              />
              {searchQuery ? (
                <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
                  <X size={16} weight="bold" color={colors.white} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.searchButton}>
                  <MagnifyingGlass size={20} weight="bold" color={colors.white} />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Filtros de categoria */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={styles.categoriesContent}>
            {mainCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  activeCategory === category.id && styles.categoryButtonActive,
                ]}
                onPress={() => setActiveCategory(category.id)}>
                <category.icon
                  size={16}
                  color={activeCategory === category.id ? colors.primary : colors.white}
                  weight={activeCategory === category.id ? 'fill' : 'regular'}
                />
                <Typo style={styles.categoryText}>
                  {category.name}
                </Typo>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Mensagem de resultados quando há pesquisa */}
          {searchQuery && (
            <Typo style={styles.resultsText}>
              Exibindo {filteredDestinations.length} de {filteredDestinations.length} resultados
              para &apos;{searchQuery}&apos;
            </Typo>
          )}

          {/* Lista de destinos */}
          <View style={styles.destinationsList}>
            {filteredDestinations.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={styles.destinationCard}
                onPress={() => handleDestinationSelect(destination)}
                activeOpacity={0.9}>
                <Image
                  source={
                    typeof destination.image === 'number'
                      ? destination.image
                      : { uri: destination.image }
                  }
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
                  <Typo size={24} fontFamily={font.bold} color={colors.white}>
                    {destination.name}
                  </Typo>
                  <Typo size={16} fontFamily={font.regular} color={colors.white}>
                    {destination.country}
                  </Typo>
                </View>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={(e) => {
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
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 16,
    height: 54,
  },
  searchInput: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    fontFamily: font.regular,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    gap: 6,
  },
  categoryButtonActive: {
    backgroundColor: colors.gray1,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: font.medium,
    color: colors.white,
  },
  categoryTextActive: {
    color: colors.white,
  },
  resultsText: {
    fontSize: 14,
    fontFamily: font.regular,
    color: colors.white,
    marginBottom: 16,
  },
  destinationsList: {
    gap: 20,
  },
  destinationCard: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 0,
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
    padding: 20,
    gap: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
  },
})
