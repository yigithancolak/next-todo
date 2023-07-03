'use client'

import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function RegisterPage() {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    name: ''
  })
  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { name, email, password } = userInfo
    if (!name || !email || !password) {
      return
    }

    try {
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

      if (!res.ok) {
        throw new Error('Failed to create todo')
      }

      // Todo creation was successful, redirect
      router.push(AppRoutes.Login)
    } catch (err) {
      console.log(err)
    }

    // const password = await hash(userInfo.password, 12)
    // const user = await prisma.user.create({
    //   data: {
    //     name: userInfo.name,
    //     email: userInfo.email,
    //     password: userInfo.password
    //   }
    // })
    //token for e-mail confirmation
    // const token = await prisma.activateToken.create({
    //     data:{
    //         token: `${randomUUID()}${randomUUID()}`.replace(/-/g,''),
    //         userId:user.id
    //     }
    // })
    //continue with e-mail sending service
  }

  return (
    <section className='flex flex-col justify-center items-center h-[60vh]'>
      <h2 className='text-h2 text-center'>Register</h2>

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

        <button type='submit' className='btn-primary'>
          Register
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
    </section>
  )
}
