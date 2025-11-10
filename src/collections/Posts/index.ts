import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    { name: 'content', type: 'richText' },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
