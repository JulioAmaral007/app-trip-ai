import { supabase } from '@/config/supabase'
import type { GeneratedTripType, ResponseType } from '@/services/types'

export async function createOrUpdateTrip(
  tripData: Partial<GeneratedTripType>
): Promise<ResponseType> {
  try {
    const tripToSave = { ...tripData }

    if (!tripData?.id) {
      tripToSave.created = new Date().toISOString()
    } else {
      tripToSave.updated = new Date().toISOString()
    }

    if (tripData?.id) {
      // Atualizar viagem existente
      const { data, error } = await supabase
        .from('trips')
        .update(tripToSave)
        .eq('id', tripData.id)
        .select()
        .single()

      if (error) {
        return { success: false, msg: error.message }
      }

      return { success: true, data }
    } else {
      // Criar nova viagem
      const { data, error } = await supabase
        .from('trips')
        .insert(tripToSave)
        .select()
        .single()

      if (error) {
        return { success: false, msg: error.message }
      }

      return { success: true, data }
    }
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
      created: new Date().toISOString(),
      // Salvar dados originais da criação para referência
      travelerType: originalTripData.travelerType,
      startDate: originalTripData.startDate?.dateString,
      endDate: originalTripData.endDate?.dateString,
      minBudget: originalTripData.minBudget,
      maxBudget: originalTripData.maxBudget,
      spendingHabit: originalTripData.spendingHabit,
      selectedInterests: originalTripData.selectedInterests,
    }

    const { data, error } = await supabase
      .from('trips')
      .insert(tripToSave)
      .select()
      .single()

    if (error) {
      return { success: false, msg: error.message }
    }

    return { success: true, data }
  } catch (error: unknown) {
    console.log('error saving generated trip: ', error)
    return { success: false, msg: (error as Error).message }
  }
}

export async function deleteTrip(tripId: string): Promise<ResponseType> {
  try {
    const { error } = await supabase.from('trips').delete().eq('id', tripId)

    if (error) {
      return { success: false, msg: error.message }
    }

    return { success: true }
  } catch (error: unknown) {
    console.log('error deleting trip: ', error)
    return { success: false, msg: (error as Error).message }
  }
}
