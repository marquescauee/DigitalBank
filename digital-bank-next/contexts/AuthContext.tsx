'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { validateToken, refreshToken, logout } from '@/routes/auth'
import { fetchUser } from '@/routes/user'
import { useRouter } from 'next/navigation'

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextType {
  user: User | undefined
}

const AuthContext = createContext<AuthContextType>({ user: undefined })

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>()
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      let validToken = await validateToken()

      if (validToken.statusCode !== 200) {
        const refreshedToken = await refreshToken()
        if (refreshedToken.statusCode !== 200) {
          await logout()
          router.push('/sign-in')
          return
        }
      }

      const { user } = await fetchUser()

      setUser(user)
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
