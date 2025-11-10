'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { UserData } from '@/server/actions/authorizeUser'

type UserContextType = {
  user: UserData | null
  setUser: (user: UserData | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
