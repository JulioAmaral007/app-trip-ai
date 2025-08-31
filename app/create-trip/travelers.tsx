import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Radio } from '@/components/Radio'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
import { useRouter } from 'expo-router'
import { use } from 'react'
import { StyleSheet, View } from 'react-native'

export default function TravelersScreen() {
  const { tripData, setTravelerType } = use(TripContext)
  const router = useRouter()

  const travelerOptions = [
    {
      id: 'solo' as const,
      title: 'Just me',
      description: 'A solo traveler in exploration',
    },
    {
      id: 'couple' as const,
      title: 'A couple',
      description: "Two traveler's in tandem",
    },
    {
      id: 'family' as const,
      title: 'Family',
      description: 'A group of fun-loving adventures',
    },
    {
      id: 'friends' as const,
      title: 'Friends',
      description: 'A bunch of thrill-seekers',
    },
  ]

  return (
    <ScreenWrapper>
      <Header leftIcon={<BackButton />} title="Who's going?" />

      <View style={styles.content}>
        <Typo size={22} fontFamily={font.semiBold} style={styles.subtitle}>
          Choose your travelers
        </Typo>

        <View style={styles.optionsContainer}>
          {travelerOptions.map((option) => (
            <Button
              key={option.id}
              style={
                [styles.option, tripData.travelerType === option.id && styles.selectedOption] as any
              }
              onPress={() => setTravelerType(option.id)}>
              <View style={styles.radioContainer}>
                <View style={{ marginRight: 16 }}>
                  <Radio selected={tripData.travelerType === option.id} />
                </View>
                <View style={styles.optionText}>
                  <Typo size={18} fontFamily={font.semiBold} color={colors.text.primary}>
                    {option.title}
                  </Typo>
                  <Typo
                    size={16}
                    fontFamily={font.regular}
                    color={
                      tripData.travelerType === option.id
                        ? colors.text.primary
                        : colors.text.secondary
                    }>
                    {option.description}
                  </Typo>
                </View>
              </View>
            </Button>
          ))}
        </View>
      </View>

      <Button
        style={styles.continueButton}
        onPress={() => router.push('/create-trip/travel-dates')}>
        <Typo size={16} fontFamily={font.semiBold} color={colors.text.inverse}>
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
  subtitle: {
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 16,
  },
  option: {
    backgroundColor: colors.background.card,
    padding: 20,
  },
  selectedOption: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    marginBottom: 4,
  },
  selectedText: {
    color: colors.text.primary,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
  },
})
