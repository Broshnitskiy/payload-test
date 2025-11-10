'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPost } from '@/server/actions/createPost'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useUser } from '@/context'
import { getCategories } from '@/server/actions'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '../ui/badge'
import { Category } from '@/payload-types'
import toast from 'react-hot-toast'
import { slugify } from '@/utilities/slugify'

const postSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  categories: z.array(z.string()).optional(),
})

type PostFormValues = z.infer<typeof postSchema>

export function CreatePostForm() {
  const { user } = useUser()

  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      categories: [],
    },
  })

  const onSubmit = async (values: PostFormValues) => {
    setLoading(true)

    try {
      const post = await createPost({
        ...values,
        slug: slugify(values.title),
        owner: user?.id,
      })
      toast.success(`✅ Post "${post?.title || values.title}" created successfully!`)
      form.reset()
      setSelectedCategories([])
    } catch (error) {
      console.error(error)
      toast.error(`${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  // Fetch categories from Payload API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getCategories()

        setCategories(categories || [])
      } catch (err) {
        console.error('Failed to load categories', err)
      }
    }

    fetchCategories()
  }, [])

  return (
    <Card className="max-w-lg w-full mx-auto mt-10">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea rows={5} placeholder="Write your post..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categories */}
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        if (!selectedCategories.includes(value)) {
                          setSelectedCategories([...selectedCategories, value])
                          form.setValue('categories', [...selectedCategories, value])
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCategories.map((id) => {
                      const cat = categories.find((c) => c.id === id)
                      return (
                        <Badge
                          key={id}
                          variant="secondary"
                          onClick={() => {
                            const newCats = selectedCategories.filter((c) => c !== id)
                            setSelectedCategories(newCats)
                            form.setValue('categories', newCats)
                          }}
                          className="cursor-pointer"
                        >
                          {cat?.title || 'Unknown'} ×
                        </Badge>
                      )
                    })}
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button type="submit" className="w-full !mt-10" disabled={loading}>
              {loading ? 'Creating...' : 'Create Post'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
