import TodosContainer from '@/components/TodosContainer/TodosContainer'
import Hydrate from '@/lib/tanstack-query/HydrateClient'
import getQueryClient from '@/lib/tanstack-query/getQueryClient'
import { prisma } from '@/prisma/db'
import { dehydrate } from '@tanstack/query-core'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

async function getTodosServerFn() {
  const session = await getServerSession(authOptions)
  const todos = await prisma.todo.findMany({
    where: { userId: Number(session?.id) },
    orderBy: { createdAt: 'asc' }
  })

  return todos
}

export default async function HomePage() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(['todos'], getTodosServerFn)

  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <TodosContainer />
    </Hydrate>
  )
}
