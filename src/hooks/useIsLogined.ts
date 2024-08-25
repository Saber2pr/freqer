import { useAppSelector } from '@/store/store'

export const useIsLogined = () => {
  const userInfo = useAppSelector((state) => state?.common?.userInfo)
  return !!userInfo?.username
}
