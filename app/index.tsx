import { Button } from '@/components/Button'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { Image } from 'expo-image'
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
        <Image
          style={styles.logo}
          contentFit="contain"
          source={require('@/assets/images/icon.png')}
        />

        <View style={styles.textContainer}>
          <Typo size={36} fontFamily={font.bold} color={colors.white} style={styles.title}>
            Encontre sua próxima viagem
          </Typo>
          <Typo size={16} fontFamily={font.regular} color={colors.gray2} style={styles.subtitle}>
            Viagens personalizadas com assistência de IA
          </Typo>
        </View>

        <Button onPress={() => router.push('/(auth)/sign-in')} style={styles.button}>
          <View style={styles.buttonContent}>
            <Typo size={16} fontFamily={font.bold} color={colors.white}>
              Começar
            </Typo>
            <AirplaneTilt size={20} color={colors.white} weight="bold" />
          </View>
        </Button>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 48,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 44,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    width: '100%',
    maxWidth: 300,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
