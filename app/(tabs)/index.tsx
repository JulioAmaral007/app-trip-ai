import { CategoriesFilter } from '@/components/CategoriesFilter'
import { DestinationsSection } from '@/components/DestinationsSection'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { TripsSection } from '@/components/TripsSection'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { AuthContext } from '@/contexts/AuthContext'
import { TripContext } from '@/contexts/TripContext'
import { useFetchData } from '@/hooks/useFetchData'
import type { GeneratedTripType } from '@/types'
import { useRouter } from 'expo-router'
import { where } from 'firebase/firestore'
import {
  Buildings,
  ForkKnife,
  GraduationCap,
  MagnifyingGlass,
  Mountains,
  Smiley,
  Star,
  SwimmingPool,
  Tent,
  Umbrella,
  X,
} from 'phosphor-react-native'
import { useContext, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const router = useRouter()
  const { aiResponse, tripData, setDestination, setSelectedTrip } = useContext(TripContext)
  const authContext = useContext(AuthContext)
  const user = authContext?.user
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [activeCategory, setActiveCategory] = useState('2') // Food & Drinks ativo por padrão

  // Buscar viagens do usuário logado usando useFetchData
  const { data: userTrips, loading: tripsLoading } = useFetchData<GeneratedTripType>(
    'trips',
    user?.uid ? [where('uid', '==', user.uid)] : []
  )

  const categories = [
    { id: '1', name: 'Destaques', icon: Star },
    { id: '2', name: 'Food & Drinks', icon: ForkKnife },
    { id: '3', name: 'Urban Areas', icon: Buildings },
    { id: '4', name: 'Adventure', icon: Mountains },
    { id: '5', name: 'Educational', icon: GraduationCap },
    { id: '6', name: 'Beach', icon: Umbrella },
    { id: '7', name: 'Pool', icon: SwimmingPool },
    { id: '8', name: 'Relax', icon: Smiley },
    { id: '9', name: 'Camp', icon: Tent },
  ]

  // Lista de destinos globais para pesquisa
  const globalDestinations = [
    // Food & Drinks (categoria 2)
    {
      id: '1',
      name: 'Lyon',
      country: 'França',
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400',
      category: '2', // Food & Drinks
      isFeatured: true,
    },
    {
      id: '2',
      name: 'Tóquio',
      country: 'Japão',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      category: '2', // Food & Drinks
      isFeatured: true,
    },
    {
      id: '3',
      name: 'Lima',
      country: 'Peru',
      image: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=400',
      category: '2', // Food & Drinks
      isFeatured: false,
    },

    // Urban Areas (categoria 3)
    {
      id: '4',
      name: 'Barcelona',
      country: 'Espanha',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400',
      category: '3', // Urban Areas
      isFeatured: true,
    },
    {
      id: '5',
      name: 'Nova York',
      country: 'EUA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400',
      category: '3', // Urban Areas
      isFeatured: true,
    },
    {
      id: '6',
      name: 'Londres',
      country: 'Reino Unido',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400',
      category: '3', // Urban Areas
      isFeatured: false,
    },
    {
      id: '7',
      name: 'Paris',
      country: 'França',
      image: 'https://images.unsplash.com/photo-1502602898534-861c8d0bdcf4?w=400',
      category: '3', // Urban Areas
      isFeatured: true,
    },

    // Adventure (categoria 4)
    {
      id: '8',
      name: 'Banff',
      country: 'Canadá',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      category: '4', // Adventure
      isFeatured: true,
    },
    {
      id: '9',
      name: 'Patagônia',
      country: 'Argentina',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=400',
      category: '4', // Adventure
      isFeatured: true,
    },
    {
      id: '10',
      name: 'Queenstown',
      country: 'Nova Zelândia',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      category: '4', // Adventure
      isFeatured: false,
    },

    // Educational (categoria 5)
    {
      id: '11',
      name: 'Roma',
      country: 'Itália',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
      category: '5', // Educational
      isFeatured: true,
    },
    {
      id: '12',
      name: 'Atenas',
      country: 'Grécia',
      image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400',
      category: '5', // Educational
      isFeatured: false,
    },
    {
      id: '13',
      name: 'Cairo',
      country: 'Egito',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400',
      category: '5', // Educational
      isFeatured: false,
    },

    // Beach (categoria 6)
    {
      id: '14',
      name: 'Maldivas',
      country: 'Maldivas',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400',
      category: '6', // Beach
      isFeatured: true,
    },
    {
      id: '15',
      name: 'Bali',
      country: 'Indonésia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
      category: '6', // Beach
      isFeatured: true,
    },
    {
      id: '16',
      name: 'Cancún',
      country: 'México',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400',
      category: '6', // Beach
      isFeatured: false,
    },
    {
      id: '17',
      name: 'Santorini',
      country: 'Grécia',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
      category: '6', // Beach
      isFeatured: true,
    },

    // Pool (categoria 7)
    {
      id: '18',
      name: 'Las Vegas',
      country: 'EUA',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      category: '7', // Pool
      isFeatured: false,
    },
    {
      id: '19',
      name: 'Dubai',
      country: 'Emirados Árabes',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
      category: '7', // Pool
      isFeatured: true,
    },

    // Relax (categoria 8)
    {
      id: '20',
      name: 'Tulum',
      country: 'México',
      image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=400',
      category: '8', // Relax
      isFeatured: true,
    },
    {
      id: '21',
      name: 'Ubud',
      country: 'Indonésia',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400',
      category: '8', // Relax
      isFeatured: false,
    },

    // Camp (categoria 9)
    {
      id: '22',
      name: 'Yosemite',
      country: 'EUA',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      category: '9', // Camp
      isFeatured: true,
    },
    {
      id: '23',
      name: 'Torres del Paine',
      country: 'Chile',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
      category: '9', // Camp
      isFeatured: false,
    },
  ]

  // Usar as viagens do banco se existirem, senão usar aiResponse se disponível
  const tripsToShow = userTrips.length > 0 ? userTrips : aiResponse ? [aiResponse] : []

  // Filtrar destinos baseado na pesquisa
  const filteredDestinations = globalDestinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleTripPress = (trip: any) => {
    // Se for uma viagem do banco (tem id), usar os dados completos da viagem
    if (trip.id && userTrips.length > 0) {
      // Encontrar a viagem completa nos dados do banco
      const fullTrip = userTrips.find((t) => t.id === trip.id)
      if (fullTrip) {
        // Salvar a viagem completa no context para ser usado na tela de detalhes
        setSelectedTrip(fullTrip)
        router.push('/trip-details')
      }
    } else if (aiResponse) {
      // Para viagens da IA, usar o aiResponse
      setSelectedTrip(aiResponse)
      router.push('/trip-details')
    }
  }

  const toggleFavorite = (tripId: string) => {
    // Implementar lógica de favorito
    console.log('Toggle favorite:', tripId)
  }

  const handleSearchFocus = () => {
    setIsSearchFocused(true)
  }

  const handleSearchBlur = () => {
    // Não fazer nada aqui, deixar o handleDestinationSelect controlar
  }

  const handleDestinationSelect = (destination: any) => {
    setDestination(`${destination.name}, ${destination.country}`)
    setSearchQuery('')
    setIsSearchFocused(false)
    router.push('/create-trip/travelers')
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setIsSearchFocused(false)
  }

  const handleCategoryPress = (categoryId: string) => {
    setActiveCategory(categoryId)
  }

  return (
    <ScreenWrapper>
      <Header title="My Trips" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {/* Barra de pesquisa */}
          <View style={styles.searchContainer}>
            <Input
              icon={<MagnifyingGlass size={20} weight="bold" color={colors.text.primary} />}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Qual seu próximo destino?"
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
            />
            {isSearchFocused && searchQuery && (
              <TouchableOpacity style={styles.clearButton} onPress={handleClearSearch}>
                <X size={16} weight="bold" color={colors.text.primary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Resultados de pesquisa quando o input está focado */}
          {isSearchFocused && (
            <View style={styles.searchResultsContainer}>
              <Typo style={styles.searchResultsTitle}>
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Destinos populares'}
              </Typo>
              <ScrollView
                style={styles.searchResultsList}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always">
                {(searchQuery ? filteredDestinations : globalDestinations.slice(0, 10)).map(
                  (destination) => (
                    <TouchableOpacity
                      key={destination.id}
                      style={styles.searchResultItem}
                      onPress={() => handleDestinationSelect(destination)}
                      activeOpacity={0.7}>
                      <Image
                        source={{ uri: destination.image }}
                        style={styles.searchResultImage}
                        resizeMode="cover"
                      />
                      <View style={styles.searchResultInfo}>
                        <Text style={styles.searchResultName}>{destination.name}</Text>
                        <Text style={styles.searchResultCountry}>{destination.country}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                )}
                {searchQuery && filteredDestinations.length === 0 && (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>Nenhum destino encontrado</Text>
                    <Text style={styles.noResultsSubtext}>Tente buscar por outro termo</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          )}

          {/* Conteúdo normal quando não está pesquisando */}
          {!isSearchFocused && (
            <>
              {/* Filtros de categoria */}
              <CategoriesFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryPress={handleCategoryPress}
              />

              {/* Destinos filtrados por categoria */}
              <DestinationsSection
                destinations={globalDestinations}
                categories={categories}
                activeCategory={activeCategory}
                onDestinationSelect={handleDestinationSelect}
              />

              {/* Lista de viagens */}
              <TripsSection
                trips={tripsToShow}
                onTripPress={handleTripPress}
                onToggleFavorite={toggleFavorite}
              />

              {/* Botão para criar nova viagem quando há viagens existentes */}
              {/* {tripsToShow.length > 0 && (
                <TouchableOpacity
                  style={styles.newTripButton}
                  onPress={() => router.push('/create-trip/travelers')}>
                  <Text style={styles.newTripButtonText}>+ Criar Nova Viagem</Text>
                </TouchableOpacity>
              )} */}
            </>
          )}
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
  },
  searchContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    right: 15,
    top: 17,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[200],
    borderRadius: 10,
  },
  searchResultsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontFamily: font.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  searchResultsList: {
    flex: 1,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  searchResultImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 16,
    fontFamily: font.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  searchResultCountry: {
    fontSize: 14,
    fontFamily: font.regular,
    color: colors.text.secondary,
  },
  noResultsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    fontFamily: font.bold,
    color: colors.text.primary,
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    fontFamily: font.regular,
    color: colors.text.secondary,
  },
  createTripButton: {
    backgroundColor: colors.primary.orange,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  createTripButtonText: {
    color: colors.text.primary,
    fontFamily: font.medium,
    fontSize: 16,
  },
  newTripButton: {
    backgroundColor: colors.background.card,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.primary.orange,
  },
  newTripButtonText: {
    color: colors.primary.orange,
    fontFamily: font.medium,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: colors.background.card,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border.primary,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    fontFamily: font.regular,
    color: colors.text.secondary,
    marginTop: 4,
  },
  navTextActive: {
    color: colors.primary.orange,
  },
})
