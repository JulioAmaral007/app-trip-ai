import { categoryIconMap } from '@/components/category/CategoryPill'
import { Header } from '@/components/layout/Header'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { BackButton } from '@/components/navigation/BackButton'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Input } from '@/components/ui/Input'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import { InterestType, TripContext } from '@/contexts/TripContext'
import { categories } from '@/data/categories'
import { dateUtils } from '@/utils/dateUtils'
import { useRouter } from 'expo-router'
import { use } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function ReviewScreen() {
  const { tripData, setTripName } = use(TripContext)
  const router = useRouter()

  const getTravelerTypeText = (type: string) => {
    switch (type) {
      case 'solo':
        return 'Só eu'
      case 'couple':
        return 'Um casal'
      case 'family':
        return 'Família'
      case 'friends':
        return 'Amigos'
      default:
        return type
    }
  }

  const getSpendingHabitText = (habit: string) => {
    switch (habit) {
      case 'cheap':
        return 'Econômico'
      case 'moderate':
        return 'Moderado'
      case 'luxury':
        return 'Luxo'
      default:
        return habit
    }
  }

  const getInterestIconName = (interest: InterestType) => {
    // Mapeia InterestType para CategoryCode através do id da categoria
    const category = categories.find((cat) => cat.id === interest)
    if (category) {
      return categoryIconMap[category.code]
    }
    // Fallback para interesses antigos que não têm categoria correspondente
    const interestToCodeMap: Record<string, string> = {
      food: 'GASTRONOMY',
      educational: 'CULTURE',
      pool: 'BEACH',
      relax: 'NATURE',
      camp: 'NATURE',
    }
    const code = interestToCodeMap[interest]
    return code ? categoryIconMap[code as keyof typeof categoryIconMap] : 'Urban'
  }

  const getInterestText = (interest: InterestType) => {
    const category = categories.find((cat) => cat.id === interest)
    if (category) {
      return category.name
    }
    // Fallback para interesses antigos
    const interestToTextMap: Record<string, string> = {
      food: 'Gastronomia',
      educational: 'Cultura',
      pool: 'Praia',
      relax: 'Natureza',
      camp: 'Natureza',
    }
    return interestToTextMap[interest] || interest
  }

  const getDateRangeText = () => {
    if (tripData.startDate && tripData.endDate) {
      const startDate = dateUtils.formatDayMonthYear(tripData.startDate.dateString)
      const endDate = dateUtils.formatDayMonthYear(tripData.endDate.dateString)
      return `${startDate} - ${endDate}`
    }
    return 'Selecionar datas'
  }

  return (
    <ScreenWrapper>
      <Header title="Revise sua viagem" leftIcon={<BackButton />} />

      <View style={styles.content}>
        <View style={styles.tripNameSection}>
          <Typo variant={theme.textVariants.title16} style={styles.sectionLabel}>
            Nome da viagem
          </Typo>
          <Input
            value={tripData.tripName}
            placeholder="Digite o nome da viagem"
            onChangeText={setTripName}
          />
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo variant={theme.textVariants.title22}>📍</Typo>
              <View style={styles.reviewItemContent}>
                <Typo variant={theme.textVariants.text14}>
                  Destino
                </Typo>
                <Typo variant={theme.textVariants.text16}>
                  {tripData.destination || 'Bali, Indonesia'}
                </Typo>
              </View>
            </View>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo variant={theme.textVariants.title22}>👥</Typo>
              <View style={styles.reviewItemContent}>
                <Typo variant={theme.textVariants.text14}>
                  Escolha seus viajantes
                </Typo>
                <Typo variant={theme.textVariants.text16}>
                  {getTravelerTypeText(tripData.travelerType)}
                </Typo>
              </View>
            </View>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo variant={theme.textVariants.title22}>📅</Typo>
              <View style={styles.reviewItemContent}>
                <Typo variant={theme.textVariants.text14}>
                  Datas de viagem
                </Typo>
                <Typo variant={theme.textVariants.text16}>
                  {getDateRangeText()}
                </Typo>
              </View>
            </View>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo variant={theme.textVariants.title22}>💰</Typo>
              <View style={styles.reviewItemContent}>
                <Typo variant={theme.textVariants.text14}>
                  Orçamento
                </Typo>
                <Typo variant={theme.textVariants.text16}>
                  {getSpendingHabitText(tripData.spendingHabit)}
                </Typo>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.interestsSection}>
          <Typo variant={theme.textVariants.title16} style={styles.sectionLabel}>
            Interesses
          </Typo>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.interestTags}
            style={styles.interestTagsContainer}>
            {tripData.selectedInterests.map((interest) => (
              <View key={interest} style={styles.interestTag}>
                <Icon name={getInterestIconName(interest)} size={20} color="pureWhite" />
                <Typo variant={theme.textVariants.text16}>
                  {getInterestText(interest)}
                </Typo>
              </View>
            ))}
            <TouchableOpacity style={styles.addInterestButton}>
              <Typo variant={theme.textVariants.text16}>+</Typo>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>

      <Button style={styles.searchButton} onPress={() => router.push('/create-trip/generating')}>
        <Typo variant={theme.textVariants.text16} color={theme.colors.pureWhite}>
          Continuar
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  tripNameSection: {
    marginBottom: 30,
  },
  sectionLabel: {
    marginBottom: 8,
  },
  reviewSection: {
    marginBottom: 30,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray1,
  },
  reviewItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  reviewItemContent: {
    flex: 1,
    gap: 4,
    marginLeft: 16,
  },
  interestsSection: {
    marginBottom: 40,
  },
  interestTagsContainer: {
    marginTop: 8,
  },
  interestTags: {
    flexDirection: 'row',
    gap: 12,
    paddingRight: 20,
  },
  interestTag: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addInterestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray2,
  },
  searchButton: {
    marginBottom: 40,
  },
})
