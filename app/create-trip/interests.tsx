import { categoryIconMap } from '@/components/category/CategoryPill'
import { Header } from '@/components/layout/Header'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { BackButton } from '@/components/navigation/BackButton'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import { InterestType, TripContext } from '@/contexts/TripContext'
import { categories } from '@/data/categories'
import { useRouter } from 'expo-router'
import { use } from 'react'
import { StyleSheet, View } from 'react-native'

// Mapeamento entre IDs das categorias e tipos de interesse válidos
// Cada categoria agora mapeia diretamente para seu próprio ID como tipo de interesse único
const categoryToInterestMap: Record<string, InterestType> = {
  urban: 'urban',
  beach: 'beach',
  nature: 'nature',
  culture: 'culture',
  shopping: 'shopping',
  history: 'history',
  adventure: 'adventure',
  luxury: 'luxury',
  gastronomy: 'gastronomy',
}

export default function InterestsScreen() {
  const { tripData, addInterest, removeInterest } = use(TripContext)
  const router = useRouter()

  const toggleInterest = (categoryId: string) => {
    const interestType = categoryToInterestMap[categoryId]
    if (!interestType) return

    if (tripData.selectedInterests.includes(interestType)) {
      removeInterest(interestType)
    } else {
      addInterest(interestType)
    }
  }

  const isSelected = (categoryId: string) => {
    const interestType = categoryToInterestMap[categoryId]
    return interestType ? tripData.selectedInterests.includes(interestType) : false
  }

  return (
    <ScreenWrapper>
      <Header title="Interesses" leftIcon={<BackButton />} />

      <View style={styles.selectionInfo}>
        <Typo variant={theme.textVariants.text14}>
          {tripData.selectedInterests.length}/3 interesses selecionados
        </Typo>
      </View>

      <View style={styles.interestsContainer}>
        {categories
          .filter((category) => category.code !== 'FAVORITE')
          .map((category) => {
            const isCurrentlySelected = isSelected(category.id)
            const isDisabled = !isCurrentlySelected && tripData.selectedInterests.length >= 3

            return (
              <Button
                key={category.id}
                style={
                  [
                    styles.interestButton,
                    isCurrentlySelected && styles.selectedInterest,
                    isDisabled && styles.disabledInterest,
                  ] as any
                }
                onPress={() => toggleInterest(category.id)}>
                <Icon
                  name={categoryIconMap[category.code]}
                  size={20}
                  color={isCurrentlySelected ? 'pureWhite' : 'pureWhite'}
                />
                <Typo variant={theme.textVariants.text16}>
                  {category.name}
                </Typo>
              </Button>
            )
          })}
      </View>

      <Button style={styles.continueButton} onPress={() => router.push('/create-trip/review-trip')}>
        <Typo variant={theme.textVariants.text16} color={theme.colors.pureWhite}>
          Continuar
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  selectionInfo: {
    alignItems: 'center',
  },
  interestsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 14,
  },
  interestButton: {
    backgroundColor: theme.colors.gray1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  selectedInterest: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  disabledInterest: {
    opacity: 0.5,
  },
  interestIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  continueButton: {
    marginBottom: 40,
  },
})
