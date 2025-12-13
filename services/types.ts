export type UserType = {
  uid?: string
  email?: string | null
  name: string | null
  image?: any
} | null

export type UserDataType = {
  name: string
  image?: any
}

export type ResponseType = {
  success: boolean
  data?: any
  msg?: string
}

// Tipos para viagens
export type TripActivityType = {
  time: string
  activity: string
  description: string
  location: string
  estimatedCost: string
  tips: string
  imageUrl?: string
}

export type TripItineraryDayType = {
  day: number
  date: string
  title: string
  description: string
  activities: TripActivityType[]
  estimatedDailyCost: string
}

export type TripHotelType = {
  name: string
  description: string
  priceRange: string
  bookingUrl?: string
  imageUrl?: string
}

export type TripRecommendationsType = {
  accommodation: {
    description: string
    hotels: TripHotelType[]
  }
  transportation: string
  food: string
  packing: string
}

export type GeneratedTripType = {
  id?: string
  tripName: string
  destination: string
  destinationImageUrl?: string
  summary: string
  itinerary: TripItineraryDayType[]
  totalEstimatedCost: string
  recommendations: TripRecommendationsType
  tips: string[]
  uid?: string
  created?: Date

  // Dados originais da criação
  travelerType?: string
  startDate?: string
  endDate?: string
  minBudget?: string
  maxBudget?: string
  spendingHabit?: string
  selectedInterests?: string[]
}
