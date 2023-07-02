'use client'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { getSingleTodoFn, updateTodoFn } from '@/lib/utils/constants/queryFns'
import { Todo } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

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
      router.push(AppRoutes.Home)
    }
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (title === '' || importance === '') {
      return
    }
    updateTodo()
  }

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setImportance(data.importance)
    }
  }, [data])

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
          <button
            disabled={updateLoading}
            type='submit'
            className='btn-primary'
          >
            Update
          </button>
        </div>
      </form>
    </section>
  )
}
