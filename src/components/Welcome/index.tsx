'use client'

import { Card, CardTitle } from '@/components/ui/card'

import { useUser } from '@/context'

export function Welcome() {
  const { user } = useUser()

  return (
    <Card className="max-w-md mt-10 p-6 text-center">
      <CardTitle className="text-xl mb-2">Congratulations, {user?.name ?? 'friend'}</CardTitle>
      <p className="text-gray-500">You have successfully logged in.</p>
    </Card>
  )
}
