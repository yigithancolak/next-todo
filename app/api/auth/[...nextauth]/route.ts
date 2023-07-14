import { prisma } from '@/prisma/db'
import { compare } from 'bcrypt'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com'
          //For not customized SignIn page
        },
        password: { label: 'Password', type: 'password' }
      },

      //SignIn function runs authorize method
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) return null

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) return null

        //for not confirmed users.
        if (!user.active) {
          throw new Error('User is not active')
        }

        //if everything okay
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name
        }
      }
    })

    // ...add more providers here.
  ],
  callbacks: {
    session: ({ session, token }) => {
      // console.log('Session Callback', { session, token })

      //In types.d.ts folder id type aded.Otherwise ts does not see the id as property.
      return {
        ...session,
        id: token.id
        //be aware that id is string typed.
      }
    },
    jwt: ({ token, user }) => {
      // console.log('JWT Callback', { token, user })
      if (user) {
        return {
          ...token,
          id: user.id
        }
      }
      return token
    }
  },
  pages: {
    signIn: '/auth'
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
