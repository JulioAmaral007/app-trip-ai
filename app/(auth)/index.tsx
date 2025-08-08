import { Button } from '@/components/Button'
import { colors, font } from '@/constants/theme'
import { AuthContext } from '@/contexts/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { AppleLogoIcon, GoogleLogoIcon } from 'phosphor-react-native'
import { use } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function AuthScreen() {
  const { login } = use(AuthContext)
  const router = useRouter()

  const handleGoogleLogin = async () => {
    // Simular processo de login do Google
    console.log('Google login pressed')
    await login() // Marca o usuário como logado
    router.push('/(tabs)')
  }

  const handleAppleLogin = async () => {
    // Simular processo de login da Apple
    console.log('Apple login pressed')
    await login() // Marca o usuário como logado
    router.push('/(tabs)')
  }

  return (
    <LinearGradient
      colors={colors.gradients.secondary as [string, string]}
      style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.welcomeText}>Bem-vindo ao</Text>
        <Text style={styles.appName}>Trip AI</Text>
        <Text style={styles.subtitle}>Planeje suas viagens com inteligência artificial</Text>
      </View>

      {/* Social Login Section */}
      <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>Entrar com</Text>

        <View style={styles.buttonContainer}>
          {/* Google Button */}
          <Button style={styles.googleButton} onPress={handleGoogleLogin}>
            <View style={styles.buttonContent}>
              <GoogleLogoIcon size={32} color={colors.text.primary} />
              <Text style={styles.googleText}>Continuar com Google</Text>
            </View>
          </Button>

          {/* Apple Button */}
          <Button style={styles.appleButton} onPress={handleAppleLogin}>
            <View style={styles.buttonContent}>
              <AppleLogoIcon size={32} color={colors.text.primary} />
              <Text style={styles.appleText}>Continuar com Apple</Text>
            </View>
          </Button>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ao continuar, você concorda com nossos{' '}
          <Text style={styles.linkText}>Termos de Serviço</Text>,{' '}
          <Text style={styles.linkText}>Política de Privacidade</Text> e{' '}
          <Text style={styles.linkText}>Política de Cookies</Text>
        </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 18,
    color: colors.text.secondary,
    fontFamily: font.regular,
    marginBottom: 8,
  },
  appName: {
    fontSize: 36,
    color: colors.text.primary,
    fontFamily: font.bold,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: font.regular,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  socialSection: {
    flex: 1,
    justifyContent: 'center',
  },
  socialTitle: {
    fontSize: 16,
    color: colors.text.secondary,
    fontFamily: font.medium,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 16,
  },
  googleButton: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.primary,
    height: 56,
    borderRadius: 16,
  },
  appleButton: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.border.primary,
    height: 56,
    borderRadius: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  googleText: {
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: font.medium,
  },
  appleIcon: {
    fontSize: 20,
  },
  appleText: {
    fontSize: 16,
    color: colors.text.primary,
    fontFamily: font.medium,
  },
  footer: {
    paddingTop: 40,
  },
  footerText: {
    textAlign: 'center',
    color: colors.text.tertiary,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: font.regular,
  },
  linkText: {
    color: colors.text.link,
    fontFamily: font.medium,
  },
})
