export const formatUserName = (userName: string) => {
  if (typeof userName === 'string') {
    return userName.slice(0, 2).toUpperCase()
  }
  return
}
