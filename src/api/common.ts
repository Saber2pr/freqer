import { GetConfigResponse } from './interface'
import { ApiUrls, request } from './request'

export const getConfig = async () => {
  const res = await request.get<GetConfigResponse>(`${ApiUrls.config}`)
  return res.data
}
