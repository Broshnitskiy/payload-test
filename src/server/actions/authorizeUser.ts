'use server'

import { login } from '@payloadcms/next/auth'
import config from '@payload-config'
import { User } from '@/payload-types'

export async function authorizeUser(email: string, password: string) {
  try {
    const result = await login({
      collection: 'users',
      config,
      email,
      password,
    })
    return result.user as User
  } catch (error) {
    throw new Error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
