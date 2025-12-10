import { BackButton } from '@/components/BackButton'
import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { ScreenWrapper } from '@/components/ScreenWrapper'
import { Typo } from '@/components/Typo'
import { colors, font } from '@/constants/theme'
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
        color: colors.primary,
        textColor: colors.white,
      }
    }

    if (tripData.endDate) {
      marked[tripData.endDate.dateString] = {
        endingDay: true,
        color: colors.primary,
        textColor: colors.white,
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
            color: colors.primary,
            textColor: colors.white,
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
            <Feather size={24} color={colors.white} name={`chevron-${direction}`} />
          )}
          headerStyle={{
            borderBottomWidth: 0.5,
            borderBottomColor: colors.white,
            paddingBottom: 10,
            marginBottom: 10,
          }}
          theme={{
            textMonthFontSize: 18,
            monthTextColor: colors.white,
            todayTextColor: colors.primary,
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.white,
            arrowColor: colors.white,
            calendarBackground: 'transparent',
            textDayStyle: { color: colors.white },
            textDisabledColor: colors.gray2,
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
                  {tripData.startDate
                    ? dateUtils.formatDayMonthYear(tripData.startDate.dateString)
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
                  {tripData.endDate
                    ? dateUtils.formatDayMonthYear(tripData.endDate.dateString)
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
          if (tripData.startDate && tripData.endDate) {
            router.push('/create-trip/budget')
          }
        }}
        disabled={!tripData.startDate || !tripData.endDate}>
        <Typo size={16} fontFamily={font.semiBold} color={colors.white}>
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
    backgroundColor: colors.gray1,
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
    color: colors.gray2,
    fontSize: 18,
    marginHorizontal: 16,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    marginBottom: 40,
    marginHorizontal: 24,
  },
})
