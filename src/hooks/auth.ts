import supabase from '@/lib/supabase'
import { UserCredentials } from '@supabase/supabase-js'
import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import useSWR from 'swr'

interface ResendEmailVerificationParams {
  setStatus: (status: string) => void
}

export const useAuth = (options: { middleware?: 'guest' | 'auth' } = {}) => {
  const router = useRouter()

  const {
    data: user,
    error,
    revalidate,
  } = useSWR('/api/user', () => {
    return supabase.auth.user()
  })

  const register = async ({ email, password }: UserCredentials) => {
    const { session } = await supabase.auth.signUp({
      email,
      password,
    })

    if (session === null) {
      return router.push('/verify-email')
    }

    revalidate()
  }

  const login = async ({ email, password }: UserCredentials) => {
    const { session } = await supabase.auth.signIn({
      email,
      password,
    })

    if (session === null) {
      return router.push('/verify-email')
    }

    revalidate()
  }

  const resendEmailVerification = async ({
    setStatus,
  }: ResendEmailVerificationParams) => {
    await supabase.auth.api.resetPasswordForEmail(user?.email || '')
    setStatus('verification-link-sent')
  }

  const logout = async () => {
    await supabase.auth.signOut()

    revalidate()

    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (options.middleware == 'guest' && user) {
      router.push('/dashboard')
      return
    }

    if (options.middleware == 'auth' && user === null) {
      logout()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error])

  return {
    user,
    register,
    login,
    resendEmailVerification,
    logout,
  }
}
