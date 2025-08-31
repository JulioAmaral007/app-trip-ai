import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { Island } from 'phosphor-react-native'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Destination {
  id: string
  name: string
  country: string
  image: string
  category: string
  isFeatured: boolean
}

interface Category {
  id: string
  name: string
  icon: any
}

interface DestinationsSectionProps {
  destinations: Destination[]
  categories: Category[]
  activeCategory: string
  onDestinationSelect: (destination: Destination) => void
}

export function DestinationsSection({
  destinations,
  categories,
  activeCategory,
  onDestinationSelect,
}: DestinationsSectionProps) {
  const getFilteredDestinations = () => {
    let filtered = destinations

    // Filtrar por categoria
    if (activeCategory === '1') {
      // Destaques - mostrar destinos marcados como featured
      filtered = filtered.filter((destination) => destination.isFeatured)
    } else {
      // Outras categorias - filtrar por categoria específica
      filtered = filtered.filter((destination) => destination.category === activeCategory)
    }

    return filtered
  }

  const categoryName = categories.find((cat) => cat.id === activeCategory)?.name
  const filteredDestinations = getFilteredDestinations()

  return (
    <View style={styles.destinationsSection}>
      <Typo style={styles.sectionTitle}>{categoryName} Destinations</Typo>

      {filteredDestinations.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.destinationsContainer}
          contentContainerStyle={styles.destinationsContent}>
          {filteredDestinations.slice(0, 8).map((destination) => (
            <TouchableOpacity
              key={destination.id}
              style={styles.destinationCard}
              onPress={() => onDestinationSelect(destination)}>
              <Image
                source={{ uri: destination.image }}
                style={styles.destinationImage}
                resizeMode="cover"
              />
              <View style={styles.destinationOverlay}>
                <Text style={styles.destinationName}>{destination.name}</Text>
                <Text style={styles.destinationCountry}>{destination.country}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
                  <View style={styles.emptyState}>
            <Island size={48} color={colors.text.secondary} style={styles.emptyIcon} />
          <Typo style={styles.emptyTitle}>Nenhum destino encontrado</Typo>
          <Typo style={styles.emptySubtitle}>
            Ainda não temos destinos para a categoria "{categoryName}".
            {'\n'}Que tal explorar outras opções?
          </Typo>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  destinationsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: font.bold,
    color: colors.text.primary,
    marginBottom: 16,
  },
  destinationsContainer: {
    marginBottom: 10,
  },
  destinationsContent: {
    paddingRight: 20,
  },
  destinationCard: {
    width: 200,
    height: 140,
    borderRadius: 12,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: colors.background.overlay,
  },
  destinationName: {
    fontSize: 16,
    fontFamily: font.bold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  destinationCountry: {
    fontSize: 14,
    fontFamily: font.regular,
    color: colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: font.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: font.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
})
