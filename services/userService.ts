import { supabase } from '@/config/supabase'
import type { ResponseType, UserDataType } from '@/services/types'

export const updateUser = async (uid: string, updatedData: UserDataType): Promise<ResponseType> => {
  try {
    const { error } = await supabase
      .from('users')
      .update(updatedData)
      .eq('id', uid)

    if (error) {
      return { success: false, msg: error.message }
    }

    return { success: true }
  } catch (error) {
    return { success: false, msg: (error as Error).message }
  }
}
