// 'use client'
import TodosContainer from '@/components/TodosContainer/TodosContainer'
import Hydrate from '@/lib/tanstack-query/HydrateClient'
import getQueryClient from '@/lib/tanstack-query/getQueryClient'
import { prisma } from '@/prisma/db'
import { dehydrate } from '@tanstack/query-core'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

// const getTodos = async () => {

//   const todos: Todo[] = await prisma.todo.findMany()
//   return todos
// }
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

  // const { data, isLoading } = useQuery<Todo[]>({
  //   queryKey: ['todos'],
  //   queryFn: getTodosFn
  // })

  // if (isLoading)
  //   return (
  //     <div className='flex h-[40vh] items-center justify-center'>
  //       <Loading />
  //     </div>
  //   )
  // if (!data)
  //   return (
  //     <div className='flex h-[40vh] items-center justify-center'>
  //       <p className='text-center text-h3'>No data has found.</p>
  //     </div>
  //   )

  // if (data && data.length === 0) {
  //   return (
  //     <div className='flex h-[40vh] items-center justify-center'>
  //       <p className='text-center text-h3'>You don&apos;t have todos.</p>
  //     </div>
  //   )
  // }

  return (
    <Hydrate state={dehydratedState}>
      <TodosContainer />
    </Hydrate>
  )
}
