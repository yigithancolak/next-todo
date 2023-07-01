import TodoItem from '@/components/TodoItem'
import { prisma } from '@/prisma/db'
import Link from 'next/link'

// function getTodos() {
//   return prisma.todo.findMany()
// }

async function toggleTodo(id: number, complete: boolean) {
  'use server'

  await prisma.todo.update({
    where: { id },
    data: {
      complete
    }
  })
}

async function getTodos() {
  const res = await fetch(`${process.env.BASE_URL}/api/todos`)
  if (!res.ok) {
    console.log(res)
  }
  return res.json()
}

export default async function Home() {
  const todos = await getTodos()

  return (
    <>
      <header className='flex justify-between items-center mb-4'>
        <Link
          className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          href='/new-todo'
        >
          New Todo
        </Link>
        <h1 className='text-2xl text-center'>Next Todos</h1>
      </header>
      <main className='flex  flex-col items-center'>
        <ul className='sm:w-2/3 md:w-1/3'>
          {todos?.map((todo: any) => (
            <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
          ))}
        </ul>
      </main>
    </>
  )
}
