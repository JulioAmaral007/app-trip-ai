import { supabase } from '@/config/supabase'
import type { PostgrestFilterBuilder } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

type SupabaseQueryBuilder = PostgrestFilterBuilder<any, any, any>

export function useFetchData<T>(
  tableName: string,
  queryBuilder?: (query: SupabaseQueryBuilder) => SupabaseQueryBuilder
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tableName) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    let query = supabase.from(tableName).select('*')

    // Aplicar filtros se fornecidos
    if (queryBuilder) {
      query = queryBuilder(query) as SupabaseQueryBuilder
    }

    // Buscar dados iniciais
    query.then(({ data: initialData, error: queryError }) => {
      if (queryError) {
        console.error('Error fetching data:', queryError)
        setError(queryError.message)
        setLoading(false)
        return
      }

      setData((initialData as T[]) || [])
      setLoading(false)
    })

    // Escutar mudanças em tempo real usando Supabase Realtime
    const channel = supabase
      .channel(`${tableName}_changes`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setData((prev) => [...prev, payload.new as T])
          } else if (payload.eventType === 'UPDATE') {
            setData((prev) =>
              prev.map((item: any) => (item.id === payload.new.id ? (payload.new as T) : item))
            )
          } else if (payload.eventType === 'DELETE') {
            setData((prev) => prev.filter((item: any) => item.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [tableName, queryBuilder])

  return { data, loading, error }
}
