import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Logo } from '@/components/Logo'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useState } from 'react'
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RegisterScreen() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register: registerUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres')
      return
    }

    setIsLoading(true)
    const res = await registerUser(name.trim(), email.trim(), password)
    setIsLoading(false)

    if (!res.success) {
      Alert.alert('Erro', res.msg || 'Não foi possível criar a conta')
    }
  }

  return (
    <ScreenWrapper scrollable>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <BackButton iconSize={28} />
          <Typo variant={theme.textVariants.title28} color={theme.colors.text}>
            Criar Conta
          </Typo>
        </View>

        <View style={styles.form}>
          <Input
            placeholder="Digite seu nome completo"
            value={name}
            onChangeText={setName}
            icon={<Icons.User size={24} color={theme.colors.gray2} weight="bold" />}
          />
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
            <Button loading={isLoading} onPress={handleSubmit} style={styles.registerButton}>
              <Typo variant={theme.textVariants.text16} color={theme.colors.text}>
                Criar conta
              </Typo>
            </Button>
            <View style={styles.footer}>
              <Typo variant={theme.textVariants.text14} color={theme.colors.text}>
                Já possui uma conta?
              </Typo>
              <Pressable onPress={() => router.push('/(auth)/sign-in')}>
                <Typo variant={theme.textVariants.text14} color={theme.colors.primary}>
                  Entrar
                </Typo>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.logoContainer}>
          <Logo />
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {
    gap: 20,
    marginBottom: 30,
    marginTop: 80,
  },
  registerButton: {
    backgroundColor: theme.colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 5,
    marginTop: 8,
  },
  logoContainer: {
    alignItems: 'center',
  },
})
