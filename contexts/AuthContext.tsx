import { supabase } from '@/config/supabase'
import { Session } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'

export interface AuthUser {
  id: string
  email?: string
  name?: string
}

interface AuthContextType {
  user: AuthUser | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<{ success: boolean; msg?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; msg?: string }>
  signOut: () => Promise<void>
  isLoading: boolean
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  session: null,
  signIn: async () => ({ success: false }),
  register: async () => ({ success: false }),
  signOut: async () => {},
  isLoading: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar sessão inicial
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (error) {
          console.error('Erro ao obter sessão:', error)
          // Se houver erro, limpar sessão e tentar fazer logout
          setSession(null)
          setUser(null)
          setIsLoading(false)
          return
        }
        setSession(session)
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
          })
        } else {
          setUser(null)
        }
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Erro ao obter sessão:', error)
        setSession(null)
        setUser(null)
        setIsLoading(false)
      })

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name || session.user.user_metadata?.full_name,
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      
      // Validação básica
      if (!email.trim()) {
        return { success: false, msg: 'Por favor, informe seu email' }
      }
      
      if (!password.trim()) {
        return { success: false, msg: 'Por favor, informe sua senha' }
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      if (error) {
        // Mensagens de erro mais amigáveis
        let errorMessage = error.message
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email ou senha incorretos. Verifique suas credenciais.'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Por favor, confirme seu email antes de fazer login.'
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Muitas tentativas. Aguarde alguns minutos e tente novamente.'
        }
        return { success: false, msg: errorMessage }
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.user_metadata?.full_name,
        })
      }

      return { success: true }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error)
      return { success: false, msg: error.message || 'Erro ao fazer login. Tente novamente.' }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
            full_name: name,
          },
        },
      })

      if (error) {
        return { success: false, msg: error.message }
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.user_metadata?.full_name,
        })
      }

      return { success: true }
    } catch (error: any) {
      return { success: false, msg: error.message || 'Erro ao criar conta' }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Erro ao fazer logout:', error)
      }
      // Sempre limpar o estado local, mesmo se houver erro
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
      // Sempre limpar o estado local em caso de erro
      setUser(null)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        signIn,
        register,
        signOut,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
