import { createContext, ReactNode, useState } from 'react'
import { DateData } from 'react-native-calendars'

// Tipos para os dados da viagem
export type TravelerType = 'solo' | 'couple' | 'family' | 'friends'
export type SpendingHabit = 'cheap' | 'moderate' | 'luxury'
export type InterestType = 'food' | 'urban' | 'adventure' | 'educational' | 'beach' | 'pool' | 'relax' | 'camp'

interface TripData {
  // Dados dos viajantes
  travelerType: TravelerType
  
  // Datas da viagem
  startDate?: DateData
  endDate?: DateData
  
  // Orçamento
  minBudget: string
  maxBudget: string
  spendingHabit: SpendingHabit
  
  // Interesses
  selectedInterests: InterestType[]
  
  // Nome da viagem
  tripName: string
  
  // Destino (pode ser expandido no futuro)
  destination?: string
}

interface TripContextType {
  // Dados da viagem
  tripData: TripData
  
  // Ações para atualizar os dados
  setTravelerType: (type: TravelerType) => void
  setTravelDates: (startDate: DateData, endDate: DateData) => void
  setBudget: (minBudget: string, maxBudget: string) => void
  setSpendingHabit: (habit: SpendingHabit) => void
  setInterests: (interests: InterestType[]) => void
  addInterest: (interest: InterestType) => void
  removeInterest: (interest: InterestType) => void
  setTripName: (name: string) => void
  setDestination: (destination: string) => void
  
  // Utilitários
  resetTripData: () => void
  isTripDataComplete: () => boolean
}

// Dados iniciais
const initialTripData: TripData = {
  travelerType: 'solo',
  minBudget: '5200',
  maxBudget: '55200',
  spendingHabit: 'cheap',
  selectedInterests: ['adventure', 'camp'],
  tripName: '',
  destination: 'Bali, Indonesia',
}

export const TripContext = createContext<TripContextType>({
  tripData: initialTripData,
  setTravelerType: () => {},
  setTravelDates: () => {},
  setBudget: () => {},
  setSpendingHabit: () => {},
  setInterests: () => {},
  addInterest: () => {},
  removeInterest: () => {},
  setTripName: () => {},
  setDestination: () => {},
  resetTripData: () => {},
  isTripDataComplete: () => false,
})

export function TripProvider({ children }: { children: ReactNode }) {
  const [tripData, setTripData] = useState<TripData>(initialTripData)

  const setTravelerType = (type: TravelerType) => {
    setTripData(prev => ({ ...prev, travelerType: type }))
  }

  const setTravelDates = (startDate: DateData, endDate: DateData) => {
    setTripData(prev => ({ ...prev, startDate, endDate }))
  }

  const setBudget = (minBudget: string, maxBudget: string) => {
    setTripData(prev => ({ ...prev, minBudget, maxBudget }))
  }

  const setSpendingHabit = (habit: SpendingHabit) => {
    setTripData(prev => ({ ...prev, spendingHabit: habit }))
  }

  const setInterests = (interests: InterestType[]) => {
    setTripData(prev => ({ ...prev, selectedInterests: interests }))
  }

  const addInterest = (interest: InterestType) => {
    setTripData(prev => {
      if (prev.selectedInterests.length >= 3) return prev
      if (prev.selectedInterests.includes(interest)) return prev
      return { ...prev, selectedInterests: [...prev.selectedInterests, interest] }
    })
  }

  const removeInterest = (interest: InterestType) => {
    setTripData(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.filter(i => i !== interest)
    }))
  }

  const setTripName = (name: string) => {
    setTripData(prev => ({ ...prev, tripName: name }))
  }

  const setDestination = (destination: string) => {
    setTripData(prev => ({ ...prev, destination }))
  }

  const resetTripData = () => {
    setTripData(initialTripData)
  }

  const isTripDataComplete = () => {
    return !!(
      tripData.travelerType &&
      tripData.startDate &&
      tripData.endDate &&
      tripData.minBudget &&
      tripData.maxBudget &&
      tripData.spendingHabit &&
      tripData.selectedInterests.length > 0 &&
      tripData.tripName
    )
  }

  return (
    <TripContext.Provider value={{
      tripData,
      setTravelerType,
      setTravelDates,
      setBudget,
      setSpendingHabit,
      setInterests,
      addInterest,
      removeInterest,
      setTripName,
      setDestination,
      resetTripData,
      isTripDataComplete,
    }}>
      {children}
    </TripContext.Provider>
  )
}
