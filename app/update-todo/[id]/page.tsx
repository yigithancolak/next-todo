'use client'
import { getSingleTodoFn, updateTodoFn } from '@/lib/utils/constants/queryFns'
import { Todo } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function UpdateTodoPage() {
  const [title, setTitle] = useState('')
  const [importance, setImportance] = useState('')
  const router = useRouter()
  const queryClient = useQueryClient()

  const { id } = useParams()

  const { data, isLoading: valuesLoading } = useQuery<Todo>({
    queryKey: ['singleTodo', id],
    queryFn: () => getSingleTodoFn(id)
  })

  const { mutateAsync: updateTodo, isLoading: updateLoading } = useMutation({
    mutationFn: () =>
      updateTodoFn({ id, title, importance, complete: data?.complete! }),
    // onError: (err: any) => toast.error(err.response.data.error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      router.push('/')
    }
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (title === '' || importance === '') {
      return
    }
    updateTodo()
  }

  if (valuesLoading) return <div>Loading...</div>
  if (!data) return <div>Not Found...</div>

  return (
    <section className='flex flex-col items-center'>
      <h3 className='text-2xl text- mb-4'>Update Todo</h3>
      <form
        onSubmit={handleSubmit}
        className='flex gap-2 flex-col sm:w-2/3 md:w-1/3'
      >
        <input
          value={title || data.title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          className='border border-slate-100 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        />
        <select
          name='important'
          value={importance || data.importance}
          onChange={(e) => setImportance(e.target.value)}
          className='form-select mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black py-2'
        >
          <option value='' disabled>
            Select Importance
          </option>
          <option value='important'>Important</option>
          <option value='not-important'>Not Important</option>
        </select>
        <div
          className='flex w-full 
        sm:justify-between md:justify-end md:gap-3'
        >
          <Link
            href='..'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none'
          >
            Cancel
          </Link>
          <button
            disabled={updateLoading}
            type='submit'
            className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none
            disabled:bg-slate-400
            '
          >
            Update
          </button>
        </div>
      </form>
    </section>
  )
}
