'use client'
import Loading from '@/components/Loading/Loading'
import { containerVariant } from '@/lib/framer-motion/variants'
import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import { getSingleTodoFn, updateTodoFn } from '@/lib/utils/constants/queryFns'
import { Todo } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { notFound, useParams, useRouter } from 'next/navigation'
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

  // const { mutateAsync: updateTodo, isLoading: updateLoading } = useMutation({
  //   mutationFn: () =>
  //     updateTodoFn({ id, title, importance, complete: data?.complete! }),
  //   // onError: (err: any) => toast.error(err.response.data.error),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['todos'] })
  //     router.push(AppRoutes.Home)
  //   }
  // })

  const updateTodoMutation = useMutation({
    //@ts-ignore
    mutationFn: updateTodoFn,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      // Optimistically update to the new value
      if (previousTodos) {
        const updatedTodos: Todo[] = [...previousTodos].map((todo) =>
          todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
        )
        queryClient.setQueryData<Todo[]>(['todos'], updatedTodos)
      }

      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    onError: (
      err,
      variables,
      context: { previousTodos?: Todo[] | undefined }
    ) => {
      queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
    },
    onSuccess: () => {
      router.push(AppRoutes.Home)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (title === '' || importance === '') {
      return
    }

    updateTodoMutation.mutate({
      id: Number(id),
      title,
      importance,
      complete: data?.complete!
    })
  }

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setImportance(data.importance)
    }
  }, [data])

  if (valuesLoading)
    return (
      <div className='flex h-[40vh] items-center justify-center'>
        <Loading />
      </div>
    )
  if (!data) throw notFound()

  return (
    <motion.section
      //animations
      variants={containerVariant}
      initial='hidden'
      animate='visible'
      //animations

      className='w-full h-full flex flex-col items-center'
    >
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
            disabled={updateTodoMutation.isLoading}
            type='submit'
            className='btn-primary'
          >
            Update
          </button>
        </div>
      </form>
    </motion.section>
  )
}
