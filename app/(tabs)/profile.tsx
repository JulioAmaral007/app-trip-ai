import { ConfirmationModal } from '@/components/ConfirmationModal'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import * as Icons from 'phosphor-react-native'
import { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

interface FavoriteDestination {
  id: string
  name: string
  country: string
  image: string
}

export default function ProfileScreen() {
  const { user, signOut, session } = useAuth()
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // Dados de favoritos mockados (baseados na imagem)
  const favoriteDestinations: FavoriteDestination[] = [
    {
      id: '1',
      name: 'Barcelona',
      country: 'Espanha',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400',
    },
    {
      id: '2',
      name: 'Bali',
      country: 'Indonésia',
      image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400',
    },
  ]

  // Formatar data de criação do usuário
  const memberSince = useMemo(() => {
    if (session?.user?.created_at) {
      const date = new Date(session.user.created_at)
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]
      return `${months[date.getMonth()]} ${date.getFullYear()}`
    }
    return 'May 2025'
  }, [session])

  const handleLogout = async () => {
    setLoading(true)
    await signOut()
    setLoading(false)
    setShowLogoutModal(false)
  }

  return (
    <ScreenWrapper>
      <Header title="Perfil" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Seção Informações da Conta */}
          <View style={styles.section}>
            <Typo size={18} fontFamily={font.bold} color={colors.white} style={styles.sectionTitle}>
              Informações da Conta.
            </Typo>

            <View style={styles.infoRow}>
              <Typo size={15} fontFamily={font.medium} color={colors.gray2}>
                Nome:
              </Typo>
              <Typo size={15} fontFamily={font.medium} color={colors.white}>
                {user?.name || 'Felipe Oliveira'}
              </Typo>
            </View>

            <View style={styles.infoRow}>
              <Typo size={15} fontFamily={font.medium} color={colors.gray2}>
                E-mail:
              </Typo>
              <Typo size={15} fontFamily={font.medium} color={colors.white}>
                {user?.email || 'email@provider.com'}
              </Typo>
            </View>

            <View style={styles.infoRow}>
              <Typo size={15} fontFamily={font.medium} color={colors.gray2}>
                Membro desde:
              </Typo>
              <Typo size={15} fontFamily={font.medium} color={colors.white}>
                {memberSince}
              </Typo>
            </View>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push('/(modals)/profileModal')}>
              <Typo size={15} fontFamily={font.medium} color={colors.white}>
                Editar perfil
              </Typo>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Typo size={15} fontFamily={font.medium} color={colors.white}>
                Alterar Senha
              </Typo>
            </TouchableOpacity>
          </View>

          {/* Seção Favoritos */}
          <View style={styles.section}>
            <Typo size={18} fontFamily={font.bold} color={colors.white} style={styles.sectionTitle}>
              Favoritos
            </Typo>

            {favoriteDestinations.map((destination) => (
              <TouchableOpacity key={destination.id} style={styles.favoriteCard}>
                <Image
                  source={{ uri: destination.image }}
                  style={styles.favoriteImage}
                  contentFit="cover"
                />
                <View style={styles.favoriteContent}>
                  <Typo size={16} fontFamily={font.bold} color={colors.white}>
                    {destination.name}
                  </Typo>
                  <Typo size={14} fontFamily={font.medium} color={colors.gray2}>
                    {destination.country}
                  </Typo>
                </View>
                <Icons.Heart size={24} color={colors.primary} weight="fill" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Botão de Logout */}
          <TouchableOpacity style={styles.logoutButton} onPress={() => setShowLogoutModal(true)}>
            <Icons.ArrowRight size={20} color={colors.primary} weight="bold" />
            <Typo size={16} fontFamily={font.medium} color={colors.primary}>
              Logout
            </Typo>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={showLogoutModal}
        title="Sair"
        message="Tem certeza que deseja sair?"
        onConfirm={handleLogout}
        onClose={() => setShowLogoutModal(false)}
        confirmText="Sair"
        loading={loading}
      />
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.gray1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  favoriteImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: colors.gray2,
  },
  favoriteContent: {
    flex: 1,
    gap: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    gap: 8,
  },
})
