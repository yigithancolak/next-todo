'use client'
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai'

interface TodoItemProps {
  id: string
  title: string
  complete: boolean
  importance: string
  toggleTodo: (id: string, complete: boolean) => void
}

export default function TodoItem(props: TodoItemProps) {
  const { id, title, complete, toggleTodo, importance } = props
  return (
    <li className='flex relative gap-1 items-center border border-white p-2 mb-2 last:mb-0 rounded'>
      <input
        id={id}
        type='checkbox'
        defaultChecked={complete}
        onChange={(e) => toggleTodo(id, e.target.checked)}
        className='cursor-pointer peer'
      />
      <label
        htmlFor={id}
        className='peer-checked:line-through cursor-pointer peer-checked:text-slate-500'
      >
        {title}
      </label>
      <span>{importance}</span>
      <div className='flex absolute right-2 gap-2 '>
        <button className='flex'>
          <AiFillEdit fontSize={20} className='text-yellow-300' />
        </button>
        <button className='flex'>
          <AiOutlineDelete fontSize={20} className='text-red-500' />
        </button>
      </div>
    </li>
  )
}
