import { CreatePostForm } from '@/components/CreatePostForm'
import { LoginForm } from '@/components/LoginForm'
import { LogoutButton } from '@/components/LogOutButton'
import PostsList from '@/components/PostsList'
import { Welcome } from '@/components/Welcome'
import { cookies } from 'next/headers'
import React from 'react'

const COOKIE_KEY = 'payload-token'

export default async function Home() {
  const cookieStore = await cookies()
  const payloadToken = cookieStore.get(COOKIE_KEY)

  return (
    <div className={'pt-10 px-4 pb-10 flex-col min-h-screen flex items-center'}>
      {payloadToken?.value ? (
        <>
          <LogoutButton className={'ml-auto flex mb-4'} />
          <Welcome />
          <CreatePostForm />
          <PostsList />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
