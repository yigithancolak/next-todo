'use client'

import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })

  const { data: session } = useSession()

  const handleTestSignIn = async () => {
    const res = await signIn('credentials', {
      email: 'test@test.com',
      password: 'test',
      callbackUrl: AppRoutes.Home,
      redirect: true
    })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    // validate your userinfo
    e.preventDefault()

    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: AppRoutes.Home,
      redirect: true
    })
  }

  return (
    <section className='flex justify-center items-center h-[60vh]'>
      {!session ? (
        <form
          onSubmit={handleSubmit}
          className='flex flex-col w-2/3 md:w-1/3 gap-2'
        >
          <h2 className='text-h2 text-center'>Login</h2>
          <input
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
            type='email'
            placeholder='email@gmail.com'
            className='input-primary'
          />
          <input
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type='password'
            placeholder='********'
            className='input-primary'
          />

          <button type='submit' className='btn-primary'>
            Sign In
          </button>
          <button
            type='button'
            className='btn-primary'
            onClick={() => handleTestSignIn()}
          >
            Test User
          </button>
          <p>
            Not have an account ?{' '}
            <Link className='underline' href={AppRoutes.Register}>
              Sign Up
            </Link>
          </p>
        </form>
      ) : (
        <p className='text-center'>
          You must signout before you login.{' '}
          <button onClick={() => signOut()} className='underline'>
            Click For Sign Out
          </button>
        </p>
      )}
    </section>
  )
}
