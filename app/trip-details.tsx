import { useRouter } from 'expo-router'
import {
  BuildingsIcon,
  CarIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ForkKnifeIcon,
  HeartIcon,
  HouseIcon,
  LightbulbIcon,
  MapPinIcon as LocationPinIcon,
  MapPinIcon,
  MapTrifoldIcon,
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
  const { aiResponse } = useContext(TripContext)
  const [expandedAttractions, setExpandedAttractions] = useState<number[]>([])

  // Dados de exemplo para demonstração (remover quando a IA estiver funcionando)
  const mockData = {
    tripName: 'Aventura em Tóquio',
    destination: 'Tóquio, Japão',
    summary:
      'Tóquio, capital do Japão, combina tradição e modernidade, com templos antigos e arquitetura futurista. É um centro global de cultura, tecnologia e economia, além de ser famosa por sua gastronomia. A cidade também possui uma das redes de transporte mais eficientes do mundo.',
    totalEstimatedCost: 'R$ 12.500,00',
    mainImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    attractions: [
      {
        name: 'Tokyo Tower',
        description: 'Torre de comunicação e observação de 333 metros, símbolo de Tóquio',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
      },
      {
        name: 'Templo Sensoji',
        description:
          'O templo budista mais antigo de Tóquio, localizado em Asakusa, famoso por seu portão Kaminarimon e sua atmosfera tradicional.',
        imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400',
      },
      {
        name: 'Palácio Imperial',
        description: 'Residência oficial do Imperador do Japão, cercado por jardins tradicionais',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      },
      {
        name: 'Tokyo Skytree',
        description: 'Torre de radiodifusão de 634 metros, a mais alta do Japão',
        imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400',
      },
    ],
    itinerary: [
      {
        day: 1,
        date: '15/12/2024',
        title: 'Chegada e Exploração de Asakusa',
        description: 'Primeiro dia dedicado a conhecer o coração tradicional de Tóquio',
        activities: [
          {
            time: '09:00',
            activity: 'Check-in no hotel',
            description: 'Hospedagem em hotel tradicional japonês',
            location: 'Hotel Ryokan Asakusa',
            estimatedCost: 'R$ 0,00',
            tips: 'Chegue cedo para aproveitar o café da manhã tradicional',
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
          },
          {
            time: '11:00',
            activity: 'Visita ao Templo Sensoji',
            description: 'Exploração do templo mais antigo de Tóquio',
            location: 'Templo Sensoji',
            estimatedCost: 'R$ 0,00',
            tips: 'Respeite os costumes locais ao entrar no templo',
            imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400',
          },
          {
            time: '14:00',
            activity: 'Almoço em ramen',
            description: 'Experiência gastronômica tradicional',
            location: 'Ichiran Ramen',
            estimatedCost: 'R$ 45,00',
            tips: 'Experimente o ramen tonkotsu tradicional',
            imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
          },
        ],
        estimatedDailyCost: 'R$ 1.800,00',
      },
      {
        day: 2,
        date: '16/12/2024',
        title: 'Tecnologia e Modernidade',
        description: 'Dia dedicado às atrações modernas e tecnológicas',
        activities: [
          {
            time: '08:00',
            activity: 'Visita ao Tokyo Skytree',
            description: 'Vista panorâmica da cidade do topo da torre',
            location: 'Tokyo Skytree',
            estimatedCost: 'R$ 120,00',
            tips: 'Compre ingressos online para evitar filas',
            imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400',
          },
          {
            time: '12:00',
            activity: 'Almoço em Shibuya',
            description: 'Refeição em restaurante local',
            location: 'Shibuya Crossing',
            estimatedCost: 'R$ 65,00',
            tips: 'Visite o famoso cruzamento após o almoço',
            imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
          },
        ],
        estimatedDailyCost: 'R$ 2.100,00',
      },
    ],
    recommendations: {
      accommodation: {
        description: 'Hotéis tradicionais (ryokan) em Asakusa ou hotéis modernos em Shibuya',
        hotels: [
          {
            name: 'Park Hotel Tokyo',
            description: 'Hotel de luxo com vista para o Tokyo Tower',
            priceRange: 'R$ 1.200-2.000/noite',
            bookingUrl: 'https://www.booking.com/hotel/jp/park-hotel-tokyo.html',
            imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
          },
          {
            name: 'Ryokan Asakusa Shigetsu',
            description: 'Ryokan tradicional com banho público e jardim',
            priceRange: 'R$ 800-1.200/noite',
            bookingUrl: 'https://www.booking.com/hotel/jp/ryokan-asakusa-shigetsu.html',
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
          },
          {
            name: 'Shibuya Excel Hotel Tokyu',
            description: 'Hotel moderno no coração de Shibuya',
            priceRange: 'R$ 600-1.000/noite',
            bookingUrl: 'https://www.booking.com/hotel/jp/shibuya-excel-hotel-tokyu.html',
            imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
          },
        ],
      },
      transportation:
        'Passe do metrô por 7 dias (R$ 200) ou cartão Suica para transporte individual.',
      food: 'Experimente ramen, sushi, tempura e o famoso wagyu. Visite izakayas locais para autenticidade.',
      packing:
        'Roupas confortáveis, calçados para caminhar, adaptador de tomada japonês, câmera e dinheiro local.',
    },
    tips: [
      'Respeite a cultura local e seja silencioso no transporte público',
      'Carregue dinheiro local - muitos lugares não aceitam cartão',
      'Aprenda algumas palavras básicas em japonês (arigato, sumimasen)',
      'Use o metrô - é eficiente e pontual',
      'Reserve restaurantes populares com antecedência',
    ],
  }

  const dataToShow = aiResponse || mockData

  const toggleAttraction = (index: number) => {
    setExpandedAttractions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  if (!dataToShow) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nenhuma viagem encontrada</Text>
        <BackButton />
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
                'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
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
          <Text style={styles.destinationTitle}>{dataToShow.destination.split(',')[0]}</Text>
          <Text style={styles.countryName}>{dataToShow.destination.split(',')[1]}</Text>
          <Text style={styles.summary}>{dataToShow.summary}</Text>
        </View>
        {/* Pontos turísticos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pontos turísticos</Text>
          {dataToShow.attractions?.map((attraction: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.attractionCard,
                expandedAttractions.includes(index) && styles.attractionCardExpanded,
              ]}
              onPress={() => toggleAttraction(index)}>
              <View style={styles.attractionHeader}>
                <Text style={styles.attractionName}>{attraction.name}</Text>
                <MapPinIcon size={16} color="#fff" weight="bold" />
              </View>
              {expandedAttractions.includes(index) && (
                <Text style={styles.attractionDescription}>{attraction.description}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Mapa */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapTrifoldIcon size={24} color="#fff" weight="bold" />
            <Text style={styles.sectionTitle}>Mapa</Text>
          </View>
          <View style={styles.mapContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400' }}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={styles.mapOverlay}>
              <Text style={styles.mapText}>Tóquio</Text>
              <Text style={styles.mapTextJapanese}>東京</Text>
            </View>
          </View>
        </View>

        {/* Veja também */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Veja também</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.relatedContainer}>
            <TouchableOpacity style={styles.relatedCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400',
                }}
                style={styles.relatedImage}
                resizeMode="cover"
              />
              <View style={styles.relatedOverlay}>
                <Text style={styles.relatedTitle}>Barcelona</Text>
                <Text style={styles.relatedCountry}>Espanha</Text>
              </View>
              <TouchableOpacity style={styles.relatedFavorite}>
                <HeartIcon size={16} color="#fff" weight="fill" />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.relatedCard}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
                }}
                style={styles.relatedImage}
                resizeMode="cover"
              />
              <View style={styles.relatedOverlay}>
                <Text style={styles.relatedTitle}>Tóquio</Text>
                <Text style={styles.relatedCountry}>Japão</Text>
              </View>
              <TouchableOpacity style={styles.relatedFavorite}>
                <HeartIcon size={16} color="#fff" weight="fill" />
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Itinerário */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Itinerário</Text>
          {dataToShow.itinerary?.map((day: any, index: number) => (
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

        {/* Recomendações */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recomendações</Text>

          {/* Hospedagem */}
          <View style={styles.recommendationContainer}>
            <View style={styles.recommendationHeader}>
              <HouseIcon size={20} color="#fff" weight="bold" />
              <Text style={styles.recommendationTitle}>Hospedagem</Text>
            </View>
            <Text style={styles.recommendationText}>
              {typeof dataToShow.recommendations?.accommodation === 'string'
                ? dataToShow.recommendations.accommodation
                : dataToShow.recommendations?.accommodation?.description}
            </Text>

            {/* Lista de hotéis */}
            {dataToShow.recommendations?.accommodation?.hotels && (
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

          <View style={styles.recommendationContainer}>
            <View style={styles.recommendationHeader}>
              <CarIcon size={20} color="#fff" weight="bold" />
              <Text style={styles.recommendationTitle}>Transporte</Text>
            </View>
            <Text style={styles.recommendationText}>
              {dataToShow.recommendations?.transportation}
            </Text>
          </View>

          <View style={styles.recommendationContainer}>
            <View style={styles.recommendationHeader}>
              <ForkKnifeIcon size={20} color="#fff" weight="bold" />
              <Text style={styles.recommendationTitle}>Gastronomia</Text>
            </View>
            <Text style={styles.recommendationText}>{dataToShow.recommendations?.food}</Text>
          </View>

          <View style={styles.recommendationContainer}>
            <View style={styles.recommendationHeader}>
              <SuitcaseIcon size={20} color="#fff" weight="bold" />
              <Text style={styles.recommendationTitle}>O que levar</Text>
            </View>
            <Text style={styles.recommendationText}>{dataToShow.recommendations?.packing}</Text>
          </View>
        </View>

        {/* Dicas */}
        {dataToShow.tips && dataToShow.tips.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LightbulbIcon size={24} color="#fff" weight="bold" />
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
    paddingVertical: 24,
    backgroundColor: '#1a1a1a',
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
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
  errorText: {
    fontSize: 18,
    fontFamily: 'outfit',
    color: '#ccc',
    textAlign: 'center',
    marginTop: 100,
  },
})
