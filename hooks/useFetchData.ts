import { firestore } from '@/config/firebase'
import type { QueryConstraint } from 'firebase/firestore'
import { collection, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export function useFetchData<T>(collectionName: string, constraints: QueryConstraint[] = []) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!collectionName) return
    const collectionRef = collection(firestore, collectionName)
    const q = query(collectionRef, ...constraints)

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        }) as T[]
        setData(fetchedData)
        setLoading(false)
      },
      (err) => {
        console.log('Error')
        setError(err.message)
        setLoading(false)
      }
    )

    return () => {
      if (unsub) {
        unsub()
      }
    }
  }, [collectionName, constraints])

  return { data, loading, error }
}
