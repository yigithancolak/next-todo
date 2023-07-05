'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'

interface ProvidersProps {
  children: ReactNode
}

export default function Providers(props: ProvidersProps) {
  const [queryClient] = useState(new QueryClient())

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
