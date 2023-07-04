'use client'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function NewTodoPage() {
  const [title, setTitle] = useState('')
  const [importance, setImportance] = useState('')
  const router = useRouter()

  async function createTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (title === '' || importance === '') {
      return
    }

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          importance
        })
      })

      if (!res.ok) {
        throw new Error('Failed to create todo')
      }

      // Todo creation was successful, redirect
      router.push(AppRoutes.Home)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl text-center p-3'>Create New Todo</h3>
      <form
        onSubmit={createTodo}
        className='flex gap-4 flex-col sm:w-2/3 md:w-1/3'
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          className='input-primary'
        />
        <select
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          className='select-primary'
        >
          <option value='' disabled>
            Select Importance
          </option>
          <option value='important'>Important</option>
          <option value='not-important'>Not Important</option>
        </select>
        <div className='flex gap-1 justify-end'>
          <Link href='..' className='btn-primary'>
            Cancel
          </Link>
          <button type='submit' className='btn-primary'>
            Create
          </button>
        </div>
      </form>
    </section>
  )
}
