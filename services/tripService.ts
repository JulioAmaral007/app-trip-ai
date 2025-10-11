import { firestore } from '@/config/firebase'
import type { GeneratedTripType, ResponseType } from '@/types'
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore'

export async function createOrUpdateTrip(
  tripData: Partial<GeneratedTripType>
): Promise<ResponseType> {
  try {
    const tripToSave = { ...tripData }

    if (!tripData?.id) {
      tripToSave.created = new Date()
    }

    const tripRef = tripData?.id
      ? doc(firestore, 'trips', tripData?.id)
      : doc(collection(firestore, 'trips'))

    await setDoc(tripRef, tripToSave, { merge: true })
    return { success: true, data: { ...tripToSave, id: tripRef.id } }
  } catch (error: unknown) {
    console.log('error creating or updating trip: ', error)
    return { success: false, msg: (error as Error).message }
  }
}

export async function saveGeneratedTrip(
  aiGeneratedData: any,
  originalTripData: any,
  userId: string
): Promise<ResponseType> {
  try {
    const tripToSave: Partial<GeneratedTripType> = {
      ...aiGeneratedData,
      uid: userId,
      created: new Date(),
      // Salvar dados originais da criação para referência
      travelerType: originalTripData.travelerType,
      startDate: originalTripData.startDate?.dateString,
      endDate: originalTripData.endDate?.dateString,
      minBudget: originalTripData.minBudget,
      maxBudget: originalTripData.maxBudget,
      spendingHabit: originalTripData.spendingHabit,
      selectedInterests: originalTripData.selectedInterests,
    }

    const tripRef = doc(collection(firestore, 'trips'))
    await setDoc(tripRef, tripToSave)

    return { success: true, data: { ...tripToSave, id: tripRef.id } }
  } catch (error: unknown) {
    console.log('error saving generated trip: ', error)
    return { success: false, msg: (error as Error).message }
  }
}

export async function deleteTrip(tripId: string): Promise<ResponseType> {
  try {
    const tripRef = doc(firestore, 'trips', tripId)
    await deleteDoc(tripRef)
    return { success: true }
  } catch (error: unknown) {
    console.log('error deleting trip: ', error)
    return { success: false, msg: (error as Error).message }
  }
}
