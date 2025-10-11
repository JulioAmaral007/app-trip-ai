import { Button } from '@/components/Button'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import { AirplaneTiltIcon } from 'phosphor-react-native'
import { use, useEffect } from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'

export default function WelcomeScreen() {
  const { user } = use(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/(tabs)')
    }
  }, [user])

  return (
    <ImageBackground
      source={require('../assets/images/beach.png')}
      style={styles.container}
      resizeMode="cover">
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require('@/assets/images/icon.png')}
      />

      <View style={styles.textContainer}>
        <Typo size={60} fontFamily={font.bold} color={colors.text.primary} style={styles.title}>
          SEARCH{'\n'}AROUND{'\n'}THE{'\n'}WORLD
        </Typo>
      </View>

      <View style={styles.buttonContainer}>
        <Typo
          size={24}
          fontFamily={font.regular}
          color={colors.text.primary}
          style={styles.subtitle}>
          Find best trip with{'\n'}AI assistance
        </Typo>

        <Button
          onPress={() => router.push('/(auth)')}
          style={{
            backgroundColor: colors.background.tertiary,
          }}>
          <Typo size={18} fontFamily={font.bold} color={colors.text.primary}>
            START <AirplaneTiltIcon size={20} color={colors.text.primary} />
          </Typo>
        </Button>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: '30%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    lineHeight: 60,
    marginBottom: 20,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  subtitle: {
    marginBottom: 30,
    textAlign: 'center',
  },
})
