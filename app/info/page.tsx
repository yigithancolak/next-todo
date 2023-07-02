export default function InfoPage() {
  return (
    <main className='flex flex-col gap-3 px-4'>
      <h2 className='text-center text-h2'>Welcome to Next Todos App</h2>
      <p className='border-b-2'>
        I designed this app for learning Next.js and Prisma.
      </p>
      <p className='border-b-2'>
        You can simply Create,Update and Delete your todos. You can also check
        them if they are completed. Important todos will have red red border
        their top.
      </p>
      <ul>
        <li>
          Github repository{' '}
          <a
            href='https://github.com/yigithancolak/next-todo'
            target='_blank'
            className='font-extrabold'
          >
            Click
          </a>
        </li>
        <li>
          My github account{' '}
          <a
            href='https://github.com/yigithancolak'
            target='_blank'
            className='font-extrabold'
          >
            Click
          </a>
        </li>
        <li>
          My Linkedin account{' '}
          <a
            href='https://www.linkedin.com/in/yigithancolak01/'
            target='_blank'
            className='font-extrabold'
          >
            Click
          </a>
        </li>
      </ul>
    </main>
  )
}
