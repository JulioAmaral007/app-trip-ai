import { Header } from '@/components/layout/Header'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { BackButton } from '@/components/navigation/BackButton'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
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
      <Header title="Gerando" leftIcon={<BackButton />} />

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

        <Typo variant={theme.textVariants.title22} style={styles.locationText}>
          {tripData.destination}
        </Typo>
        <Typo variant={theme.textVariants.text16} style={styles.statusText}>
          {status}
        </Typo>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Typo variant={theme.textVariants.text14}>
              {progress}%
            </Typo>
            <Typo variant={theme.textVariants.text14}>
              100%
            </Typo>
          </View>
        </View>

        {/* Mostrar informações da viagem sendo processada */}
        <View style={styles.tripInfo}>
          <Typo variant={theme.textVariants.title22} style={styles.tripName}>
            {tripData.tripName}
          </Typo>
          <Typo variant={theme.textVariants.text14}>
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
    backgroundColor: theme.colors.primary,
    opacity: 0.8,
    shadowColor: theme.colors.primary,
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
    backgroundColor: theme.colors.gray1,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
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
