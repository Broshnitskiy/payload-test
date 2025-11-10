'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { authorizeUser } from '@/server/actions/authorizeUser'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUser } from '@/context'

const loginSchema = z.object({
  email: z.email('Incorrect email'),
  password: z.string().min(3, 'Too short password'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user, setUser } = useUser()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setError(null)
    setLoading(true)

    try {
      const user = await authorizeUser(values.email, values.password)
      if (!user) {
        setError('Something went wrong!')
        return
      }

      setUser(user)
    } catch (err) {
      console.error(err)
      setError('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <Card className="max-w-md mt-10 p-6 text-center">
        <CardTitle className="text-xl mb-2">Congratulations, {user.name}</CardTitle>
        <p className="text-gray-500">You have successfully logged in.</p>
      </Card>
    )
  }

  return (
    <Card className="max-w-md w-full my-auto">
      <CardHeader>
        <CardTitle>Log in</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="false">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="test@test.com" {...field} autoComplete="false" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} autoComplete="false" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Processing...' : 'Log in'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
