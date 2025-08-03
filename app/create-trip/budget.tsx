import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { Radio } from '@/components/Radio';
import { ScreenWrapper } from '@/components/ScreenWrapper';
import { Typo } from '@/components/Typo';
import { colors, font } from '@/constants/theme';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

type SpendingHabit = 'cheap' | 'moderate' | 'luxury';

export default function BudgetScreen() {
  const [minBudget, setMinBudget] = useState('5200');
  const [maxBudget, setMaxBudget] = useState('55200');
  const [selectedHabit, setSelectedHabit] = useState<SpendingHabit>('cheap');

  // Gera dados do gráfico baseado nos valores de orçamento
  const chartData = useMemo(() => {
    const min = parseInt(minBudget.replace(/,/g, '')) || 5200;
    const max = parseInt(maxBudget.replace(/,/g, '')) || 55200;

    // Gera 19 pontos de dados distribuídos entre min e max
    const dataPoints = 19;
    const step = (max - min) / (dataPoints - 1);

    const data = [];
    for (let i = 0; i < dataPoints; i++) {
      const baseValue = min + i * step;
      // Adiciona variação aleatória para simular dados reais
      const randomFactor = 0.7 + Math.random() * 0.6; // 70% a 130% de variação
      const value = baseValue * randomFactor;

      data.push({
        value: Math.round(value),
        label: `${i + 1}`,
      });
    }

    return data;
  }, [minBudget, maxBudget]);

  // Calcula o preço médio
  const averagePrice = useMemo(() => {
    const min = parseInt(minBudget.replace(/,/g, '')) || 5200;
    const max = parseInt(maxBudget.replace(/,/g, '')) || 55200;
    return Math.round((min + max) / 2).toLocaleString();
  }, [minBudget, maxBudget]);

  const spendingOptions = [
    {
      id: 'cheap' as SpendingHabit,
      title: 'Cheap',
      description: 'Stay conscious of costs',
    },
    {
      id: 'moderate' as SpendingHabit,
      title: 'Moderate',
      description: 'Keep costs on the average side',
    },
    {
      id: 'luxury' as SpendingHabit,
      title: 'Luxury',
      description: "Don't worry about it- live a little!",
    },
  ];

  return (
    <ScreenWrapper>
      <Header title="Budget" leftIcon={<BackButton />} />

      <View style={styles.priceRangeSection}>
        <Typo size={20} fontFamily={font.semiBold} color={colors.text.primary}>
          Price range
        </Typo>
        <Typo size={14} fontFamily={font.regular} color={colors.text.secondary}>
          The average nightly price is ${averagePrice}
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
              frontColor={colors.text.primary}
              backgroundColor="transparent"
              width={300}
              height={100}
            />
          </View>
          <View style={styles.chartLabels}>
            <Typo size={12} fontFamily={font.regular} color={colors.text.secondary}>
              ${parseInt(minBudget.replace(/,/g, '')) || 5200}
            </Typo>
            <Typo size={12} fontFamily={font.regular} color={colors.text.secondary}>
              ${parseInt(maxBudget.replace(/,/g, '')) || 55200}
            </Typo>
          </View>
        </View>

        <View style={styles.budgetInputs}>
          <View style={styles.inputContainer}>
            <Input
              value={minBudget}
              onChangeText={(text) => setMinBudget(text)}
              placeholder="Minimum"
              keyboardType="numeric"
            />
          </View>
          <Typo size={18} fontFamily={font.regular} color={colors.text.secondary}>
            →
          </Typo>
          <View style={styles.inputContainer}>
            <Input
              value={maxBudget}
              onChangeText={(text) => setMaxBudget(text)}
              placeholder="Maximum"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <View style={styles.spendingSection}>
        <Typo size={20} fontFamily={font.semiBold} color={colors.text.primary}>
          Choose spending habits for you trip
        </Typo>

        <View style={styles.optionsContainer}>
          {spendingOptions.map((option) => (
            <Button
              key={option.id}
              style={[styles.option, selectedHabit === option.id && styles.selectedOption] as any}
              onPress={() => setSelectedHabit(option.id)}>
              <View style={styles.radioContainer}>
                <View style={{ marginRight: 16 }}>
                  <Radio selected={selectedHabit === option.id} />
                </View>
                <View style={styles.optionText}>
                  <Typo size={16} fontFamily={font.semiBold} color={colors.text.primary}>
                    {option.title}
                  </Typo>
                  <Typo
                    size={16}
                    fontFamily={font.regular}
                    color={
                      selectedHabit === option.id ? colors.text.primary : colors.text.secondary
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
        <Typo size={16} fontFamily={font.semiBold} color={colors.text.inverse}>
          Continue
        </Typo>
      </Button>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  priceRangeSection: {
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  averagePrice: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
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
  chartBar: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 1,
    borderRadius: 1,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  chartLabel: {
    color: '#666',
    fontSize: 12,
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
    paddingHorizontal: 24,
  },
  optionsContainer: {
    gap: 16,
    marginTop: 20,
  },
  option: {
    backgroundColor: colors.background.card,
    padding: 20,
  },
  selectedOption: {
    backgroundColor: colors.primary.orange,
    borderColor: colors.primary.orange,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    marginBottom: 4,
  },
  selectedText: {
    color: colors.text.primary,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
  },
});
