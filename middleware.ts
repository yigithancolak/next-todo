export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/', '/new-todo', '/update-todo/:path*']
}
