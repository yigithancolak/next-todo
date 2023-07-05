import { prisma } from '@/prisma/db'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Session not found', {
      status: 401
    })
  }

  try {
    const data = await prisma.todo.findMany({
      where: { userId: Number(session.id) },
      orderBy: { createdAt: 'asc' }
    })

    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    return new Response('Failed to fetch', { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Session not found', {
      status: 401
    })
  }

  const { title, importance } = await req.json()
  try {
    const data = await prisma.todo.create({
      data: {
        title,
        importance,
        userId: Number(session?.id)
      }
    })

    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    return new Response('Failed to create todo', { status: 500 })
  }
}
