import { getUserTrips } from '@/services/tripService'
import type { GeneratedTripType } from '@/services/types'
import { useEffect, useState } from 'react'

export function useTripFindAll(userId: string | undefined) {
  const [data, setData] = useState<GeneratedTripType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      setData([])
      return
    }

    setIsLoading(true)
    setError(null)

    getUserTrips(userId)
      .then((response) => {
        if (response.success && response.data) {
          setData(response.data as GeneratedTripType[])
        } else {
          setError(response.msg || 'Erro ao buscar viagens')
          setData([])
        }
      })
      .catch((err) => {
        console.error('Error fetching trips:', err)
        setError(err.message || 'Erro ao buscar viagens')
        setData([])
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [userId])

  return { data, error, isLoading }
}

