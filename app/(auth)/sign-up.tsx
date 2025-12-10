import { BackButton } from '@/components/BackButton'
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
        <View style={styles.backButtonContainer}>
          <BackButton iconSize={28} />
        </View>
        <View style={styles.content}>
          <Logo />

          <View style={styles.welcomeContainer}>
            <Typo size={32} fontFamily={font.bold} color={colors.white}>
              Vamos começar!
            </Typo>
            <Typo
              size={16}
              fontFamily={font.regular}
              color={colors.gray2}
              style={styles.subtitle}>
              Crie sua conta e comece a planejar suas viagens dos sonhos
            </Typo>
          </View>

          <View style={styles.form}>
            <Input
              placeholder="Digite seu nome completo"
              value={name}
              onChangeText={setName}
              icon={<Icons.User size={24} color={colors.gray2} weight="regular" />}
            />
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

            <Button loading={isLoading} onPress={handleSubmit} style={styles.registerButton}>
                <Typo size={18} fontFamily={font.semiBold} color={colors.white}>
                  Criar conta
                </Typo>
            </Button>
          </View>

          <View style={styles.footer}>
            <Typo size={15} fontFamily={font.regular} color={colors.gray2}>
              Já possui uma conta?
            </Typo>
            <Pressable onPress={() => router.navigate('/(auth)/sign-in')}>
              <Typo size={15} fontFamily={font.semiBold} color={colors.primary}>
                Faça login
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
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 0,
    zIndex: 1,
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
  registerButton: {
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
