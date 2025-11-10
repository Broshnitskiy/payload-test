import { LoginForm } from '@/components/LoginForm'
import { LogoutButton } from '@/components/LogOutButton'
import { cookies } from 'next/headers'
import React from 'react'

const COOKIE_KEY = 'payload-token'

export default async function Home() {
  const cookieStore = await cookies()
  const payloadToken = cookieStore.get(COOKIE_KEY)

  return (
    <div className="pt-10 px-4 justify-center">
      {payloadToken?.value ? <LogoutButton className={'ml-auto flex mb-4'} /> : null}

      <LoginForm />
    </div>
  )
}
