'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPosts() {
  const payload = await getPayload({ config })

  try {
    const posts = await payload.find({
      collection: 'posts',
    })

    return posts.docs
  } catch (error) {
    throw new Error(`${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
