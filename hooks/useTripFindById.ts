import { cities } from '@/data/cities'
import type { City } from '@/data/types'
import { getTripById } from '@/services/tripService'
import type { GeneratedTripType } from '@/services/types'
import { useEffect, useState } from 'react'

// Tipo estendido que combina trip com dados da cidade
export type TripWithCityData = GeneratedTripType & {
  coverImage?: number | string
  categories?: City['categories']
  location?: City['location']
  touristAttractions?: City['touristAttractions']
  isFavorite?: boolean
}

export function useTripFindById(tripId: string | string[] | undefined) {
  const [data, setData] = useState<TripWithCityData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Garantir que tripId seja uma string válida
    const id = Array.isArray(tripId) ? tripId[0] : tripId

    if (!id) {
      setIsLoading(false)
      setError('ID da viagem não fornecido')
      return
    }

    setIsLoading(true)
    setError(null)

    getTripById(id)
      .then((response) => {
        if (response.success && response.data) {
          const trip = response.data as GeneratedTripType
          
          // Buscar cidade correspondente pelo destination
          const city = findCityByDestination(trip.destination)
          
          // Combinar dados da trip com dados da cidade
          const tripWithCityData: TripWithCityData = {
            ...trip,
            coverImage: city?.coverImage || "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
            categories: city?.categories || [],
            location: city?.location || { latitude: 0, longitude: 0 },
            touristAttractions: city?.touristAttractions || [],
            isFavorite: false,
          }
          
          setData(tripWithCityData)
        } else {
          setError(response.msg || 'Erro ao buscar viagem')
        }
      })
      .catch((err) => {
        console.error('Error fetching trip:', err)
        setError(err.message || 'Erro ao buscar viagem')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [tripId])

  return { data, error, isLoading }
}

// Função auxiliar para encontrar cidade pelo destination
function findCityByDestination(destination?: string): City | null {
  if (!destination) return null
  
  // Normalizar o destination para busca (pode ser "Rio de Janeiro, Brasil" ou apenas "Rio de Janeiro")
  const destinationLower = destination.toLowerCase().trim()
  
  // Tentar encontrar por nome da cidade ou país
  const city = cities.find((c) => {
    const cityName = c.name.toLowerCase()
    const country = c.country.toLowerCase()
    const fullDestination = `${cityName}, ${country}`.toLowerCase()
    
    return (
      destinationLower.includes(cityName) ||
      destinationLower.includes(country) ||
      fullDestination.includes(destinationLower) ||
      destinationLower.includes(fullDestination)
    )
  })
  
  return city || null
}

