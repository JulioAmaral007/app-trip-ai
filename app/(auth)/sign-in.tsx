import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Logo } from '@/components/Logo'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useState } from 'react'
import {
  Alert,
  Pressable,
  StyleSheet,
  View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { signIn } = useAuth()


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
    <ScreenWrapper scrollable>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Logo />

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
            <Pressable onPress={() => router.push('/(auth)/sign-up' as any)}>
              <Typo size={15} fontFamily={font.semiBold} color={colors.primary}>
                Criar conta
              </Typo>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
  },
  form: {
    gap: 20,
    marginBottom: 30,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 20,
  },
})
