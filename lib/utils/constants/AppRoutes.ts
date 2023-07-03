export enum AppRoutes {
  Home = '/',
  New = '/new-todo',
  Update = '/update-todo',
  Info = '/info',
  Login = '/auth/login',
  Register = '/auth/register'
}

// const routes = Object.values(AppRoutes)

// export const protectedRoutes = routes.filter(
//   (route) => route !== AppRoutes.Login || AppRoutes.Register
// )

//above code will be used for middleware
