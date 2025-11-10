'use server'

import { logout } from '@payloadcms/next/auth'
import config from '@payload-config'

export async function logOut() {
  try {
    return await logout({ allSessions: true, config })
  } catch (error) {
    throw new Error(`Logout failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
