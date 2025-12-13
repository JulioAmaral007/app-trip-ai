import { Header } from '@/components/layout/Header'
import { ScreenWrapper } from '@/components/layout/ScreenWrapper'
import { BackButton } from '@/components/navigation/BackButton'
import { Button } from '@/components/ui/Button'
import { Typo } from '@/components/ui/Typo'
import { theme } from '@/constants/theme'
import { TripContext } from '@/contexts/TripContext'
import { dateUtils } from '@/utils/dateUtils'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { use, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars'
import { ptBR } from '../../utils/localeCalendarConfig'

LocaleConfig.locales['pt-br'] = ptBR
LocaleConfig.defaultLocale = 'pt-br'

export default function DatesScreen() {
  const { tripData, setTravelDates } = use(TripContext)
  const [isSelectingEnd, setIsSelectingEnd] = useState(false)
  const router = useRouter()

  const handleDayPress = (day: DateData) => {
    if (!tripData.startDate || (tripData.startDate && tripData.endDate)) {
        // Primeira seleção ou reset
      setTravelDates(day, undefined as any)
      setIsSelectingEnd(true)
    } else {
      // Segunda seleção
      if (day.dateString < tripData.startDate.dateString) {
        // Se a data selecionada é anterior à data inicial, inverte
        setTravelDates(day, tripData.startDate)
      } else {
        setTravelDates(tripData.startDate, day)
      }
      setIsSelectingEnd(false)
    }
  }

  const getMarkedDates = () => {
    const marked: any = {}

    if (tripData.startDate) {
      marked[tripData.startDate.dateString] = {
        startingDay: true,
        color: theme.colors.primary,
        textColor: theme.colors.pureWhite,
      }
    }

    if (tripData.endDate) {
      marked[tripData.endDate.dateString] = {
        endingDay: true,
        color: theme.colors.primary,
        textColor: theme.colors.pureWhite,
      }
    }

    if (tripData.startDate && tripData.endDate) {
      const start = new Date(tripData.startDate.dateString)
      const end = new Date(tripData.endDate.dateString)
      const current = new Date(start)

      while (current < end) {
        current.setDate(current.getDate() + 1)
        const dateString = current.toISOString().split('T')[0]
        if (dateString !== tripData.endDate.dateString) {
          marked[dateString] = {
            selected: true,
            color: theme.colors.primary,
            textColor: theme.colors.pureWhite,
          }
        }
      }
    }

    return marked
  }

  return (
    <ScreenWrapper>
      <Header title="Datas de viagem" leftIcon={<BackButton />} />

      <View style={styles.calendarContainer}>
        <Calendar
          renderArrow={(direction: 'right' | 'left') => (
            <Feather size={24} color={theme.colors.pureWhite} name={`chevron-${direction}`} />
          )}
          headerStyle={{
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.pureWhite,
            paddingBottom: 10,
            marginBottom: 10,
          }}
          theme={{
            textMonthFontSize: 18,
            monthTextColor: theme.colors.pureWhite,
            todayTextColor: theme.colors.primary,
            selectedDayBackgroundColor: theme.colors.primary,
            selectedDayTextColor: theme.colors.pureWhite,
            arrowColor: theme.colors.pureWhite,
            calendarBackground: 'transparent',
            textDayStyle: { color: theme.colors.pureWhite },
            textDisabledColor: theme.colors.gray2,
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
                <Typo variant={theme.textVariants.text16}>
                  {tripData.startDate
                    ? dateUtils.formatDayMonthYear(tripData.startDate.dateString)
                    : 'Data inicial'}
                </Typo>
                <Typo variant={theme.textVariants.text12}>Início</Typo>
              </View>
            </View>
            <Text style={styles.arrow}>→</Text>
            <View style={styles.dateInfo}>
              <Text style={styles.dateIcon}>📅</Text>
              <View>
                <Typo variant={theme.textVariants.text16}>
                  {tripData.endDate
                    ? dateUtils.formatDayMonthYear(tripData.endDate.dateString)
                    : 'Data final'}
                </Typo>
                <Typo variant={theme.textVariants.text12}>Fim</Typo>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Button
        style={styles.continueButton}
        onPress={() => {
          if (tripData.startDate && tripData.endDate) {
            router.push('/create-trip/budget')
          }
        }}
        disabled={!tripData.startDate || !tripData.endDate}>
        <Typo variant={theme.textVariants.text16} color={theme.colors.pureWhite}>
          Continuar
        </Typo>
      </Button>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dateRangeContainer: {
    marginTop: 40,
  },
  dateRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.gray1,
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
    color: theme.colors.gray2,
    fontSize: 18,
    marginHorizontal: 16,
  },
  continueButton: {
    marginBottom: 40,
  },
})
