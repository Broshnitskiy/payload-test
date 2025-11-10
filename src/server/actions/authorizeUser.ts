'use server'

import { login } from '@payloadcms/next/auth'
import config from '@payload-config'

export interface UserData {
  collection: string
  createdAt: Date
  email: string
  id: string
  name: string
}

export async function authorizeUser(email: string, password: string) {
  try {
    const result = await login({
      collection: 'users',
      config,
      email,
      password,
    })
    return result.user as UserData
  } catch (error) {
    throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
