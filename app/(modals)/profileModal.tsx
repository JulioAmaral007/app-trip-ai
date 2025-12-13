import { BackButton } from '@/components/navigation/BackButton'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Input } from '@/components/ui/Input'
import { ModalWrapper } from '@/components/layout/ModalWrapper'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { getProfileImage } from '@/services/imageService'
import type { UserDataType } from '@/services/types'
import { updateUser } from '@/services/userService'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { PencilSimple } from 'phosphor-react-native'
import { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function ProfileModal() {
  const { user } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<UserDataType>({
    name: '',
    image: null,
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUserData({
      name: user?.name || '',
      image: user?.image || null,
    })
  }, [user])

  const onPickImage = async () => {
    // TODO: Implementar seleção de imagem quando expo-image-picker estiver disponível
    Alert.alert('Em breve', 'Funcionalidade de upload de imagem será implementada em breve')
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ['images'],
    //   aspect: [4, 3],
    //   quality: 0.5,
    // })
    // if (!result.canceled) {
    //   setUserData({ ...userData, image: result.assets[0] })
    // }
  }

  const onSubmit = async () => {
    const { name } = userData
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome')
      return
    }

    if (!user?.id) {
      Alert.alert('Erro', 'Usuário não encontrado')
      return
    }

    setLoading(true)
    const res = await updateUser(user.id, userData)
    setLoading(false)

    if (res.success) {
      router.back()
    } else {
      Alert.alert('Erro', res.msg || 'Erro ao atualizar perfil')
    }
  }

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="Atualizar Perfil" leftIcon={<BackButton />} style={{ marginBottom: 20 }} />

        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              contentFit="cover"
              transition={100}
            />

            <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
              <PencilSimple size={20} color={theme.colors.pureWhite} weight="bold" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo
              variant={theme.textVariants.text16}
              style={{ marginBottom: 8 }}>
              Nome
            </Typo>
            <Input
              placeholder="Digite seu nome"
              value={userData.name}
              onChangeText={(value) => setUserData({ ...userData, name: value })}
              containerStyle={styles.input}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button onPress={onSubmit} loading={loading} style={styles.updateButton}>
          <Typo variant={theme.textVariants.text16}>
            Atualizar Perfil
          </Typo>
        </Button>
      </View>
    </ModalWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopColor: theme.colors.gray1,
    marginBottom: 10,
    borderTopWidth: 1,
  },
  form: {
    gap: 32,
    marginTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatar: {
    alignSelf: 'center',
    backgroundColor: theme.colors.gray1,
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: theme.colors.gray1,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    padding: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    gap: 8,
  },
  input: {
    backgroundColor: theme.colors.gray1,
    borderColor: theme.colors.gray1,
    borderWidth: 1,
    borderRadius: 12,
  },
  updateButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
})
