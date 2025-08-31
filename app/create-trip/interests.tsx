import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
import { useRouter } from 'expo-router'
import {
  BuildingsIcon,
  ForkKnifeIcon,
  GraduationCapIcon,
  MountainsIcon,
  SmileyIcon,
  SwimmingPoolIcon,
  TentIcon,
  UmbrellaIcon,
} from 'phosphor-react-native'
import { use } from 'react'
import { StyleSheet, View } from 'react-native'

export default function InterestsScreen() {
  const { tripData, addInterest, removeInterest } = use(TripContext)
  const router = useRouter()

  const interests = [
    { id: 'food', title: 'Food & Drinks', icon: ForkKnifeIcon },
    { id: 'urban', title: 'Urban Areas', icon: BuildingsIcon },
    { id: 'adventure', title: 'Adventure', icon: MountainsIcon },
    { id: 'educational', title: 'Educational', icon: GraduationCapIcon },
    { id: 'beach', title: 'Beach', icon: UmbrellaIcon },
    { id: 'pool', title: 'Pool', icon: SwimmingPoolIcon },
    { id: 'relax', title: 'Relax', icon: SmileyIcon },
    { id: 'camp', title: 'Camp', icon: TentIcon },
  ]

  const toggleInterest = (interestId: string) => {
    if (tripData.selectedInterests.includes(interestId as any)) {
      removeInterest(interestId as any)
    } else {
      addInterest(interestId as any)
    }
  }

  const isSelected = (interestId: string) => tripData.selectedInterests.includes(interestId as any)

  return (
    <ScreenWrapper>
      <Header title="Interest" leftIcon={<BackButton />} />

      <View style={styles.selectionInfo}>
        <Typo size={14} color={colors.text.secondary}>
          {tripData.selectedInterests.length}/3 interesses selecionados
        </Typo>
      </View>

      <View style={styles.interestsContainer}>
        {interests.map((interest) => {
          const isCurrentlySelected = isSelected(interest.id)
          const isDisabled = !isCurrentlySelected && tripData.selectedInterests.length >= 3
          const IconComponent = interest.icon

          return (
            <Button
              key={interest.id}
              style={
                [
                  styles.interestButton,
                  isCurrentlySelected && styles.selectedInterest,
                  isDisabled && styles.disabledInterest,
                ] as any
              }
              onPress={() => toggleInterest(interest.id)}>
              <IconComponent
                size={20}
                color={isCurrentlySelected ? colors.text.inverse : colors.text.primary}
                weight="fill"
              />
              <Typo size={16} fontFamily={font.semiBold} color={colors.text.primary}>
                {interest.title}
              </Typo>
            </Button>
          )
        })}
      </View>

      <Button style={styles.continueButton} onPress={() => router.push('/create-trip/review-trip')}>
        <Typo size={16} fontFamily={font.semiBold} color={colors.text.inverse}>
          Continue
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  selectionInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  interestsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 24,
  },
  interestButton: {
    backgroundColor: colors.background.card,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  selectedInterest: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  disabledInterest: {
    opacity: 0.5,
  },
  interestIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
  },
})
