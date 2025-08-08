import { BackButton } from '@/components/BackButton'
import { Categories } from '@/components/Categories'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { SortCategories } from '@/components/SortCategories'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { MagnifyingGlassIcon } from 'phosphor-react-native'
import { use, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

interface Destination {
  id: string
  name: string
  country: string
  image: string
  description: string
  category: 'beach' | 'mountain' | 'city' | 'cultural' | 'adventure'
  price: string
  rating: number
}

export default function DestinationScreen() {
  const router = useRouter()
  const { tripData, setDestination } = use(TripContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedSort, setSelectedSort] = useState<string>('Popular')

  const destinations: Destination[] = [
    // Praias
    {
      id: 'bali',
      name: 'Bali',
      country: 'Indonésia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop',
      description: 'Ilha paradisíaca com praias, templos e cultura rica',
      category: 'beach',
      price: 'R$ 2.500',
      rating: 4.8
    },
    {
      id: 'santorini',
      name: 'Santorini',
      country: 'Grécia',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop',
      description: 'Ilha com vistas deslumbrantes e arquitetura única',
      category: 'beach',
      price: 'R$ 3.200',
      rating: 4.9
    },
    {
      id: 'maldives',
      name: 'Maldivas',
      country: 'Maldivas',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=300&fit=crop',
      description: 'Paraíso tropical com águas cristalinas',
      category: 'beach',
      price: 'R$ 4.500',
      rating: 4.9
    },
    {
      id: 'bora-bora',
      name: 'Bora Bora',
      country: 'Polinésia Francesa',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop',
      description: 'Ilha exótica com lagoas azuis',
      category: 'beach',
      price: 'R$ 5.800',
      rating: 4.7
    },
    {
      id: 'copacabana',
      name: 'Copacabana',
      country: 'Brasil',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop',
      description: 'Praia famosa no coração do Rio de Janeiro',
      category: 'beach',
      price: 'R$ 1.800',
      rating: 4.6
    },

    // Cidades
    {
      id: 'tokyo',
      name: 'Tóquio',
      country: 'Japão',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
      description: 'Metrópole moderna com tecnologia e tradição',
      category: 'city',
      price: 'R$ 3.800',
      rating: 4.7
    },
    {
      id: 'new-york',
      name: 'Nova York',
      country: 'EUA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop',
      description: 'A cidade que nunca dorme, cheia de energia',
      category: 'city',
      price: 'R$ 4.200',
      rating: 4.8
    },
    {
      id: 'london',
      name: 'Londres',
      country: 'Reino Unido',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop',
      description: 'Capital histórica com cultura e tradição',
      category: 'city',
      price: 'R$ 3.900',
      rating: 4.6
    },
    {
      id: 'singapore',
      name: 'Singapura',
      country: 'Singapura',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=300&fit=crop',
      description: 'Cidade-estado moderna e futurista',
      category: 'city',
      price: 'R$ 3.500',
      rating: 4.5
    },
    {
      id: 'dubai',
      name: 'Dubai',
      country: 'Emirados Árabes',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
      description: 'Cidade do luxo e arquitetura impressionante',
      category: 'city',
      price: 'R$ 4.800',
      rating: 4.4
    },

    // Montanhas
    {
      id: 'swiss-alps',
      name: 'Alpes Suíços',
      country: 'Suíça',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Montanhas majestosas para esportes de inverno',
      category: 'mountain',
      price: 'R$ 3.600',
      rating: 4.8
    },
    {
      id: 'banff',
      name: 'Banff',
      country: 'Canadá',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Parque nacional com paisagens deslumbrantes',
      category: 'mountain',
      price: 'R$ 2.900',
      rating: 4.7
    },
    {
      id: 'chamonix',
      name: 'Chamonix',
      country: 'França',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Estação de esqui nos Alpes franceses',
      category: 'mountain',
      price: 'R$ 3.400',
      rating: 4.6
    },
    {
      id: 'whistler',
      name: 'Whistler',
      country: 'Canadá',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Resort de esqui de classe mundial',
      category: 'mountain',
      price: 'R$ 4.100',
      rating: 4.9
    },
    {
      id: 'zermatt',
      name: 'Zermatt',
      country: 'Suíça',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Vila alpina sem carros',
      category: 'mountain',
      price: 'R$ 3.800',
      rating: 4.7
    },

    // Cultural
    {
      id: 'paris',
      name: 'Paris',
      country: 'França',
      image: 'https://images.unsplash.com/photo-1502602898534-861c8d0bdcf4?w=400&h=300&fit=crop',
      description: 'Cidade do amor com arte, gastronomia e história',
      category: 'cultural',
      price: 'R$ 3.200',
      rating: 4.8
    },
    {
      id: 'rome',
      name: 'Roma',
      country: 'Itália',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
      description: 'Cidade eterna com história milenar',
      category: 'cultural',
      price: 'R$ 2.800',
      rating: 4.7
    },
    {
      id: 'kyoto',
      name: 'Quioto',
      country: 'Japão',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop',
      description: 'Capital cultural com templos ancestrais',
      category: 'cultural',
      price: 'R$ 3.100',
      rating: 4.6
    },
    {
      id: 'machu-picchu',
      name: 'Machu Picchu',
      country: 'Peru',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop',
      description: 'Cidade perdida dos Incas nas montanhas',
      category: 'cultural',
      price: 'R$ 2.500',
      rating: 4.9
    },
    {
      id: 'petra',
      name: 'Petra',
      country: 'Jordânia',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
      description: 'Cidade rosa esculpida na rocha',
      category: 'cultural',
      price: 'R$ 2.900',
      rating: 4.5
    },

    // Aventura
    {
      id: 'amazon',
      name: 'Amazônia',
      country: 'Brasil',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      description: 'Floresta tropical com biodiversidade única',
      category: 'adventure',
      price: 'R$ 1.800',
      rating: 4.4
    },
    {
      id: 'patagonia',
      name: 'Patagônia',
      country: 'Argentina',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Região selvagem com paisagens dramáticas',
      category: 'adventure',
      price: 'R$ 2.200',
      rating: 4.6
    },
    {
      id: 'iceland',
      name: 'Islândia',
      country: 'Islândia',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Terra de gelo, fogo e auroras boreais',
      category: 'adventure',
      price: 'R$ 3.500',
      rating: 4.7
    },
    {
      id: 'new-zealand',
      name: 'Nova Zelândia',
      country: 'Nova Zelândia',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Paraíso para aventuras ao ar livre',
      category: 'adventure',
      price: 'R$ 4.200',
      rating: 4.8
    },
    {
      id: 'nepal',
      name: 'Nepal',
      country: 'Nepal',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      description: 'Terra do Everest e trekking épico',
      category: 'adventure',
      price: 'R$ 2.800',
      rating: 4.5
    }
  ]

  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         destination.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (selectedSort) {
      case 'Popular':
        return b.rating - a.rating
      case 'Recomendado':
        return b.rating - a.rating
      case 'Recente':
        return a.name.localeCompare(b.name)
      case 'Tendência':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleDestinationSelect = (destination: Destination) => {
    setDestination(`${destination.name}, ${destination.country}`)
    router.push('/create-trip/travelers')
  }

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category.id)
  }

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort)
  }

  return (
    <ScreenWrapper>
      <Header title="Escolha seu destino" leftIcon={<BackButton />} />

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <Input
              icon={
                <MagnifyingGlassIcon
                  size={20}
                  weight="bold"
                  color={colors.neutral[100]}
                />
              }
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar destinos..."
            />
          </View>

          <View style={styles.categoriesContainer}>
            <Categories 
              selectedCategory={selectedCategory}
              onCategoryPress={handleCategoryPress}
            />
          </View>

          <View style={styles.sortContainer}>
            <SortCategories 
              selectedSort={selectedSort}
              onSortChange={handleSortChange}
            />
          </View>

          <View style={styles.destinationsContainer}>
            <Typo size={16} fontFamily={font.semiBold} color={colors.text.primary} style={styles.sectionTitle}>
              Destinos ({filteredDestinations.length})
            </Typo>
            
            <View style={styles.destinationsGrid}>
              {sortedDestinations.map((destination) => (
                <TouchableOpacity
                  key={destination.id}
                  style={styles.destinationCard}
                  onPress={() => handleDestinationSelect(destination)}
                >
                  <Image
                    source={{ uri: destination.image }}
                    style={styles.destinationImage}
                    contentFit="cover"
                  />
                  <View style={styles.destinationInfo}>
                    <View style={styles.destinationHeader}>
                      <Typo size={16} fontFamily={font.bold} color={colors.text.primary}>
                        {destination.name}
                      </Typo>
                      <View style={styles.ratingContainer}>
                        <Typo size={12} color={colors.text.secondary}>⭐ {destination.rating}</Typo>
                      </View>
                    </View>
                    <Typo size={14} fontFamily={font.regular} color={colors.text.secondary}>
                      {destination.country}
                    </Typo>
                    <Typo size={12} fontFamily={font.regular} color={colors.text.tertiary}>
                      {destination.description}
                    </Typo>
                    <View style={styles.priceContainer}>
                      <Typo size={14} fontFamily={font.bold} color={colors.primary.orange}>
                        {destination.price}
                      </Typo>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
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
    paddingBottom: 25,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchContainer: {
    marginBottom: 20,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sortContainer: {
    marginBottom: 20,
  },
  destinationsContainer: {
    flex: 1,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  destinationCard: {
    backgroundColor: colors.background.card,
    borderRadius: 16,
    overflow: 'hidden',
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border.primary,
  },
  destinationImage: {
    width: '100%',
    height: 120,
  },
  destinationInfo: {
    padding: 12,
    gap: 4,
  },
  destinationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingContainer: {
    alignItems: 'center',
  },
  priceContainer: {
    marginTop: 4,
  },
})
