'use client'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import Link from 'next/link'

function Nav() {
  return (
    <nav className='flex gap-2'>
      <Link className='btn-primary' href={AppRoutes.Info}>
        Info
      </Link>
      <Link className='btn-primary' href={AppRoutes.New}>
        Create New Todo
      </Link>
    </nav>
  )
}

export default Nav
