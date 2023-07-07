'use client'

import { containerVariant } from '@/lib/framer-motion/variants'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function RegisterPage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: ''
  })
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { name, email, password } = userInfo
    if (!name || !email || !password) {
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })
      setLoading(false)

      if (!res.ok) {
        throw new Error('Failed to create todo')
      }

      // Todo creation was successful, redirect
      router.push(AppRoutes.Login)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return (
    <motion.section
      variants={containerVariant}
      initial='hidden'
      animate='visible'
      //animation

      className='flex flex-col justify-center items-center h-[60vh] w-full'
    >
      <h2 className='text-h2 text-center mb-2'>Register</h2>

      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-2/3 md:w-1/3 gap-2'
      >
        <input
          placeholder='name'
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          className='input-primary'
        />
        <input
          type='email'
          placeholder='email'
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          className='input-primary'
        />

        <input
          type='password'
          placeholder='password'
          className='input-primary'
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />

        <button type='submit' className='btn-primary' disabled={loading}>
          {!loading ? 'Sign Up' : 'Loading...'}
        </button>
        <p>
          Have an account ?{' '}
          {
            <Link className='text-secondary-light' href={AppRoutes.Login}>
              Sign In
            </Link>
          }
        </p>
      </form>
    </motion.section>
  )
}
