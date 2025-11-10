import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
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
    {
      name: 'content',
      type: 'text',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
    },
  ],
}
