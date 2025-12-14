import { CityCard } from '@/components/city/CityCard'
import { Header } from '@/components/layout/Header'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { BackButton } from '@/components/navigation/BackButton'
import { Icon } from '@/components/ui/Icon'
import { Input } from '@/components/ui/Input'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
import { cities } from '@/data/cities'
import { useRouter } from 'expo-router'
import { use, useMemo, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

export default function SelectCityScreen() {
  const { setDestination } = use(TripContext)
  const router = useRouter()
  const [searchText, setSearchText] = useState('')

  const filteredCities = useMemo(() => {
    if (!searchText.trim()) {
      return cities
    }

    const lowerSearchText = searchText.toLowerCase()
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(lowerSearchText) ||
        city.country.toLowerCase().includes(lowerSearchText)
    )
  }, [searchText])

  const handleCitySelect = (city: typeof cities[0]) => {
    const destination = `${city.name}, ${city.country}`
    setDestination(destination)
    router.push('/create-trip/travelers')
  }

  return (
    <ScreenWrapper>
      <Header leftIcon={<BackButton />} title="Escolha o destino" />

      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Input
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Buscar cidade..."
            icon={<Icon name="Search-outline" size={20} color="gray2" />}
            containerStyle={styles.searchInput}
          />
        </View>

        {filteredCities.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Typo variant={theme.textVariants.text16} color={theme.colors.gray2}>
              Nenhuma cidade encontrada
            </Typo>
          </View>
        ) : (
          <FlatList
            data={filteredCities}
            renderItem={({ item }) => (
              <View style={styles.cityCardContainer}>
                <CityCard
                  cityPreview={{
                    id: item.id,
                    name: item.name,
                    country: item.country,
                    coverImage: item.coverImage,
                    isFavorite: false,
                  }}
                  type="large"
                  disableFavorite={true}
                  onPress={() => handleCitySelect(item)}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
  },
  searchContainer: {
    marginBottom: 20,
    paddingHorizontal: 0,
  },
  searchInput: {
    marginBottom: 0,
  },
  listContent: {
    gap: 16,
    paddingBottom: 40,
  },
  cityCardContainer: {
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
})
