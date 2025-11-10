'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { Post } from '@/payload-types'
import { revalidatePath } from 'next/cache'

export async function createPost({
  title,
  content,
  owner,
  slug,
  categories,
}: Pick<Post, 'title' | 'categories' | 'owner' | 'content' | 'slug'>) {
  const payload = await getPayload({ config })

  try {
    const post = await payload.create({
      collection: 'posts',
      data: { title, content, owner, slug, categories },
    })

    revalidatePath('/')
    return post
  } catch (error) {
    throw new Error(
      `Error creating post: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}
