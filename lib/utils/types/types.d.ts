import 'next-auth'

declare module 'next-auth' {
  interface Session {
    id: string
  }
  interface User {
    id: string
  }
}
