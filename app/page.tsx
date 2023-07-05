'use client'
import Loading from '@/components/Loading/Loading'
import TodoItem from '@/components/TodoItem/TodoItem'
import { getTodosFn } from '@/lib/utils/constants/queryFns'
import { Todo } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodosFn
  })

  if (isLoading)
    return (
      <div className='flex h-[40vh] items-center justify-center'>
        <Loading />
      </div>
    )
  if (!data)
    return (
      <div className='flex h-[40vh] items-center justify-center'>
        <p className='text-center text-h3'>No data has found.</p>
      </div>
    )

  if (data && data.length === 0) {
    return (
      <div className='flex h-[40vh] items-center justify-center'>
        <p className='text-center text-h3'>You don&apos;t have todos.</p>
      </div>
    )
  }

  return (
    <main className='flex h-[75vh] flex-col items-center px-4 overflow-auto'>
      <ul className='w-full md:w-2/3'>
        {data.map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </main>
  )
}
