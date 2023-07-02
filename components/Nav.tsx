'use client'
import Link from 'next/link'

function Nav() {
  return (
    <nav>
      <Link
        className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
        href='/new-todo'
      >
        Create New Todo
      </Link>
    </nav>
  )
}

export default Nav
