import { prisma } from '@/prisma/db'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return new Response(
      'Request failed with non-existing with non-existing data(Email,Name,Password)',
      { status: 412 }
    )
  }

  const cyrptedPassword = await hash(password, 12)
  //todo: handle error for cyrpted password hash method.

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: cyrptedPassword
      }
    })

    return new Response(JSON.stringify(user), { status: 201 })
  } catch (error) {
    return new Response('Failed to create user', { status: 500 })
  }
}
