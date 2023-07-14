'use client'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineQuestion } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { IoCreateOutline } from 'react-icons/io5'
import { IconType } from 'react-icons/lib'
import { RiUserSharedLine } from 'react-icons/ri'

interface NavProps {
  session: Session | null
}

type NavButton = {
  title?: string
  icon: IconType
  authenticated: boolean
  route?: Url
  method?: () => void
}

const navButtons: NavButton[] = [
  {
    title: 'Info',
    icon: AiOutlineQuestion,
    authenticated: false,
    route: AppRoutes.Info
  },
  {
    title: 'Sign In',
    icon: RiUserSharedLine,
    authenticated: false,
    route: AppRoutes.Auth

    // method: signIn
  },
  {
    title: 'New Todo',
    icon: IoCreateOutline,
    authenticated: true,
    route: AppRoutes.New
  },
  {
    title: 'Sign Out',
    icon: FiLogOut,
    authenticated: true,
    method: signOut
  }
]

export default function Nav(props: NavProps) {
  const { session } = props
  const pathname = usePathname()

  const renderNavButtons = (pathname: string) => {
    const buttons = [...navButtons]
      .filter((button) => button.authenticated === !!session)
      .map((button) => {
        const { title, authenticated, method, route } = button

        if (!!route) {
          return (
            <Link
              key={title}
              href={route}
              className={`btn-primary flex items-center ${
                pathname === route && 'pointer-events-none opacity-20'
              }`}
            >
              <span className='hidden md:inline mr-1'>{title}</span>
              <button.icon className='inline' fontSize={20} />
            </Link>
          )
        }

        return (
          <button
            key={title}
            onClick={method}
            className='btn-primary flex items-center'
          >
            <span className='hidden md:inline mr-1'>{title}</span>
            <button.icon className='inline' fontSize={20} />
          </button>
        )
      })

    return buttons
  }

  return <nav className='flex gap-1'>{renderNavButtons(pathname)}</nav>
}
