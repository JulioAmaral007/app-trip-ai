import { colors, font } from '@/constants/theme'
import type { GeneratedTripType } from '@/services/types'
import { HeartIcon } from 'phosphor-react-native'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Trip extends Partial<GeneratedTripType> {
  name?: string
  country?: string
  image?: string
  isFavorite?: boolean
}

interface TripCardProps {
  trip: Trip
  index: number
  onPress: (trip: Trip) => void
  onToggleFavorite: (tripId: string) => void
}

export function TripCard({ trip, index, onPress, onToggleFavorite }: TripCardProps) {
  const tripId = trip.id || index.toString()

  return (
    <TouchableOpacity style={styles.tripCard} onPress={() => onPress(trip)}>
      <Image
        source={{
          uri:
            trip.image ||
            `https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80`,
        }}
        style={styles.tripImage}
        resizeMode="cover"
      />

      <View style={styles.tripOverlay}>
        <Text style={styles.tripName}>
          {trip.name || trip.tripName || trip.destination?.split(',')[0]}
        </Text>
        <Text style={styles.tripCountry}>
          {trip.country || trip.destination?.split(',')[1] || trip.destination}
        </Text>
      </View>

      <TouchableOpacity style={styles.favoriteButton} onPress={() => onToggleFavorite(tripId)}>
        <HeartIcon
          size={20}
          color={colors.primary}
          weight={trip.isFavorite ? 'fill' : 'regular'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tripCard: {
    height: 250,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  tripImage: {
    width: '100%',
    height: '100%',
  },
  tripOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: colors.gray1,
  },
  tripName: {
    fontSize: 24,
    fontFamily: font.bold,
    color: colors.white,
    marginBottom: 4,
  },
  tripCountry: {
    fontSize: 16,
    fontFamily: font.medium,
    color: colors.gray2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
