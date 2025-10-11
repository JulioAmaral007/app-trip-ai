import { useRouter } from 'expo-router'
import {
  BuildingsIcon,
  CarIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ForkKnifeIcon,
  HouseIcon,
  LightbulbIcon,
  MapPinIcon as LocationPinIcon,
  MapPinIcon,
  StarIcon,
  SuitcaseIcon,
} from 'phosphor-react-native'
import { useContext, useState } from 'react'
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BackButton } from '../components/BackButton'
import { colors } from '../constants/theme'
import { TripContext } from '../contexts/TripContext'

export default function TripDetailsScreen() {
  const router = useRouter()
  const { selectedTrip } = useContext(TripContext)
  const [expandedAttractions, setExpandedAttractions] = useState<number[]>([])

  const dataToShow = selectedTrip

  const toggleAttraction = (index: number) => {
    setExpandedAttractions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  if (!dataToShow) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyStateHeader}>
          <BackButton />
        </View>
        <View style={styles.emptyStateContent}>
          <SuitcaseIcon size={80} color="#333" weight="thin" />
          <Text style={styles.emptyStateTitle}>Nenhuma viagem encontrada</Text>
          <Text style={styles.emptyStateSubtitle}>
            Parece que você ainda não criou uma viagem.{'\n'}
            Que tal começar a planejar sua próxima aventura?
          </Text>
          <TouchableOpacity
            style={styles.createTripButton}
            onPress={() => router.push('/create-trip/travelers')}>
            <Text style={styles.createTripButtonText}>Criar Nova Viagem</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header com imagem principal */}
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri:
                dataToShow.mainImage ||
                dataToShow.imageUrl ||
                'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
            }}
            style={styles.mainImage}
            resizeMode="cover"
          />

          {/* Overlay com botão voltar */}
          <View style={styles.imageOverlay}>
            <BackButton />
          </View>

          {/* Botões de categoria */}
          <View style={styles.categoryButtons}>
            <TouchableOpacity style={styles.categoryButton}>
              <StarIcon size={16} color="#fff" weight="fill" />
              <Text style={styles.categoryText}>Destaque</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <BuildingsIcon size={16} color="#fff" weight="fill" />
              <Text style={styles.categoryText}>Urbano</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <MapPinIcon size={16} color="#fff" weight="fill" />
              <Text style={styles.categoryText}>Cidade</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Informações principais abaixo da imagem */}
        <View style={styles.infoSection}>
          {/* Título da viagem se disponível */}
          {(dataToShow.tripName || dataToShow.title) && (
            <Text style={styles.tripTitle}>{dataToShow.tripName || dataToShow.title}</Text>
          )}

          <Text style={styles.destinationTitle}>
            {dataToShow.destination ? dataToShow.destination.split(',')[0] : ''}
          </Text>
          {dataToShow.destination && dataToShow.destination.includes(',') && (
            <Text style={styles.countryName}>{dataToShow.destination.split(',')[1]?.trim()}</Text>
          )}
          {dataToShow.summary && <Text style={styles.summary}>{dataToShow.summary}</Text>}

          {dataToShow.totalEstimatedCost && (
            <View style={styles.costContainer}>
              <Text style={styles.costLabel}>Custo total estimado</Text>
              <Text style={styles.costValue}>{dataToShow.totalEstimatedCost}</Text>
            </View>
          )}
        </View>
        {/* Pontos turísticos */}
        {dataToShow.attractions && dataToShow.attractions.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPinIcon size={24} color="#FF6B35" weight="bold" />
              <Text style={styles.sectionTitle}>Pontos turísticos</Text>
            </View>
            {dataToShow.attractions.map((attraction: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.attractionCard,
                  expandedAttractions.includes(index) && styles.attractionCardExpanded,
                ]}
                onPress={() => toggleAttraction(index)}>
                <View style={styles.attractionHeader}>
                  <Text style={styles.attractionName}>{attraction.name}</Text>
                  <MapPinIcon size={16} color="#FF6B35" weight="bold" />
                </View>
                {expandedAttractions.includes(index) && (
                  <Text style={styles.attractionDescription}>{attraction.description}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Itinerário */}
        {dataToShow.itinerary && dataToShow.itinerary.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <ClockIcon size={24} color="#FF6B35" weight="bold" />
              <Text style={styles.sectionTitle}>Itinerário</Text>
            </View>
            {dataToShow.itinerary.map((day: any, index: number) => (
              <View key={index} style={styles.dayContainer}>
                <View style={styles.dayHeader}>
                  <Text style={styles.dayTitle}>Dia {day.day}</Text>
                  <Text style={styles.dayDate}>{day.date}</Text>
                </View>
                <Text style={styles.dayDescription}>{day.description}</Text>

                {/* Atividades do dia */}
                {day.activities?.map((activity: any, activityIndex: number) => (
                  <View key={activityIndex} style={styles.activityContainer}>
                    {activity.imageUrl && (
                      <Image
                        source={{ uri: activity.imageUrl }}
                        style={styles.activityImage}
                        resizeMode="cover"
                      />
                    )}
                    <View style={styles.activityHeader}>
                      <ClockIcon size={16} color="#FF6B35" weight="bold" />
                      <Text style={styles.activityTime}>{activity.time}</Text>
                      <Text style={styles.activityName}>{activity.activity}</Text>
                    </View>
                    <Text style={styles.activityDescription}>{activity.description}</Text>
                    <View style={styles.activityDetails}>
                      <View style={styles.activityDetail}>
                        <LocationPinIcon size={14} color="#999" weight="bold" />
                        <Text style={styles.activityLocation}>{activity.location}</Text>
                      </View>
                      <View style={styles.activityDetail}>
                        <CurrencyDollarIcon size={14} color="#FF6B35" weight="bold" />
                        <Text style={styles.activityCost}>{activity.estimatedCost}</Text>
                      </View>
                    </View>
                    {activity.tips && (
                      <View style={styles.activityDetail}>
                        <LightbulbIcon size={14} color="#999" weight="bold" />
                        <Text style={styles.activityTips}>{activity.tips}</Text>
                      </View>
                    )}
                  </View>
                ))}

                <View style={styles.dailyCost}>
                  <Text style={styles.dailyCostText}>Custo do dia: {day.estimatedDailyCost}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recomendações */}
        {dataToShow.recommendations && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LightbulbIcon size={24} color="#FF6B35" weight="bold" />
              <Text style={styles.sectionTitle}>Recomendações</Text>
            </View>

            {/* Hospedagem */}
            {dataToShow.recommendations?.accommodation && (
              <View style={styles.recommendationContainer}>
                <View style={styles.recommendationHeader}>
                  <HouseIcon size={20} color="#FF6B35" weight="bold" />
                  <Text style={styles.recommendationTitle}>Hospedagem</Text>
                </View>
                <Text style={styles.recommendationText}>
                  {typeof dataToShow.recommendations.accommodation === 'string'
                    ? dataToShow.recommendations.accommodation
                    : dataToShow.recommendations.accommodation?.description}
                </Text>

                {/* Lista de hotéis */}
                {dataToShow.recommendations.accommodation?.hotels && (
                  <View style={styles.hotelsContainer}>
                    {dataToShow.recommendations.accommodation.hotels.map(
                      (hotel: any, index: number) => (
                        <View key={index} style={styles.hotelCard}>
                          {hotel.imageUrl && (
                            <Image
                              source={{ uri: hotel.imageUrl }}
                              style={styles.hotelImage}
                              resizeMode="cover"
                            />
                          )}
                          <View style={styles.hotelInfo}>
                            <Text style={styles.hotelName}>{hotel.name}</Text>
                            <Text style={styles.hotelDescription}>{hotel.description}</Text>
                            <Text style={styles.hotelPrice}>{hotel.priceRange}</Text>
                            {hotel.bookingUrl && (
                              <TouchableOpacity
                                style={styles.bookingButton}
                                onPress={() => Linking.openURL(hotel.bookingUrl)}>
                                <Text style={styles.bookingButtonText}>Ver no Booking.com</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        </View>
                      )
                    )}
                  </View>
                )}
              </View>
            )}

            {dataToShow.recommendations?.transportation && (
              <View style={styles.recommendationContainer}>
                <View style={styles.recommendationHeader}>
                  <CarIcon size={20} color="#FF6B35" weight="bold" />
                  <Text style={styles.recommendationTitle}>Transporte</Text>
                </View>
                <Text style={styles.recommendationText}>
                  {dataToShow.recommendations.transportation}
                </Text>
              </View>
            )}

            {dataToShow.recommendations?.food && (
              <View style={styles.recommendationContainer}>
                <View style={styles.recommendationHeader}>
                  <ForkKnifeIcon size={20} color="#FF6B35" weight="bold" />
                  <Text style={styles.recommendationTitle}>Gastronomia</Text>
                </View>
                <Text style={styles.recommendationText}>{dataToShow.recommendations.food}</Text>
              </View>
            )}

            {dataToShow.recommendations?.packing && (
              <View style={styles.recommendationContainer}>
                <View style={styles.recommendationHeader}>
                  <SuitcaseIcon size={20} color="#FF6B35" weight="bold" />
                  <Text style={styles.recommendationTitle}>O que levar</Text>
                </View>
                <Text style={styles.recommendationText}>{dataToShow.recommendations.packing}</Text>
              </View>
            )}
          </View>
        )}

        {/* Dicas */}
        {dataToShow.tips && dataToShow.tips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LightbulbIcon size={24} color="#FF6B35" weight="bold" />
              <Text style={styles.sectionTitle}>Dicas Importantes</Text>
            </View>
            {dataToShow.tips.map((tip: string, index: number) => (
              <View key={index} style={styles.tipContainer}>
                <CheckCircleIcon size={16} color="#FF6B35" weight="fill" />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Espaçamento final */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  headerContainer: {
    position: 'relative',
    height: 400,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  categoryButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    gap: 8,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
  },

  categoryText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'outfit-medium',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    backgroundColor: '#1a1a1a',
  },
  tripTitle: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    color: '#FF6B35',
    marginBottom: 12,
    textAlign: 'center',
  },
  destinationTitle: {
    fontSize: 32,
    fontFamily: 'outfit-bold',
    color: '#fff',
    marginBottom: 4,
  },
  countryName: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: '#fff',
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[300],
  },

  headerTitle: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
    color: colors.neutral[700],
  },
  content: {
    flex: 1,
  },
  attractionCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  attractionCardExpanded: {
    backgroundColor: '#333',
  },
  attractionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attractionName: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#fff',
  },

  attractionDescription: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
    marginTop: 8,
    lineHeight: 20,
  },
  mapContainer: {
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  mapText: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  mapTextJapanese: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  relatedContainer: {
    flexDirection: 'row',
  },
  relatedCard: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  relatedImage: {
    width: '100%',
    height: '100%',
  },
  relatedOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  relatedTitle: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    color: '#fff',
  },
  relatedCountry: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
  },
  relatedFavorite: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tripName: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
    color: '#fff',
    marginBottom: 8,
  },
  destination: {
    fontSize: 18,
    fontFamily: 'outfit-medium',
    color: '#FF6B35',
    marginBottom: 12,
  },
  summary: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#fff',
    lineHeight: 24,
    marginBottom: 16,
  },
  costContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  costLabel: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#fff',
  },
  costValue: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#fff',
  },
  section: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'outfit-bold',
    color: '#fff',
    marginLeft: 8,
  },
  dayContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayTitle: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    color: '#fff',
  },
  dayDate: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
  },
  dayDescription: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
    marginBottom: 12,
  },
  activityContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  activityImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  activityDetails: {
    marginTop: 8,
  },
  activityDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
    fontFamily: 'outfit-bold',
    color: '#FF6B35',
    marginRight: 8,
  },
  activityName: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#fff',
    flex: 1,
  },
  activityDescription: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
    marginBottom: 4,
  },
  activityLocation: {
    fontSize: 12,
    fontFamily: 'outfit',
    color: '#999',
    marginLeft: 4,
  },
  activityCost: {
    fontSize: 12,
    fontFamily: 'outfit-medium',
    color: '#FF6B35',
    marginLeft: 4,
  },
  activityTips: {
    fontSize: 12,
    fontFamily: 'outfit',
    color: '#999',
    fontStyle: 'italic',
    marginLeft: 4,
  },
  dailyCost: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  dailyCostText: {
    fontSize: 14,
    fontFamily: 'outfit-medium',
    color: '#ccc',
    textAlign: 'right',
  },
  recommendationContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    color: '#fff',
    marginLeft: 8,
  },
  recommendationText: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
    lineHeight: 20,
  },
  tipContainer: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
    lineHeight: 20,
    marginLeft: 8,
    flex: 1,
  },
  hotelsContainer: {
    marginTop: 12,
  },
  hotelCard: {
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  hotelImage: {
    width: '100%',
    height: 120,
  },
  hotelInfo: {
    padding: 12,
  },
  hotelName: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    color: '#fff',
    marginBottom: 4,
  },
  hotelDescription: {
    fontSize: 14,
    fontFamily: 'outfit',
    color: '#ccc',
    marginBottom: 4,
  },
  hotelPrice: {
    fontSize: 14,
    fontFamily: 'outfit-medium',
    color: '#FF6B35',
    marginBottom: 8,
  },
  bookingButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  bookingButtonText: {
    fontSize: 12,
    fontFamily: 'outfit-medium',
    color: '#fff',
  },
  bottomSection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  newTripButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  newTripButtonText: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#fff',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navIconActive: {
    color: '#FF6B35',
  },
  navText: {
    fontSize: 12,
    fontFamily: 'outfit',
    color: '#999',
  },
  navTextActive: {
    color: '#FF6B35',
  },
  emptyStateHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyStateContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontFamily: 'outfit-bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    fontFamily: 'outfit',
    color: '#999',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  createTripButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  createTripButtonText: {
    fontSize: 16,
    fontFamily: 'outfit-medium',
    color: '#fff',
  },
  bottomSpacing: {
    height: 40,
  },
})
