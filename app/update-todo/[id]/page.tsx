'use client'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default async function UpdateTodoPage() {
  const [title, setTitle] = useState('')
  const [importance, setImportance] = useState('')
  const router = useRouter()

  const { id } = useParams()

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch(`/api/todos/${id}`)

      if (!res.ok) {
        console.log(res)
      }

      return await res.json()
    }

    fetchTodo().then((data) => {
      setTitle(data.title)
      setImportance(data.importance)
    })
  }, [id])

  async function updateTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (title === '' || importance === '') {
      return
    }
    const res = await fetch('/api/todos', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        importance
      })
    }).then(() => router.push('/'))
  }

  return (
    <div className='flex flex-col items-center'>
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl text-center'>Update Todo</h1>
      </header>
      <form onSubmit={updateTodo} className='flex gap-2 flex-col w-1/2'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          className='border border-slate-100 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <select
          name='important'
          value={importance}
          onChange={(e) => setImportance(e.target.value)}
          className='form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black py-2'
        >
          <option value='' disabled>
            Select Importance
          </option>
          <option value='important'>Important</option>
          <option value='not-important'>Not Important</option>
        </select>
        <div className='flex gap-1 justify-end'>
          <Link
            href='..'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Cancel
          </Link>
          <button
            type='submit'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}
