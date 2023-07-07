import { AppRoutes } from '@/lib/utils/constants/AppRoutes'
import Link from 'next/link'

export default function NotFoundTodoPage() {
  return (
    <div className='flex flex-col h-[40vh] items-center justify-center'>
      <p className='text-center text-h3'>Todo has not found.</p>
      <Link href={AppRoutes.Home} className='btn-primary'>
        Go Home
      </Link>
    </div>
  )
}
