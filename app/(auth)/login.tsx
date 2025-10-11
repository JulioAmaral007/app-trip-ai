import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useRef, useState } from 'react'
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

const { height } = Dimensions.get('window')

export default function LoginScreen() {
  const router = useRouter()
  const emailRef = useRef('')
  const passwordRef = useRef('')
  const { login: loginUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Preencha todos os campos')
      return
    }

    setIsLoading(true)
    const res = await loginUser(emailRef.current, passwordRef.current)
    setIsLoading(false)

    if (!res.success) {
      Alert.alert('Erro', res.msg)
    }
  }

  return (
    <LinearGradient
      colors={colors.gradients.secondary as [string, string]}
      style={styles.gradientContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <View style={styles.backButtonContainer}>
          <BackButton iconSize={28} />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                resizeMode="contain"
                source={require('@/assets/images/icon.png')}
              />
            </View>

            <View style={styles.welcomeContainer}>
              <Typo size={32} fontFamily={font.bold} color={colors.text.primary}>
                Bem-vindo de volta!
              </Typo>
              <Typo
                size={16}
                fontFamily={font.regular}
                color={colors.text.secondary}
                style={styles.subtitle}>
                Entre na sua conta para continuar explorando o mundo
              </Typo>
            </View>

            <View style={styles.form}>
              <Input
                placeholder="Digite seu email"
                onChangeText={(value: string) => (emailRef.current = value)}
                icon={<Icons.At size={24} color={colors.text.secondary} weight="regular" />}
              />
              <Input
                placeholder="Digite sua senha"
                secureTextEntry
                onChangeText={(value: string) => (passwordRef.current = value)}
                icon={<Icons.Lock size={24} color={colors.text.secondary} weight="regular" />}
              />

              <Pressable style={styles.forgotPasswordContainer}>
                <Typo
                  size={14}
                  fontFamily={font.medium}
                  color={colors.primary.orange}
                  style={styles.forgotPassword}>
                  Esqueceu sua senha?
                </Typo>
              </Pressable>

              <Button loading={isLoading} onPress={handleSubmit} style={styles.loginButton}>
                <LinearGradient
                  colors={colors.gradients.primary as [string, string]}
                  style={styles.buttonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}>
                  <Typo size={18} fontFamily={font.semiBold} color={colors.text.primary}>
                    Entrar
                  </Typo>
                </LinearGradient>
              </Button>
            </View>

            <View style={styles.footer}>
              <Typo size={15} fontFamily={font.regular} color={colors.text.secondary}>
                Ainda não possui uma conta?
              </Typo>
              <Pressable onPress={() => router.push('/(auth)')}>
                <Typo size={15} fontFamily={font.semiBold} color={colors.primary.orange}>
                  Cadastre-se
                </Typo>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? height * 0.08 : 50,
    left: 24,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: Platform.OS === 'ios' ? height * 0.08 : 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 50,
  },
  logo: {
    height: 140,
    width: 140,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  form: {
    flex: 1,
    gap: 20,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: -10,
  },
  forgotPassword: {
    textAlign: 'right',
  },
  loginButton: {
    marginTop: 10,
  },
  buttonGradient: {
    flex: 1,
    height: 52,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingTop: 20,
  },
})
