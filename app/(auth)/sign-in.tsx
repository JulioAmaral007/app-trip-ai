import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Logo } from '@/components/ui/Logo'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
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
        <Logo />

        <View style={styles.welcomeContainer}>
          <Typo variant={theme.textVariants.title28} color={theme.colors.text}>
            Bem-vindo de volta!
          </Typo>
          <Typo
            variant={theme.textVariants.text14}
            color={theme.colors.sandBeige}
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
            icon={<Icons.At size={24} color={theme.colors.gray2} weight="bold" />}
          />
          <Input
            placeholder="Digite sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon={<Icons.Lock size={24} color={theme.colors.gray2} weight="bold" />}
          />
          
          <View>
            <Button loading={isLoading} onPress={handleSubmit} style={styles.loginButton}>
              <Typo variant={theme.textVariants.text16} color={theme.colors.text}>
                Entrar
              </Typo>
            </Button>
            <View style={styles.footer}>
              <Typo variant={theme.textVariants.text14} color={theme.colors.text}>
                Não possui uma conta?
              </Typo>
              <Pressable onPress={() => router.push('/(auth)/sign-up' as any)}>
                <Typo variant={theme.textVariants.text14} color={theme.colors.primary}>
                  Criar conta
                </Typo>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
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
  },
  form: {
    gap: 20,
    marginBottom: 30,
  },
  loginButton: {
    marginTop: 10,
    backgroundColor: theme.colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    marginTop: 8,
  },
})
