import { useRouter } from 'expo-router'
import { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TripContext } from '../../contexts/TripContext'
import { generateTripWithAI } from '../../utils/aiService'

export default function GeneratingScreen() {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Iniciando...')
  const router = useRouter()
  const { tripData, setAiResponse } = useContext(TripContext)

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
          setStatus('Finalizando...')
          setProgress(100)

          // Aguardar um pouco para mostrar o progresso completo
          setTimeout(() => {
            // Navegar para a próxima tela com os dados da IA salvos
            router.replace('/(tabs)')
          }, 1000)
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

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

        <Text style={styles.locationText}>{tripData.destination}</Text>
        <Text style={styles.statusText}>{status}</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>{progress}%</Text>
            <Text style={styles.progressLabel}>100%</Text>
          </View>
        </View>

        {/* Mostrar informações da viagem sendo processada */}
        <View style={styles.tripInfo}>
          <Text style={styles.tripName}>{tripData.tripName}</Text>
          <Text style={styles.tripDetails}>
            {tripData.travelerType} • {tripData.selectedInterests.join(', ')}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  backIcon: {
    color: '#fff',
    fontSize: 18,
  },
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
    backgroundColor: '#FF6B35',
    opacity: 0.8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  locationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 60,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 14,
    color: '#999',
  },
  tripInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  tripName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  tripDetails: {
    fontSize: 14,
    color: '#999',
  },
})
