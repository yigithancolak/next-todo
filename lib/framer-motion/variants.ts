export const containerVariant = {
  hidden: {
    opacity: 0,
    y: -20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export const todoItemVariant = {
  hidden: {
    width: 0
  },
  visible: {
    width: '100%',
    transition: { duration: 0.5 }
  }
}
