import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import { ptBR } from '../../utils/localeCalendarConfig'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export default function DatesScreen() {
  const [selectedStartDate, setSelectedStartDate] = useState<DateData>()
  const [selectedEndDate, setSelectedEndDate] = useState<DateData>()
  const [isSelectingEnd, setIsSelectingEnd] = useState(false)

  const handleDayPress = (day: DateData) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      // Primeira seleção ou reset
      setSelectedStartDate(day)
      setSelectedEndDate(undefined)
      setIsSelectingEnd(true)
    } else {
      // Segunda seleção
      if (day.dateString < selectedStartDate.dateString) {
        // Se a data selecionada é anterior à data inicial, inverte
        setSelectedEndDate(selectedStartDate)
        setSelectedStartDate(day)
      } else {
        setSelectedEndDate(day)
      }
      setIsSelectingEnd(false)
    }
  }

  const getMarkedDates = () => {
    const marked: any = {}

    if (selectedStartDate) {
      marked[selectedStartDate.dateString] = {
        startingDay: true,
        color: '#F06543',
        textColor: '#E8E8E8',
      }
    }

    if (selectedEndDate) {
      marked[selectedEndDate.dateString] = {
        endingDay: true,
        color: '#F06543',
        textColor: '#E8E8E8',
      }
    }

    if (selectedStartDate && selectedEndDate) {
      const start = new Date(selectedStartDate.dateString)
      const end = new Date(selectedEndDate.dateString)
      const current = new Date(start)

      while (current < end) {
        current.setDate(current.getDate() + 1)
        const dateString = current.toISOString().split('T')[0]
        if (dateString !== selectedEndDate.dateString) {
          marked[dateString] = {
            selected: true,
            color: '#F06543',
            textColor: '#fff',
          }
        }
      }
    }

    return marked
  }

  return (
    <ScreenWrapper>
      <Header title="Travel dates" leftIcon={<BackButton />} />

      <View style={styles.calendarContainer}>
        <Calendar
          renderArrow={(direction: 'right' | 'left') => (
            <Feather size={24} color="#E8E8E8" name={`chevron-${direction}`} />
          )}
          headerStyle={{
            borderBottomWidth: 0.5,
            borderBottomColor: '#E8E8E8',
            paddingBottom: 10,
            marginBottom: 10,
          }}
          theme={{
            textMonthFontSize: 18,
            monthTextColor: '#E8E8E8',
            todayTextColor: '#F06543',
            selectedDayBackgroundColor: '#F06543',
            selectedDayTextColor: '#E8E8E8',
            arrowColor: '#E8E8E8',
            calendarBackground: 'transparent',
            textDayStyle: { color: '#E8E8E8' },
            textDisabledColor: '#717171',
            arrowStyle: {
              margin: 0,
              padding: 0,
            },
          }}
          minDate={new Date().toDateString()}
          markingType="period"
          hideExtraDays
          onDayPress={handleDayPress}
          markedDates={getMarkedDates()}
        />

        <View style={styles.dateRangeContainer}>
          <View style={styles.dateRange}>
            <View style={styles.dateInfo}>
              <Text style={styles.dateIcon}>📅</Text>
              <View>
                <Typo size={16}>
                  {selectedStartDate
                    ? format(new Date(selectedStartDate.dateString), 'dd MMM yyyy')
                    : 'Data inicial'}
                </Typo>
                <Typo size={12}>Início</Typo>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
            <View style={styles.dateInfo}>
              <Text style={styles.dateIcon}>📅</Text>
              <View>
                <Typo size={16}>
                  {selectedEndDate
                    ? format(new Date(selectedEndDate.dateString), 'dd MMM yyyy')
                    : 'Data final'}
                </Typo>
                <Typo size={12}>Fim</Typo>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Button
        style={styles.continueButton}
        onPress={() => {
          if (selectedStartDate && selectedEndDate) {
            router.push('/create-trip/budget')
          }
        }}
        disabled={!selectedStartDate || !selectedEndDate}>
        <Typo size={16} fontFamily={font.semiBold} color={colors.text.inverse}>
          Continue
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dateRangeContainer: {
    marginTop: 40,
  },
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  arrow: {
    color: '#999',
    fontSize: 18,
    marginHorizontal: 16,
  },
  continueButton: {
    backgroundColor: colors.text.primary,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
  },
})
