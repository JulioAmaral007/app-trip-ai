import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
import { dateUtils } from '@/utils/dateUtils'
import { useRouter } from 'expo-router'
import { use } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function ReviewScreen() {
  const { tripData, setTripName } = use(TripContext)
  const router = useRouter()

  const getTravelerTypeText = (type: string) => {
    switch (type) {
      case 'solo':
        return 'Just me'
      case 'couple':
        return 'A couple'
      case 'family':
        return 'Family'
      case 'friends':
        return 'Friends'
      default:
        return type
    }
  }

  const getSpendingHabitText = (habit: string) => {
    switch (habit) {
      case 'cheap':
        return 'Cheap'
      case 'moderate':
        return 'Moderate'
      case 'luxury':
        return 'Luxury'
      default:
        return habit
    }
  }

  const getInterestIcon = (interest: string) => {
    switch (interest) {
      case 'food':
        return '🍽️'
      case 'urban':
        return '🏙️'
      case 'adventure':
        return '🏔️'
      case 'educational':
        return '🎓'
      case 'beach':
        return '🏖️'
      case 'pool':
        return '🏊'
      case 'relax':
        return '😌'
      case 'camp':
        return '🏕️'
      default:
        return '📍'
    }
  }

  const getInterestText = (interest: string) => {
    switch (interest) {
      case 'food':
        return 'Food & Drinks'
      case 'urban':
        return 'Urban Areas'
      case 'adventure':
        return 'Adventure'
      case 'educational':
        return 'Educational'
      case 'beach':
        return 'Beach'
      case 'pool':
        return 'Pool'
      case 'relax':
        return 'Relax'
      case 'camp':
        return 'Camp'
      default:
        return interest
    }
  }

  const getDateRangeText = () => {
    if (tripData.startDate && tripData.endDate) {
      const startDate = dateUtils.formatDayMonthYear(tripData.startDate.dateString)
      const endDate = dateUtils.formatDayMonthYear(tripData.endDate.dateString)
      return `${startDate} - ${endDate}`
    }
    return 'Select dates'
  }

  return (
    <ScreenWrapper>
      <Header title="Review your trip" leftIcon={<BackButton />} />

      <View style={styles.content}>
        <View style={styles.tripNameSection}>
          <Typo fontFamily={font.semiBold} style={styles.sectionLabel}>
            Trip Name
          </Typo>
          <Input
            value={tripData.tripName}
            placeholder="Enter trip name"
            onChangeText={setTripName}
          />
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>📍</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.gray2}>
                  Destination
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  {tripData.destination || 'Bali, Indonesia'}
                </Typo>
              </View>
            </View>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>👥</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.gray2}>
                  Choose your travelers
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  {getTravelerTypeText(tripData.travelerType)}
                </Typo>
              </View>
            </View>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>📅</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.gray2}>
                  Travel dates
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  {getDateRangeText()}
                </Typo>
              </View>
            </View>
          </View>

          <View style={styles.reviewItem}>
            <View style={styles.reviewItemHeader}>
              <Typo size={20}>💰</Typo>
              <View style={styles.reviewItemContent}>
                <Typo size={14} color={colors.gray2}>
                  Budget
                </Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  {getSpendingHabitText(tripData.spendingHabit)}
                </Typo>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.interestsSection}>
          <Typo fontFamily={font.semiBold} style={styles.sectionLabel}>
            Interest
          </Typo>
          <View style={styles.interestTags}>
            {tripData.selectedInterests.map((interest) => (
              <View key={interest} style={styles.interestTag}>
                <Typo size={20}>{getInterestIcon(interest)}</Typo>
                <Typo size={16} fontFamily={font.semiBold}>
                  {getInterestText(interest)}
                </Typo>
              </View>
            ))}
            <TouchableOpacity style={styles.addInterestButton}>
              <Typo size={16}>+</Typo>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Button style={styles.searchButton} onPress={() => router.push('/create-trip/generating')}>
        <Typo size={16} fontFamily={font.semiBold} color={colors.white}>
          Continue
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
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
    borderBottomColor: colors.gray1,
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
  interestTags: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  interestTag: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInterestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  searchButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
  },
})
