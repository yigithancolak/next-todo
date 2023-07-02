'use client'
import { deleteTodoFn, updateTodoFn } from '@/lib/utils/constants/queryFns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'

interface TodoItemProps {
  id: number
  title: string
  complete: boolean
  importance: string
  // toggleTodo: (id: string, complete: boolean) => void
}

export default function TodoItem(props: TodoItemProps) {
  const { id, title, importance, complete } = props
  const [checked, setChecked] = useState(complete)
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutateAsync: deleteTodo, isLoading } = useMutation({
    mutationFn: () => deleteTodoFn(id),
    // onError: (err: any) => toast.error(err.response.data.error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

  const { mutateAsync: updateTodo, isLoading: updateLoading } = useMutation({
    mutationFn: (complete: boolean) =>
      updateTodoFn({ id, title, importance, complete })
    // onError: (err: any) => toast.error(err.response.data.error),
  })

  return (
    <li
      className={`flex relative gap-1 items-center border ${
        isLoading ? 'border-red-600' : 'border-white'
      } px-2 mb-2 last:mb-0 rounded`}
    >
      <input
        id={id.toString()}
        onChange={(e) => {
          setChecked(e.target.checked)
          updateTodo(e.target.checked)
        }}
        type='checkbox'
        checked={checked}
        className='cursor-pointer peer'
      />
      <label
        htmlFor={id.toString()}
        className='peer-checked:line-through cursor-pointer peer-checked:text-slate-500 p-2 border-r w-1/2 whitespace-normal break-words'
      >
        {title}
      </label>
      {importance === 'important' && (
        <>
          <div className='w-3 h-3 bg-red-500 rounded-full' />
          <span className='text-xs'>Important</span>
        </>
      )}
      <div className='flex absolute right-2 gap-2'>
        <button
          className='flex'
          onClick={() => router.push(`/update-todo/${id}`)}
        >
          <AiFillEdit fontSize={20} className='text-yellow-300' />
        </button>
        <button className='flex' onClick={() => deleteTodo()}>
          <AiOutlineDelete fontSize={20} className='text-red-500' />
        </button>
      </div>
    </li>
  )
}
