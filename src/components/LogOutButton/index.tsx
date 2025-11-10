'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@/context'
import { logOut } from '@/server/actions/logOut'
import { ComponentProps, FC } from 'react'

type LogoutButtonProps = Pick<ComponentProps<typeof Button>, 'className'>

export function LogoutButton({ className }: LogoutButtonProps) {
  const { setUser } = useUser()

  const handleClick = async () => {
    try {
      await logOut()
      setUser(null)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Button className={className} onClick={handleClick}>
      Log Out
    </Button>
  )
}
