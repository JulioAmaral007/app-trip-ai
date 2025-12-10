import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useState } from 'react'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    setIsLoading(true)
    const res = await signIn(email.trim(), password)
    setIsLoading(false)

    if (res.success) {
      // Redireciona para a tela principal após login bem-sucedido
      router.replace('/(tabs)')
    } else {
      Alert.alert('Erro', res.msg || 'Não foi possível fazer login')
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.black }}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
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
              <Typo size={32} fontFamily={font.bold} color={colors.white}>
                Bem-vindo de volta!
              </Typo>
              <Typo
                size={16}
                fontFamily={font.regular}
                color={colors.gray2}
                style={styles.subtitle}>
                Faça login para continuar planejando suas viagens
              </Typo>
            </View>

            <View style={styles.form}>
              <Input
                placeholder="Digite seu email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                icon={<Icons.At size={24} color={colors.gray2} weight="regular" />}
              />
              <Input
                placeholder="Digite sua senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                icon={<Icons.Lock size={24} color={colors.gray2} weight="regular" />}
              />

              <Button loading={isLoading} onPress={handleSubmit} style={styles.loginButton}>
                  <Typo size={18} fontFamily={font.semiBold} color={colors.white}>
                    Entrar
                  </Typo>
              </Button>
            </View>

            <View style={styles.footer}>
              <Typo size={15} fontFamily={font.regular} color={colors.gray2}>
                Não possui uma conta?
              </Typo>
              <Pressable onPress={() => router.push('/(auth)/register' as any)}>
                <Typo size={15} fontFamily={font.semiBold} color={colors.primary}>
                  Criar conta
                </Typo>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    paddingTop: 20,
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
  loginButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
})
