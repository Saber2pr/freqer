import { isNullOrUndefined } from './is'
import moment from 'moment'

export const formatTimeStr = (time: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (isNullOrUndefined(time)) return '-'
  return moment(time).format(format)
}

export const checkOrderTimeout = (createdAt: string) => {
  const givenTime = moment(createdAt)
  const currentTime = moment()

  const timeDifferenceInMillis = currentTime.diff(givenTime)
  const timeDifferenceInSeconds = moment
    .duration(timeDifferenceInMillis)
    .asSeconds()

  return timeDifferenceInSeconds > 1800
}
