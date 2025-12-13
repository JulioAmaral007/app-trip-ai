import { supabase } from '@/config/supabase'
import type { GeneratedTripType, ResponseType } from '@/services/types'

// Função auxiliar para converter snake_case do DB para camelCase
export function toCamelCase(dbData: Record<string, any>): Partial<GeneratedTripType> {
  return {
    id: dbData.id,
    uid: dbData.uid,
    tripName: dbData.trip_name,
    destination: dbData.destination,
    destinationImageUrl: dbData.destination_image_url,
    summary: dbData.summary,
    itinerary: dbData.itinerary,
    totalEstimatedCost: dbData.total_estimated_cost,
    recommendations: dbData.recommendations,
    tips: dbData.tips,
    travelerType: dbData.traveler_type,
    startDate: dbData.start_date,
    endDate: dbData.end_date,
    minBudget: dbData.min_budget,
    maxBudget: dbData.max_budget,
    spendingHabit: dbData.spending_habit,
    selectedInterests: dbData.selected_interests,
    created: dbData.created,
  }
}

// Função auxiliar para converter camelCase para snake_case
function toSnakeCase(tripData: Partial<GeneratedTripType>): Record<string, any> {
  const result: Record<string, any> = {}
  
  if (tripData.id !== undefined) result.id = tripData.id
  if (tripData.uid !== undefined) result.uid = tripData.uid
  if (tripData.tripName !== undefined) result.trip_name = tripData.tripName
  if (tripData.destination !== undefined) result.destination = tripData.destination
  if (tripData.destinationImageUrl !== undefined) result.destination_image_url = tripData.destinationImageUrl
  if (tripData.summary !== undefined) result.summary = tripData.summary
  if (tripData.itinerary !== undefined) result.itinerary = tripData.itinerary
  if (tripData.totalEstimatedCost !== undefined) result.total_estimated_cost = tripData.totalEstimatedCost
  if (tripData.recommendations !== undefined) result.recommendations = tripData.recommendations
  if (tripData.tips !== undefined) result.tips = tripData.tips
  if (tripData.travelerType !== undefined) result.traveler_type = tripData.travelerType
  if (tripData.startDate !== undefined) result.start_date = tripData.startDate
  if (tripData.endDate !== undefined) result.end_date = tripData.endDate
  if (tripData.minBudget !== undefined) result.min_budget = tripData.minBudget
  if (tripData.maxBudget !== undefined) result.max_budget = tripData.maxBudget
  if (tripData.spendingHabit !== undefined) result.spending_habit = tripData.spendingHabit
  if (tripData.selectedInterests !== undefined) result.selected_interests = tripData.selectedInterests
  if (tripData.created !== undefined) result.created = tripData.created
  
  return result
}

export async function createOrUpdateTrip(
  tripData: Partial<GeneratedTripType>
): Promise<ResponseType> {
  try {
    const tripToSave = toSnakeCase(tripData)

    if (!tripData?.id) {
      tripToSave.created = new Date().toISOString()
    } else {
      tripToSave.updated_at = new Date().toISOString()
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
    // Converter dados do AI de camelCase para snake_case (nomes das colunas no Supabase)
    const tripToSave: Record<string, any> = {
      uid: userId,
      trip_name: aiGeneratedData.tripName,
      destination: aiGeneratedData.destination,
      summary: aiGeneratedData.summary,
      itinerary: aiGeneratedData.itinerary,
      total_estimated_cost: aiGeneratedData.totalEstimatedCost,
      recommendations: aiGeneratedData.recommendations,
      tips: aiGeneratedData.tips,
      // Dados originais da criação para referência
      traveler_type: originalTripData.travelerType,
      start_date: originalTripData.startDate?.dateString,
      end_date: originalTripData.endDate?.dateString,
      min_budget: originalTripData.minBudget,
      max_budget: originalTripData.maxBudget,
      spending_habit: originalTripData.spendingHabit,
      selected_interests: originalTripData.selectedInterests,
      created: new Date().toISOString(),
    }

    // Adicionar URL da imagem do destino se disponível
    if (aiGeneratedData.destinationImageUrl) {
      tripToSave.destination_image_url = aiGeneratedData.destinationImageUrl
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

// Buscar viagens de um usuário com conversão automática de snake_case para camelCase
export async function getUserTrips(userId: string): Promise<ResponseType> {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('uid', userId)
      .order('created', { ascending: false })

    if (error) {
      return { success: false, msg: error.message }
    }

    // Converter todos os registros de snake_case para camelCase
    const trips = data?.map(toCamelCase) || []
    return { success: true, data: trips }
  } catch (error: unknown) {
    console.log('error fetching user trips: ', error)
    return { success: false, msg: (error as Error).message }
  }
}

// Buscar uma viagem específica por ID
export async function getTripById(tripId: string): Promise<ResponseType> {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', tripId)
      .single()

    if (error) {
      return { success: false, msg: error.message }
    }

    // Converter de snake_case para camelCase
    const trip = toCamelCase(data)
    return { success: true, data: trip }
  } catch (error: unknown) {
    console.log('error fetching trip: ', error)
    return { success: false, msg: (error as Error).message }
  }
}
