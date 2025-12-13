import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import { AirplaneTilt } from 'phosphor-react-native'
import { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

export default function WelcomeScreen() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/(tabs)')
    }
  }, [user])

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Logo />
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Typo variant={theme.textVariants.title28} color={theme.colors.text} style={styles.title}>
              Encontre sua próxima viagem
            </Typo>
            <Typo variant={theme.textVariants.text14} color={theme.colors.text} style={styles.subtitle}>
              Viagens personalizadas com assistência de IA
            </Typo>
          </View>

          <Button onPress={() => router.push('/(auth)/sign-in')} style={styles.button}>
            <View style={styles.buttonContent}>
              <Typo variant={theme.textVariants.text16} color={theme.colors.text}>
                Começar
              </Typo>
              <AirplaneTilt size={20} color={theme.colors.text} weight="bold" />
            </View>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
  },
  bottomContainer: {
    width: '100%',
    paddingBottom: 40,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
  },
  button: {
    width: '100%',
    alignSelf: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
