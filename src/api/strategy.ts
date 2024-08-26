import axios from 'axios'

import { getArray } from '@/utils'
import { ApiUrls, request } from './request'
import { GetStrategyResponse } from './interface'

const createResourceUri = (uri: string) => {
  return `http://localhost:8080/${uri}`
  // return `https://saber2pr.top/freqer/${uri}`
}

const getResource = async <T = any>(uri: string) => {
  const res = await axios.get<T>(`${createResourceUri(uri)}?t=${Date.now()}`)
  return res.data
}

export type StrategyList = {
  name: string
  factor: number
  id: number
}[]

export type StrategyExtItem = {
  name: string
  factor: number
  cover_uri: string
  backtest_uri: string
  profit_uri: string
  id: number
}

export const getStrategyList = async () => {
  const res = await getResource<StrategyList>('strategylist.json')
  return getArray(res).map<StrategyExtItem>((item) => ({
    ...item,
    cover_uri: createResourceUri(`${item.name}/${item.name}.png`),
    backtest_uri: createResourceUri(`${item.name}/${item.name}-backtest.log`),
    profit_uri: createResourceUri(`${item.name}/${item.name}-plotfit.html`),
  }))
}

export const getStrategy = async (id: number) => {
  const res = await request.get<GetStrategyResponse>(
    `${ApiUrls.getStrategy}/${id}`,
  )
  return res?.data
}
