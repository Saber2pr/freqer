import { useAppSelector } from '@/store/store'

export const useHasProduct = () => {
  const userInfo = useAppSelector((state) => state?.common?.userInfo)

  if (userInfo?.level === 1) {
    return true
  }

  return false
}

export const useIsLogined = () => {
  const userInfo = useAppSelector((state) => state?.common?.userInfo)
  return !!userInfo?.username
}
