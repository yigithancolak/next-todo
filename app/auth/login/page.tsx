'use client'

import { containerVariant } from '@/lib/framer-motion/variants'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { motion } from 'framer-motion'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { FormEventHandler, useState } from 'react'

export default function LoginPage() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const { data: session } = useSession()

  const handleTestSignIn = async () => {
    try {
      setLoading(true)
      const res = await signIn('credentials', {
        email: 'test@test.com',
        password: 'test',
        callbackUrl: AppRoutes.Home,
        redirect: true
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    if (!userInfo.email || !userInfo.password) {
      return
    }

    setLoading(true)
    signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      callbackUrl: AppRoutes.Home,
      redirect: true
    })
      .finally(() => setLoading(false))
      .catch((error) => console.error(error))
  }

  return (
    <motion.section
      variants={containerVariant}
      initial='hidden'
      animate='visible'
      //animation

      className='flex flex-col justify-center items-center h-[60vh] w-full'
    >
      <h2 className='text-h2 text-center mb-2'>Login</h2>
      {!session ? (
        <form
          onSubmit={handleSubmit}
          className='flex flex-col w-2/3 md:w-1/3 gap-2'
        >
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

          <button disabled={loading} type='submit' className='btn-primary'>
            {!loading ? 'Sign In' : 'Loading...'}
          </button>
          <button
            disabled={loading}
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
    </motion.section>
  )
}
