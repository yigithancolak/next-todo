'use client'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineQuestion } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { IoCreateOutline } from 'react-icons/io5'

interface NavProps {
  session: Session | null
}

export default function Nav(props: NavProps) {
  const { session } = props
  const pathname = usePathname()

  return (
    <nav>
      {/* Larger Screen's Nav */}
      <div className='hidden md:flex sm:gap-1'>
        <Link className='btn-primary' href={AppRoutes.Info}>
          Info
        </Link>

        {!session ? (
          <button
            className='btn-primary'
            disabled={pathname === AppRoutes.Login}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        ) : (
          <>
            <Link className='btn-primary' href={AppRoutes.New}>
              Create New Todo
            </Link>
            <button
              className='btn-primary bg-red-600 text-white border-secondary'
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
      {/* Small Screen nav */}
      <div className='flex md:hidden gap-1'>
        <Link className='btn-primary' href={AppRoutes.Info}>
          <AiOutlineQuestion fontSize={20} />
        </Link>

        {!session ? (
          <button
            className='btn-primary'
            disabled={pathname === AppRoutes.Login}
            onClick={() => signIn()}
          >
            {/* <AiOutlineLogin fontSize={20} /> */}
            Sign In
          </button>
        ) : (
          <>
            <Link className='btn-primary' href={AppRoutes.New}>
              <IoCreateOutline fontSize={20} />
            </Link>
            <button
              className='btn-primary bg-red-600 text-white border-secondary'
              onClick={() => signOut()}
            >
              <FiLogOut fontSize={20} />
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
