'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export async function createPost({
  title,
  content,
  owner,
}: {
  title: string
  content: string
  owner: string
}) {
  const payload = await getPayload({ config })

  try {
    const post = await payload.create({
      collection: 'posts',
      title,
      content,
      owner,
    })
    return post
  } catch (error) {
    throw new Error(
      `Error creating post: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
