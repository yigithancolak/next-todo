'use client'

import AuthForm from '@/components/AuthForm/AuthForm'
import { containerVariant } from '@/lib/framer-motion/variants'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { pageLabels } from '@/lib/utils/constants/pageLabels'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'

export type PageType = 'login' | 'register'

export type UserInfoType = {
  name?: string
  email: string
  password: string
}

export default function AuthPage() {
  const { signInLabels, signUpLabels } = pageLabels
  const { data: session } = useSession()
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    email: '',
    password: '',
    name: ''
  })
  const [page, setPage] = useState<PageType>('login')

  if (session && page === 'login') {
    redirect(AppRoutes.Home)
  }

  return (
    <motion.section
      key={page}
      variants={containerVariant}
      initial='hidden'
      animate='visible'
      //animation

      className='flex flex-col justify-center items-center h-[60vh] w-full'
    >
      <h2 className='text-h2 text-center mb-2'>
        {page === 'login' ? signInLabels.header : signUpLabels.header}
      </h2>
      <AuthForm
        page={page}
        setPage={setPage}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
    </motion.section>
  )
}
