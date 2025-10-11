import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Input } from '@/components/Input'
import { ModalWrapper } from '@/components/ModalWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { AuthContext } from '@/contexts/AuthContext'
import { getProfileImage } from '@/services/imageService'
import { updateUser } from '@/services/userService'
import type { UserDataType } from '@/types'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { PencilSimple } from 'phosphor-react-native'
import { useContext, useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export default function ProfileModal() {
  const authContext = useContext(AuthContext)
  const user = authContext?.user
  const updateUserData = authContext?.updateUserData
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

    if (!user?.uid || !updateUserData) {
      Alert.alert('Erro', 'Usuário não encontrado')
      return
    }

    setLoading(true)
    const res = await updateUser(user.uid, userData)
    setLoading(false)

    if (res.success) {
      await updateUserData(user.uid)
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
              <PencilSimple size={20} color={colors.text.inverse} weight="bold" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo
              size={16}
              fontFamily={font.semiBold}
              color={colors.text.primary}
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
          <Typo color={colors.text.inverse} fontFamily={font.bold} size={16}>
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
    borderTopColor: colors.border.primary,
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
    backgroundColor: colors.background.card,
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.border.secondary,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: colors.primary.orange,
    shadowColor: colors.primary.orange,
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
    backgroundColor: colors.background.input,
    borderColor: colors.border.primary,
    borderWidth: 1,
    borderRadius: 12,
  },
  updateButton: {
    flex: 1,
    backgroundColor: colors.primary.orange,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: colors.primary.orange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
})
