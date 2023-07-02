'use client'
import TodoItem from '@/components/TodoItem'
import { getTodosFn } from '@/lib/utils/constants/queryFns'
import { Todo } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const { data, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: getTodosFn
  })

  if (isLoading) return <div>Loading...</div>
  if (!data) return <div>Not Found...</div>

  return (
    <main className='flex max-h-[70vh]  flex-col items-center px-4 overflow-auto'>
      <ul className='w-full md:w-2/3'>
        {data.map((todo: any) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </ul>
    </main>
  )
}
