import { motion } from 'framer-motion'

export default function Loading() {
  return (
    <motion.svg
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, damping: 5 }}
      xmlns='http://www.w3.org/2000/svg'
      width='70'
      height='70'
      viewBox='0 0 16 16'
      className='fill-black'
    >
      <motion.path
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{
          duration: 1,
          ease: 'easeIn',
          repeat: Infinity,
          damping: 5
        }}
        d='M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z'
      />{' '}
    </motion.svg>
  )
}
