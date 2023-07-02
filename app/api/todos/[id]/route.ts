import { prisma } from '@/prisma/db'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)

  try {
    const data = await prisma.todo.findFirst({
      where: { id }
    })

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  {
    params
  }: {
    params: { id: string }
  }
) {
  const { title, importance, complete } = await req.json()

  const id = Number(params.id)

  try {
    const data = await prisma.todo.update({
      where: { id },
      data: {
        title,
        importance,
        complete
      }
    })

    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    return new Response('Failed to update todo', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  {
    params
  }: {
    params: { id: string }
  }
) {
  const id = Number(params.id)

  try {
    const data = await prisma.todo.delete({
      where: { id }
    })

    return new Response(JSON.stringify(data), { status: 201 })
  } catch (error) {
    return new Response('Failed to update todo', { status: 500 })
  }
}
