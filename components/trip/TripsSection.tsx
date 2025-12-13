import { TripCard } from '@/components/trip/TripCard'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import type { GeneratedTripType } from '@/services/types'
import { StyleSheet, View } from 'react-native'

interface Trip extends Partial<GeneratedTripType> {
  // Campos para compatibilidade com viagens mock
  name?: string
  country?: string
  image?: string
  isFavorite?: boolean
}

interface TripsSectionProps {
  trips: Trip[]
  onTripPress: (trip: Trip) => void
  onToggleFavorite: (tripId: string) => void
}

export function TripsSection({ trips, onTripPress, onToggleFavorite }: TripsSectionProps) {
  if (trips.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Typo style={styles.emptyTitle}>Nenhuma viagem planejada ainda</Typo>
        <Typo style={styles.emptySubtitle}>
          Parece que é hora de planejar uma nova experiência de viagem! Comece abaixo
        </Typo>
      </View>
    )
  }

  return (
    <View style={styles.tripsContainer}>
      {trips.map((trip, index) => (
        <TripCard
          key={trip.id || index}
          trip={trip}
          index={index}
          onPress={onTripPress}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tripsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  emptyTitle: {
    fontSize: 24,
    fontFamily: theme.textVariants.defaults.fontFamily,
    color: theme.colors.pureWhite,
    textAlign: 'center',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    fontFamily: theme.textVariants.defaults.fontFamily,
    color: theme.colors.gray2,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
})
