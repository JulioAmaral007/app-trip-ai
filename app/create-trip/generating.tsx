import { BackButton } from '@/components/BackButton'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { TripContext } from '@/contexts/TripContext'
import { saveGeneratedTrip } from '@/services/tripService'
import { generateTripWithAI } from '@/utils/aiService'
import { useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

export default function GeneratingScreen() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Iniciando...')
  const router = useRouter()
  const { tripData, setAiResponse } = useContext(TripContext)
  const { user } = useAuth()

  useEffect(() => {
    const generateTrip = async () => {
      try {
        // Verificar se os dados da viagem estão completos
        if (!tripData.tripName || !tripData.destination) {
          Alert.alert('Erro', 'Dados da viagem incompletos')
          router.back()
          return
        }

        setStatus('Conectando com IA...')
        setProgress(20)

        // Fazer a chamada para a IA
        const result = await generateTripWithAI(tripData)

        setProgress(80)
        setStatus('Processando resposta...')

        if (result.success) {
          setAiResponse(result.data)
          setStatus('Salvando viagem...')
          setProgress(90)

          // Verificar se o usuário está logado
          if (!user?.id) {
            Alert.alert('Erro', 'Usuário não está logado')
            router.back()
            return
          }

          // Salvar a viagem no banco de dados
          const saveResult = await saveGeneratedTrip(result.data, tripData, user.id)

          if (saveResult.success) {
            setStatus('Finalizando...')
            setProgress(100)

            // Aguardar um pouco para mostrar o progresso completo
            setTimeout(() => {
              // Navegar para a próxima tela com os dados da IA salvos
              router.replace('/(tabs)')
            }, 1000)
          } else {
            Alert.alert('Erro', saveResult.msg || 'Erro ao salvar viagem')
            router.back()
          }
        } else {
          Alert.alert('Erro', result.error || 'Erro ao gerar roteiro')
          router.back()
        }
      } catch (error) {
        console.error('Erro na geração:', error)
        Alert.alert('Erro', 'Erro inesperado ao gerar roteiro')
        router.back()
      }
    }

    generateTrip()
  }, [tripData, router])

  return (
    <ScreenWrapper>
      <Header title="Generating" leftIcon={<BackButton />} />

      <View style={styles.content}>
        {/* 3D Abstract Shape */}
        <View style={styles.shapeContainer}>
          <View style={styles.abstractShape}>
            {/* Simulating a 3D mesh with gradient circles */}
            <View style={[styles.meshCircle, { top: 20, left: 30 }]} />
            <View style={[styles.meshCircle, { top: 60, left: 80 }]} />
            <View style={[styles.meshCircle, { top: 100, left: 40 }]} />
            <View style={[styles.meshCircle, { top: 140, left: 90 }]} />
            <View style={[styles.meshCircle, { top: 180, left: 20 }]} />
            <View style={[styles.meshCircle, { top: 220, left: 70 }]} />
          </View>
        </View>

        <Typo size={24} fontFamily={font.bold} color={colors.white} style={styles.locationText}>
          {tripData.destination}
        </Typo>
        <Typo size={16} fontFamily={font.regular} color={colors.gray2} style={styles.statusText}>
          {status}
        </Typo>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Typo size={14} fontFamily={font.regular} color={colors.gray2}>
              {progress}%
            </Typo>
            <Typo size={14} fontFamily={font.regular} color={colors.gray2}>
              100%
            </Typo>
          </View>
        </View>

        {/* Mostrar informações da viagem sendo processada */}
        <View style={styles.tripInfo}>
          <Typo size={20} fontFamily={font.bold} color={colors.white} style={styles.tripName}>
            {tripData.tripName}
          </Typo>
          <Typo size={14} fontFamily={font.regular} color={colors.gray2}>
            {tripData.travelerType} • {tripData.selectedInterests.join(', ')}
          </Typo>
        </View>
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  shapeContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  abstractShape: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  meshCircle: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    opacity: 0.8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  locationText: {
    marginBottom: 8,
  },
  statusText: {
    marginBottom: 60,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.gray1,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  tripName: {
    marginBottom: 4,
  },
})
