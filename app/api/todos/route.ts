import { prisma } from '@/prisma/db'

export async function GET(req: Request, res: Response) {
  try {
    const data = await prisma.todo.findMany()

    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    return new Response('Failed to fetch', { status: 500 })
  }
}

export async function POST(req: Request, res: Response) {
  const { title, importance } = await req.json()
  try {
    const data = await prisma.todo.create({
      data: {
        title,
        importance
      }
    })

    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    return new Response('Failed to create todo', { status: 500 })
  }
}
