import { parseBacktest } from './../utils/backtest-parser'
import axios from 'axios'
import { useAsync } from './useAsync'

export const useBacktestInfo = (uri: string) => {
  return useAsync(async () => {
    if (uri) {
      const res = await axios.get(uri)
      return parseBacktest(res.data)
    }
  }, [uri])
}
