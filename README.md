
# NEXT TODO

Todo app with authorization, CRUD operations of todos and real time, optimistic updates.

## Features

- Creating account
- Personalized data for each account
- Smooth experience on deleting and updating todo data
- Responsive UI
- Improved UX with animations

## Tech Stack

**Language:** TypeScript

**Framework:** React, Next.js

**Styling:** TailwindCSS, Framer-Motion

**Data Fetching:** Tanstack Query

**Database-ORM:** Prisma, Vercel-Postgres

**Auth:** Next-auth

**Server-side:** Node.js (Next.js api routes)

**Encryption:** Bcrypt






## Run Locally

Clone the project

```bash
  git clone https://github.com/yigithancolak/next-todo.git
```

Go to the project directory

```bash
  cd next-todo
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Optimistic Updates

For improving the UX optimistic updates implemented on the deleting and updating operations with using tanstack/react-query

```javascript
// Handle Delete Mutation to Update Optimistic Updates
  const deleteMutation = useMutation({
    mutationFn: deleteTodoFn,
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos'])

      // Optimistically remove the todo from the array
      let updatedTodos: Todo[] = []

      if (previousTodos) {
        updatedTodos = [...previousTodos].filter((todo) => todo.id !== id)
      }

      queryClient.setQueryData<Todo[]>(['todos'], updatedTodos)

      // Return a context object with the snapshotted value
      return { previousTodos }
    },

    // If the mutation fails, use the context we returned above
    onError: (context: { previousTodos?: Todo[] | undefined }) => {
      queryClient.setQueryData<Todo[]>(['todos'], context.previousTodos)
    },

    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })

```
In this example i deleted todo without waiting for server response to give user a smooth experience. If server response is not okay so todo immediately appears on screen. This is the down-side when performing optimistic update, if the operation is not successful on server-side it immediately affects client-side.

## APP DEMO
[screen-recording (5).webm](https://github.com/yigithancolak/next-todo/assets/122079418/d0ada79e-adce-4f52-ae3c-839bf42b9343)




