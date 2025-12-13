import { Header } from '@/components/layout/Header'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { BackButton } from '@/components/navigation/BackButton'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Radio } from '@/components/ui/Radio'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
import { useRouter } from 'expo-router'
import { use, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'

export default function BudgetScreen() {
  const { tripData, setBudget, setSpendingHabit } = use(TripContext)
  const router = useRouter()
  // Gera dados do gráfico baseado nos valores de orçamento
  const chartData = useMemo(() => {
    const min = parseInt(tripData.minBudget.replace(/,/g, '')) || 5200
    const max = parseInt(tripData.maxBudget.replace(/,/g, '')) || 55200

    // Gera 19 pontos de dados distribuídos entre min e max
    const dataPoints = 19
    const step = (max - min) / (dataPoints - 1)

    const data = []
    for (let i = 0; i < dataPoints; i++) {
      const baseValue = min + i * step
      // Adiciona variação aleatória para simular dados reais
      const randomFactor = 0.7 + Math.random() * 0.6 // 70% a 130% de variação
      const value = baseValue * randomFactor

      data.push({
        value: Math.round(value),
        label: `${i + 1}`,
      })
    }

    return data
  }, [tripData.minBudget, tripData.maxBudget])

  // Calcula o preço médio
  const averagePrice = useMemo(() => {
    const min = parseInt(tripData.minBudget.replace(/,/g, '')) || 5200
    const max = parseInt(tripData.maxBudget.replace(/,/g, '')) || 55200
    return Math.round((min + max) / 2).toLocaleString()
  }, [tripData.minBudget, tripData.maxBudget])

  const spendingOptions = [
    {
      id: 'cheap' as const,
      title: 'Econômico',
      description: 'Mantenha-se consciente dos custos',
    },
    {
      id: 'moderate' as const,
      title: 'Moderado',
      description: 'Mantenha os custos na média',
    },
    {
      id: 'luxury' as const,
      title: 'Luxo',
      description: 'Não se preocupe - viva um pouco!',
    },
  ]

  return (
    <ScreenWrapper>
      <Header leftIcon={<BackButton />} title="Orçamento" />

      <View style={styles.priceRangeSection}>
        <Typo variant={theme.textVariants.title22}>
          Faixa de preço
        </Typo>
        <Typo variant={theme.textVariants.text14}>
          O preço médio por noite é ${averagePrice}
        </Typo>

        {/* Price Chart Visualization */}
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            <BarChart
              data={chartData}
              barWidth={8}
              spacing={2}
              hideRules
              xAxisLabelsVerticalShift={0}
              noOfSections={0}
              barBorderRadius={1}
              frontColor={theme.colors.pureWhite}
              backgroundColor="transparent"
              width={300}
              height={100}
            />
          </View>
          <View style={styles.chartLabels}>
            <Typo variant={theme.textVariants.text12}>
              ${parseInt(tripData.minBudget.replace(/,/g, '')) || 5200}
            </Typo>
            <Typo variant={theme.textVariants.text12}>
              ${parseInt(tripData.maxBudget.replace(/,/g, '')) || 55200}
            </Typo>
          </View>
        </View>

        <View style={styles.budgetInputs}>
          <View style={styles.inputContainer}>
            <Input
              value={tripData.minBudget}
              onChangeText={(text) => setBudget(text, tripData.maxBudget)}
              placeholder="Mínimo"
              keyboardType="numeric"
            />
          </View>
          <Typo variant={theme.textVariants.text18}>
            →
          </Typo>
          <View style={styles.inputContainer}>
            <Input
              value={tripData.maxBudget}
              onChangeText={(text) => setBudget(tripData.minBudget, text)}
              placeholder="Máximo"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <View style={styles.spendingSection}>
        <Typo variant={theme.textVariants.title22}>
          Escolha os hábitos de gastos para sua viagem
        </Typo>

        <View style={styles.optionsContainer}>
          {spendingOptions.map((option) => (
            <Button
              key={option.id}
              style={
                [
                  styles.option,
                  tripData.spendingHabit === option.id && styles.selectedOption,
                ] as any
              }
              onPress={() => setSpendingHabit(option.id)}>
              <View style={styles.radioContainer}>
                <View style={{ marginRight: 16 }}>
                  <Radio selected={tripData.spendingHabit === option.id} />
                </View>
                <View style={styles.optionText}>
                  <Typo variant={theme.textVariants.text16}>
                    {option.title}
                  </Typo>
                  <Typo
                    variant={theme.textVariants.text16}
                    color={
                      tripData.spendingHabit === option.id
                        ? theme.colors.pureWhite
                        : theme.colors.gray2
                    }>
                    {option.description}
                  </Typo>
                </View>
              </View>
            </Button>
          ))}
        </View>
      </View>

      <Button style={styles.continueButton} onPress={() => router.push('/create-trip/interests')}>
        <Typo variant={theme.textVariants.text16} color={theme.colors.pureWhite}>
          Continuar
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  priceRangeSection: {
    marginBottom: 40,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 100,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  budgetInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  inputContainer: {
    flex: 1,
  },
  budgetInput: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: '#fff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputSeparator: {
    color: '#666',
    fontSize: 18,
  },
  spendingSection: {
    flex: 1,
  },
  optionsContainer: {
    gap: 16,
    marginTop: 20,
  },
  option: {
    backgroundColor: theme.colors.gray1,
    padding: 20,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  continueButton: {
    marginBottom: 40,
  },
})
