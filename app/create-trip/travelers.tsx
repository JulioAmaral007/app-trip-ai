import { Header } from '@/components/layout/Header'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { BackButton } from '@/components/navigation/BackButton'
import { Button } from '@/components/ui/Button'
import { Radio } from '@/components/ui/Radio'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
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
      title: 'Só eu',
      description: 'Um viajante solo em exploração',
    },
    {
      id: 'couple' as const,
      title: 'Um casal',
      description: 'Dois viajantes em tandem',
    },
    {
      id: 'family' as const,
      title: 'Família',
      description: 'Um grupo de aventureiros divertidos',
    },
    {
      id: 'friends' as const,
      title: 'Amigos',
      description: 'Um bando de aventureiros',
    },
  ]

  return (
    <ScreenWrapper>
      <Header leftIcon={<BackButton />} title="Quem vai?" />

      <View style={styles.content}>
        <Typo variant={theme.textVariants.title22} style={styles.subtitle}>
          Escolha seus viajantes
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
                  <Typo variant={theme.textVariants.title22} color={theme.colors.pureWhite}>
                    {option.title}
                  </Typo>
                  <Typo
                    variant={theme.textVariants.text16}
                    color={
                      tripData.travelerType === option.id
                        ? theme.colors.pureWhite
                        : theme.colors.gray2
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
  subtitle: {
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 16,
  },
  option: {
    backgroundColor: theme.colors.gray1,
    padding: 20,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
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
    color: theme.colors.pureWhite,
  },
  continueButton: {
    marginBottom: 40,
  },
})
